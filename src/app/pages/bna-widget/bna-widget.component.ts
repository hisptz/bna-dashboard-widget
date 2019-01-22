import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  style,
  state,
  animate,
  transition,
  trigger
} from '@angular/animations';

import { listEnterAnimation } from '../../animations/list-enter-animation';

import { Store } from '@ngrx/store';
import { State } from '../../store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';
import * as fromHelpers from '../../helpers';
import * as fromModels from '../../store/models';
import * as fromRootCauseAnalysisDataActions from '../../store/actions/root-cause-analysis-data.actions';
import * as fromSelectors from '../../store/selectors';
import { RootCauseAnalysisData } from '../../store/models';

import { DownloadWidgetService } from '../../services/downloadWidgetService.service';

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
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class BnaWidgetComponent implements OnInit, OnChanges {
  @Input()
  routerParams;
  @Input()
  selectedOrgUnit;
  @Input()
  selectedPeriod;

  @ViewChild('rootCauseAnalysisTable')
  table: ElementRef;

  configuration$: Observable<fromModels.RootCauseAnalysisConfiguration>;
  widget$: Observable<fromModels.RootCauseAnalysisWidget>;
  data$: Observable<fromModels.RootCauseAnalysisData[]>;
  configurationLoading$: Observable<boolean>;
  configurationLoaded$: Observable<boolean>;
  dataLoading$: Observable<boolean>;
  dataLoaded$: Observable<boolean>;
  notification$: Observable<any>;
  // savingColor$: Observable<string>;

  newRootCauseAnalysisData: fromModels.RootCauseAnalysisData;
  showContextMenu = false;
  contextmenuDataItem: RootCauseAnalysisData;
  contextmenuX: any;
  contextmenuY: any;
  confirmDelete = false;
  unSavedDataItemValues: any;

  /**
   * key value pair object for each row to show/hide during deletion
   */
  toBeDeleted = {};

  constructor(
    private store: Store<State>,
    private downloadWidgetService: DownloadWidgetService
  ) {
    this.widget$ = store.select(
      fromSelectors.getCurrentRootCauseAnalysisWidget
    );
    this.configuration$ = store.select(
      fromSelectors.getCurrentRootCauseAnalysisConfiguration
    );
    this.data$ = store.select(fromSelectors.getAllRootCauseAnalysisData);
    this.configurationLoading$ = store.select(
      fromSelectors.getConfigurationLoadingState
    );
    this.configurationLoaded$ = store.select(
      fromSelectors.getConfigurationLoadingState
    );
    this.dataLoaded$ = store.select(
      fromSelectors.getRootCauseAnalysisDataLoadedState
    );
    this.dataLoading$ = store.select(
      fromSelectors.getRootCauseAnalysisDataLoadingState
    );
    this.notification$ = store.select(
      fromSelectors.getRootCauseAnalysisDataNotificationState
    );

    // this.savingColor$ = store.select(
    //   fromSelectors.getRootCauseAnalysisDataSavingColorState
    // );

    this.unSavedDataItemValues = {};

    this.data$
      .pipe(
        switchMap((data: any) =>
          this.configuration$.pipe(
            map((config: any) => {
              return { config, lastData: _.last(data) };
            })
          )
        )
      )
      .subscribe((dataDetails: any) => {
        of(dataDetails);
      });
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
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.SaveRootCauseAnalysisData(
        rootCauseAnalysisData
      )
    );
  }

  onAddRootCauseAnalysisData(rootCauseAnalysisData: any) {
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.CreateRootCauseAnalysisData(
        rootCauseAnalysisData
      )
    );
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

  onDeleteRootCauseAnalysisData(rootCauseAnalysisData: any) {
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.DeleteRootCauseAnalysisData(
        rootCauseAnalysisData
      )
    );
  }

  onToggleAddNewRootCauseAnalysisData(configuration) {
    const configurationDataElements = configuration.dataElements;
    const emptyDataValues = this.generateConfigurations(
      configurationDataElements
    );

    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.AddRootCauseAnalysisData({
        id: fromHelpers.generateUid(),
        isActive: true,
        isNew: true,
        configurationId: configuration.id,
        dataValues: emptyDataValues
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
    this.showContextMenu = false;
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.UpdateRootCauseAnalysisData({
        ...dataItemObject,
        ...dataItem,
        isActive: true
      })
    );
  }

  onToggleCancelAction(e, dataItem, action?: string) {
    if (e) {
      e.stopPropagation();
    }
    this.toBeDeleted[dataItem.id] = false;
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.UpdateRootCauseAnalysisData({
        ...dataItem,
        showDeleteConfirmation:
          action === 'DELETE' ? false : dataItem.showDeleteConfirmation,
        isActive: false
      })
    );
  }

  onEnableContextMenu(e, dataItem) {
    if (dataItem.isActive !== true) {
      if (e) {
        e.stopPropagation();
      }
      e.cancelBubble = true;
      this.contextmenuX = e.clientX;
      this.contextmenuY = e.clientY - 20;
      this.contextmenuDataItem = dataItem;
      this.showContextMenu = !this.showContextMenu;
      return false;
    }
  }

  onDisableContextMenu() {
    this.showContextMenu = false;
  }

  onToggleDelete(dataItem) {
    dataItem.showDeleteConfirmation = true;
    this.showContextMenu = false;
    this.toBeDeleted[dataItem.id] = true;
  }

  onDoneEditing(e, dataItem) {
    if (e) {
      e.stopPropagation();
    }
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.UpdateRootCauseAnalysisData({
        ...dataItem,
        isActive: false
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
  onDataValueUpdate(dataValueId, dataItem, e, dataElements, dataItemValue?) {
    if (e) {
      e.stopPropagation();
    }
    const dataValue = e ? e.target.value.trim() : dataItemValue;
    if (dataValue !== '') {
      const unSavedDataItem = this.unSavedDataItemValues[dataItem.id];
      this.unSavedDataItemValues[dataItem.id] = unSavedDataItem
        ? {
            ...unSavedDataItem,
            dataValues: {
              ...unSavedDataItem.dataValues,
              ...{ [dataValueId]: dataValue }
            }
          }
        : {
            ...dataItem,
            unsaved: true,
            dataValues: {
              ...dataItem.dataValues,
              ...{ [dataValueId]: dataValue }
            }
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

      this.store.dispatch(
        new fromRootCauseAnalysisDataActions.UpdateRootCauseAnalysisData(
          newDataItem
        )
      );

      if (!dataIsIncomplete) {
        unsavedDataItemObject.isNew
          ? this.saveNewData(unsavedDataItemObject)
          : this.store.dispatch(
              new fromRootCauseAnalysisDataActions.SaveRootCauseAnalysisData(
                newDataItem
              )
            );
      }
    }
  }

  saveNewData(unsavedDataItemObject) {
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.CreateRootCauseAnalysisData({
        ...unsavedDataItemObject,
        isActive: false
      })
    );
    this.unSavedDataItemValues = {};
  }
  onResetNotification(emptyNotificationMessage) {
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.ResetRootCauseAnalysisData({
        notification: {
          message: emptyNotificationMessage.message
        }
      })
    );
  }

  /**
   * Update more than one data values especially those coming from selections
   * @param dataValueObject
   * @param dataItem
   */
  onDataValuesUpdate(dataValueObject: any, dataItem, dataElements) {
    _.each(_.keys(dataValueObject), dataValueKey => {
      this.onDataValueUpdate(
        dataValueKey,
        dataItem,
        null,
        dataElements,
        dataValueObject[dataValueKey]
      );
    });
    const newDataItem = this.unSavedDataItemValues[dataItem.id];
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.UpdateRootCauseAnalysisData(
        newDataItem
      )
    );
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
              ...{ [dataValueId]: newEnteredData }
            }
          }
        : {
            ...this.newRootCauseAnalysisData,
            dataValues: {
              ...this.newRootCauseAnalysisData.dataValues,
              ...{ [dataValueId]: newEnteredData }
            }
          };
    }
  }
}
