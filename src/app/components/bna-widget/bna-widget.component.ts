import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';

import { listEnterAnimation } from '../../animations/list-enter-animation';

import { Store } from '@ngrx/store';
import { State } from '../../store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import {
  RootCauseAnalysisData,
  RootCauseAnalysisConfiguration,
  RootCauseAnalysisWidget,
} from '../../store/models';

import { DownloadWidgetService } from '../../services/downloadWidgetService.service';
import { AppAuthority } from 'src/app/models/app-authorities.model';
import {
  UpdateRootCauseAnalysisData,
  ResetRootCauseAnalysisData,
  CreateRootCauseAnalysisData,
  SaveRootCauseAnalysisData,
  AddRootCauseAnalysisData,
  DeleteRootCauseAnalysisData,
} from 'src/app/store/actions/root-cause-analysis-data.actions';
import { generateUid } from 'src/app/helpers';

@Component({
  selector: 'app-bna-widget',
  templateUrl: './bna-widget.component.html',
  styleUrls: ['./bna-widget.component.css'],
  animations: [
    listEnterAnimation,
    trigger('fadeInOut', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class BnaWidgetComponent implements OnInit, OnChanges {
  @Input() routerParams;
  @Input() selectedOrgUnit;
  @Input() selectedPeriod;
  @Input() appAuthorities: AppAuthority;
  @Input() rootCauseAnalysisConfiguration: RootCauseAnalysisConfiguration;
  @Input() rootCauseAnalysisData: RootCauseAnalysisData[];
  @Input() dataLoading: boolean;
  @Input() dataLoaded: boolean;
  @Input() configurationLoading: boolean;
  @Input() configurationLoaded: boolean;
  @Input() widget: RootCauseAnalysisWidget;
  @Input() notification: any;

  newRootCauseAnalysisData: RootCauseAnalysisData;
  confirmDelete = false;
  unSavedDataItemValues: any;
  toBeDeleted = {};

  @ViewChild('rootCauseAnalysisTable', { static: false })
  table: ElementRef;

  constructor(
    private store: Store<State>,
    private downloadWidgetService: DownloadWidgetService
  ) {
    this.unSavedDataItemValues = {};
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.routerParams) {
      const currentRouteParams = simpleChanges.routerParams.currentValue;
      if (currentRouteParams.download) {
        this.downloadTable(
          currentRouteParams.download ? currentRouteParams.download.id : 'CSV'
        );
      }
    }
  }

  ngOnInit() {}

  onUpdateRootCauseAnalysisData(rootCauseAnalysisData: any) {
    rootCauseAnalysisData.isActive = !rootCauseAnalysisData.isActive;
    this.store.dispatch(new SaveRootCauseAnalysisData(rootCauseAnalysisData));
  }

  onAddRootCauseAnalysisData(rootCauseAnalysisData: any) {
    this.store.dispatch(new CreateRootCauseAnalysisData(rootCauseAnalysisData));
  }

  downloadTable(downloadFormat) {
    if (this.table) {
      const dateTime = new Date();
      const el = this.table.nativeElement;
      const filename =
        'Root causes - ' +
        this.routerParams.dashboard.name +
        ' - ' +
        this.selectedOrgUnit +
        ' - ' +
        this.selectedPeriod +
        ' gen. on ' +
        dateTime.getFullYear() +
        (dateTime.getMonth() + 1 < 10 ? '-0' : '-') +
        (dateTime.getMonth() + 1) +
        (dateTime.getDay() < 10 ? '-0' : '-') +
        dateTime.getDay() +
        ' ' +
        (dateTime.getHours() < 10 ? ':0' : ':') +
        dateTime.getHours() +
        (dateTime.getMinutes() < 10 ? ':0' : ':') +
        dateTime.getMinutes() +
        'hrs';
      if (el) {
        if (downloadFormat === 'XLS') {
          this.downloadWidgetService.exportXLS(filename, el.outerHTML);
        } else if (downloadFormat === 'CSV') {
          this.downloadWidgetService.exportCSV(filename, el);
        }
      }
    }
  }

  onDeleteRootCauseAnalysisData(e, rootCauseAnalysisData: any) {
    e.stopPropagation();
    this.store.dispatch(new DeleteRootCauseAnalysisData(rootCauseAnalysisData));
  }

  onToggleAddNewRootCauseAnalysisData(configuration) {
    const configurationDataElements = configuration.dataElements;
    const emptyDataValues = this.generateConfigurations(
      configurationDataElements
    );

    this.store.dispatch(
      new AddRootCauseAnalysisData({
        id: generateUid(),
        isActive: true,
        isNew: true,
        configurationId: configuration.id,
        dataValues: emptyDataValues,
      })
    );
  }

  generateConfigurations(configurationDataElements) {
    const dataValues: any = {};
    configurationDataElements.forEach((element, i) => {
      dataValues[element.id] = '';
    });
    return dataValues;
  }

  onToggleEdit(dataItemObject, dataItem?) {
    this.store.dispatch(
      new UpdateRootCauseAnalysisData({
        ...dataItemObject,
        ...dataItem,
        isActive: true,
      })
    );
  }

  onToggleCancelAction(e, dataItem, action?: string) {
    if (e) {
      e.stopPropagation();
    }
    this.toBeDeleted[dataItem.id] = false;
    this.store.dispatch(
      new UpdateRootCauseAnalysisData({
        ...dataItem,
        showDeleteConfirmation:
          action === 'DELETE' ? false : dataItem.showDeleteConfirmation,
        isActive: false,
      })
    );
  }

  onToggleDelete(e, dataItem) {
    e.stopPropagation();
    dataItem.showDeleteConfirmation = true;
    this.toBeDeleted[dataItem.id] = true;
  }

  onDoneEditing(e, dataItem) {
    if (e) {
      e.stopPropagation();
    }
    this.store.dispatch(
      new UpdateRootCauseAnalysisData({
        ...dataItem,
        isActive: false,
      })
    );
  }

  /**
   * Update single data value
   * @param dataValueId
   * @param dataItem
   * @param e
   * @param dataItemValue
   */
  onDataValueUpdate({ id, value }, dataItem) {
    if (value) {
      const unSavedDataItem = this.unSavedDataItemValues[dataItem.id];
      this.unSavedDataItemValues[dataItem.id] = unSavedDataItem
        ? {
            ...unSavedDataItem,
            dataValues: {
              ...unSavedDataItem.dataValues,
              ...{ [id]: value },
            },
          }
        : {
            ...dataItem,
            unsaved: true,
            dataValues: {
              ...dataItem.dataValues,
              ...{ [id]: value },
            },
          };
    }
    const unsavedDataItemObject = this.unSavedDataItemValues
      ? this.unSavedDataItemValues[dataItem.id]
      : null;
    if (unsavedDataItemObject) {
      const dataValues = _.forEach(
        _.values(unsavedDataItemObject['dataValues'] || {})
      );
      const dataIsIncomplete = _.includes(dataValues, '');
      const newDataItem = this.unSavedDataItemValues[dataItem.id];

      this.store.dispatch(new UpdateRootCauseAnalysisData(newDataItem));

      if (!dataIsIncomplete) {
        unsavedDataItemObject.isNew
          ? this.saveNewData(unsavedDataItemObject)
          : this.store.dispatch(new SaveRootCauseAnalysisData(newDataItem));
      }
    }
  }

  saveNewData(unsavedDataItemObject) {
    this.store.dispatch(
      new CreateRootCauseAnalysisData({
        ...unsavedDataItemObject,
        isActive: false,
      })
    );
    this.unSavedDataItemValues = {};
  }
  onResetNotification(emptyNotificationMessage) {
    this.store.dispatch(
      new ResetRootCauseAnalysisData({
        notification: {
          message: emptyNotificationMessage.message,
        },
      })
    );
  }

  /**
   * Update more than one data values especially those coming from selections
   * @param dataValueObject
   * @param dataItem
   */
  onDataValuesUpdate(dataValueObject: any, dataItem) {
    _.each(_.keys(dataValueObject), (dataValueKey) => {
      this.onDataValueUpdate(
        { id: dataValueKey, value: dataValueObject[dataValueKey] },
        dataItem
      );
    });
    const newDataItem = this.unSavedDataItemValues[dataItem.id];
    this.store.dispatch(new UpdateRootCauseAnalysisData(newDataItem));
  }

  onDataValueEntry(e, dataElement) {
    if (e) {
      e.stopPropagation();
    }
    const newEnteredData = e.target.value.trim();
    if (newEnteredData !== '') {
      const dataValueId = dataElement;

      this.newRootCauseAnalysisData.dataValues[dataElement] = newEnteredData;
      const unSavedDataItem = this.newRootCauseAnalysisData;
      this.newRootCauseAnalysisData = unSavedDataItem
        ? {
            ...unSavedDataItem,
            dataValues: {
              ...unSavedDataItem.dataValues,
              ...{ [dataValueId]: newEnteredData },
            },
          }
        : {
            ...this.newRootCauseAnalysisData,
            dataValues: {
              ...this.newRootCauseAnalysisData.dataValues,
              ...{ [dataValueId]: newEnteredData },
            },
          };
    }
  }
}
