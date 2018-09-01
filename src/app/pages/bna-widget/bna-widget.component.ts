import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../store';
import * as helper from '../../helpers/index';
import * as service from '../../services';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import * as _ from 'lodash'
import { RootCauseAnalysisData } from '../../models/root-cause-analysis-data';

@Component({
  selector: 'app-bna-widget',
  templateUrl: './bna-widget.component.html',
  styleUrls: ['./bna-widget.component.css']
})

export class BnaWidgetComponent implements OnInit {
  @Input() routerParams: any;
  configuration$: Observable<any[]>;
  widget$: Observable<any[]>;
  data$: Observable<{} | {}[]>;

  analysisData: FormArray;
  analysisRow: FormGroup;

  params = 
    {
      orgUnitName: "Kigumbe",
      orgUnitId: "uh3q8r4qhjr",
      periodName: "July - September 2018",
      periodId: "2018Q3",
      interventionName: "ANC",
      interventionId: "jm2sad5jfop",
      bottleneckName: "",
      bottleneckId: "",
      indicatorName: "",
      indicatorId: ""
    };

    confirmDeleteNotification: boolean = false;
    DeleteMessage: string = "Are you sure you wish to delete row?"
    confirmClicked: boolean = false;
    cancelClicked: boolean = false;

  constructor(
    public rcaWidget: service.RootCauseAnalysisWidgetService,
    public rcaConfigurations: service.RootCauseAnalysisConfigurationsService,
    public rootCauseAnalysisData: service.RootCauseAnalysisDataService,
    private analysisForm : FormBuilder,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.configuration$ = this.rcaConfigurations.getConfiguration('myrcaconfig');
    this.widget$ = this.rcaWidget.getWidget('myrcawidget');
    this.data$ = this.rootCauseAnalysisData.getData();

    this.analysisRow = this.analysisForm.group({
      dataItems: this.analysisForm.array([])
    });

    this.analysisRow.valueChanges.subscribe()
  }


  getAnalysisData(form){
    return form.get('dataItems').controls;
  }

  get dataValuesForms(){
    return this.analysisRow.get('dataItems') as FormArray;
  }

  initDataValues() {
    const rowData = this.analysisForm.group({
      id: helper.generateUid(),
      configurationId: 'myrcaconfig',
      isActive: true,
      dataValues: this.analysisForm.group({
        orgUnitName: this.params.orgUnitName,
        orgUnitId: this.params.orgUnitId,
        periodName: this.params.periodName,
        periodId: this.params.periodId,
        interventionName: this.params.interventionName,
        interventionId: this.params.indicatorId,
        bottleneckName: '',
        bottleneckId: '',
        indicatorName: '',
        indicatorId: '',
        rootCause: '',
        solution: ''
      })
    })
    return this.dataValuesForms.push(rowData);
  }

  deleteRow(rowId) {
      this.dataValuesForms.removeAt(rowId);
  }

  onAddNewRow() {
    const rowPayload = _.last(this.analysisRow.value.dataItems);
    this.initDataValues()
    rowPayload ?
     this.rootCauseAnalysisData.addData(helper.postSanitizedRcaData(rowPayload)).subscribe() : 
     null;
  }

  onUpdateRow(item: any, e?) {
    if (e) {
      e.stopPropagation();
    }
    item.isActive = !item.isActive;
    this.rootCauseAnalysisData.updateData(item, {isActive: !item.isActive}).subscribe()
  }

  onConfirmDelete(item,e?) {
    if (e) {
      e.stopPropagation();
    }
    this.rootCauseAnalysisData.deleteData(item).subscribe();
    item.showDeleteNotification = !item.showDeleteNotification;
  }

  onToggleEditRow(item: any, e?) {
    if (e) {
      e.stopPropagation();
    }
    item.isActive = !item.isActive;
  }

  onToggleDeleteRow(item: any, e?) {
    if (e) {
      e.stopPropagation();
    }
    item.showDeleteNotification = !item.showDeleteNotification;
  }
}
