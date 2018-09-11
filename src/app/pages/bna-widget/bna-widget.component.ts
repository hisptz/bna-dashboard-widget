import { Component, OnInit, Input } from '@angular/core';
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
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';
import * as fromHelpers from '../../helpers';
import * as fromModels from '../../store/models';
import * as fromRootCauseAnalysisDataActions from '../../store/actions/root-cause-analysis-data.actions';
import * as fromSelectors from '../../store/selectors';
import { RootCauseAnalysisData } from '../../store/models';

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
export class BnaWidgetComponent implements OnInit {
  @Input()
  routerParams;
  configuration$: Observable<fromModels.RootCauseAnalysisConfiguration>;
  widget$: Observable<fromModels.RootCauseAnalysisWidget>;
  data$: Observable<fromModels.RootCauseAnalysisData[]>;
  configurationLoading$: Observable<boolean>;
  configurationLoaded$: Observable<boolean>;
  dataLoading$: Observable<boolean>;
  dataLoaded$: Observable<boolean>;
  notification$: Observable<any>;

  newRootCauseAnalysisData: fromModels.RootCauseAnalysisData;
  showContextMenu: boolean = false;
  contextmenuDataItem: RootCauseAnalysisData;
  contextmenuX: any;
  contextmenuY: any;
  confirmDelete: boolean = false;
  unSavedDataItemValues: any;

  constructor(private store: Store<State>) {
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
        console.log(dataDetails);
      });
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
    // this.showEmptyRow = false;
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
    if (this.unSavedDataItemValues) {
      _.each(
        _.map(
          _.keys(this.unSavedDataItemValues),
          (dataItemId: string) => this.unSavedDataItemValues[dataItemId]
        ),
        (dataItem: any) => {
          this.store.dispatch(
            new fromRootCauseAnalysisDataActions.UpdateRootCauseAnalysisData(
              dataItem
            )
          );
        }
      );
    }

    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.AddRootCauseAnalysisData({
        id: fromHelpers.generateUid(),
        isActive: true,
        isNew: true,
        configurationId: configuration.id,
        dataValues: emptyDataValues,
        user: '',
        updatedAt: '',
        createdAt: ''
      })
    );
  }

  generateConfigurations(configurationDataElements) {
    let dataValues: any = {};
    configurationDataElements.forEach((element, i) => {
      dataValues[element.id] = '';
    });
    return dataValues;
  }

  onToggleEdit(dataItemObject, dataItem?) {
    // if (e) {
    //   e.stopPropagation();
    // }
    this.showContextMenu = false;
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.UpdateRootCauseAnalysisData({
        ...dataItemObject,
        ...dataItem,
        isActive : true
      })
    );
  }

  onToggleCancelAction(e, dataItem, action?: string) {
    if (e) {
      e.stopPropagation();
    }

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
  onDisableContextMenu() {
    this.showContextMenu = false;
  }
  onToggleDelete(e, dataItem) {
    if (e) {
      e.stopPropagation();
    }
    dataItem.showDeleteConfirmation = true;
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
    
    this.onSaveRootCauseAnalysisData(dataItem, dataElements)

    const newDataItem = this.unSavedDataItemValues[dataItem.id];
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.UpdateRootCauseAnalysisData(
        newDataItem
         // {...newDataItem, isActive : false }
      )
    );

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

    this.onSaveRootCauseAnalysisData(dataItem, dataElements);

    const newDataItem = this.unSavedDataItemValues[dataItem.id];
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.UpdateRootCauseAnalysisData(
        newDataItem
        // {...newDataItem, isActive : false }
      )
    );
  }

  onSaveRootCauseAnalysisData(dataItem, dataElements) {
      //e.stopPropagation();
      const autoFilledDataValues = {};
      _.each(dataElements, (dataElement: any) => {
        if (dataElement.valueType === 'AUTO_FILLED') {
          autoFilledDataValues[dataElement.id] =
          dataItem.dataValues[dataElement.id];
        }
      });
  
      const newDataItem = this.unSavedDataItemValues[dataItem.id];
      const mergedDataItem = newDataItem
        ? {
            ...newDataItem,
            dataValues: { ...newDataItem.dataValues, ...autoFilledDataValues }
          }
        : dataItem;
      if (mergedDataItem) {
        this.store.dispatch(
          new fromRootCauseAnalysisDataActions.SaveRootCauseAnalysisData({
            ...mergedDataItem,
            isActive: false
          })
        );
      }
    }

  onDataValueEntry(e, dataElement) {
    e.stopPropagation();
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

  // activateRow(dataItem){
  //   this.store.dispatch(new fromRootCauseAnalysisDataActions.UpdateRootCauseAnalysisData({...dataItem, isActive : true}))
  // }

  // deActivateRow(dataItem){
  //   this.store.dispatch(new fromRootCauseAnalysisDataActions.UpdateRootCauseAnalysisData({...dataItem, isActive : false}))
  // }

    
}
