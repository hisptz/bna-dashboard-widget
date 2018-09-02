import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import * as fromModels from '../../store/models';
import * as fromRootCauseAnalysisDataActions from '../../store/actions/root-cause-analysis-data.actions';
import * as fromSelectors from '../../store/selectors';

@Component({
  selector: 'app-bna-widget',
  templateUrl: './bna-widget.component.html',
  styleUrls: ['./bna-widget.component.css']
})
export class BnaWidgetComponent implements OnInit {
  @Input()
  routerParams;
  configuration$: Observable<fromModels.RootCauseAnalysisConfiguration>;
  widget$: Observable<fromModels.RootCauseAnalysisWidget>;
  data$: Observable<fromModels.RootCauseAnalysisData[]>;
  saveEditButtonTitle: string = 'Edit';

  unSavedDataItemValues: any;

  constructor(private store: Store<State>) {
    this.widget$ = store.select(
      fromSelectors.getCurrentRootCauseAnalysisWidget
    );
    this.configuration$ = store.select(
      fromSelectors.getCurrentRootCauseAnalysisConfiguration
    );
    this.data$ = store.select(fromSelectors.getAllRootCauseAnalysisData);
    this.unSavedDataItemValues = {};
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

  onAddRootCauseAnalysis(rootCauseAnalysisData: any) {
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.CreateRootCauseAnalysisData(
        rootCauseAnalysisData
      )
    );
  }

  deleteRow() {}

  onAddNewRow() {}

  onToggleEdit(dataItem) {
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.UpdateRootCauseAnalysisData({
        ...dataItem,
        isActive: true
      })
    );
  }

  onDataValueUpdate(e, dataValueId, dataItem) {
    e.stopPropagation();
    console.log('here');
    const dataValue = e.target.value.trim();
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
  }

  onSaveRootCauseAnalysisData(dataItem, e) {
    e.stopPropagation();
    const newDataItem = this.unSavedDataItemValues[dataItem.id];
    if (newDataItem) {
      this.store.dispatch(
        new fromRootCauseAnalysisDataActions.SaveRootCauseAnalysisData({
          ...newDataItem,
          isActive: false
        })
      );
    }
  }
}
