import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../store';
import * as helper from '../../helpers/index';
import * as service from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bna-widget',
  templateUrl: './bna-widget.component.html',
  styleUrls: ['./bna-widget.component.css']
})

export class BnaWidgetComponent implements OnInit {
  @Input() routerParams: any;
  configuration$: Observable<any[]>;
  widget$: Observable<any[]>;
  data$: Observable<void | any[]>;
  params = 
    {
      orgUnitName: "Kambia",
      orgUnitId: "QbOjwy38Cmt",
      periodName: "July-September 2018",
      periodId: "2018Q3",
      interventionName: "Antenatal Care",
      interventionId: "SedMIOTJUvO",
      bottleneckName: "",
      bottleneckId: "",
      indicatorName: "",
      indicatorId: "",
      rootCause: "",
      solution: ""
    };

  constructor(
    public rcaWidget: service.RootCauseAnalysisWidgetService,
    public rcaConfigurations: service.RootCauseAnalysisConfigurationsService,
    public rcaData: service.RootCauseAnalysisDataService,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.configuration$ = this.rcaConfigurations.getConfiguration('myrcaconfig');
    this.widget$ = this.rcaWidget.getWidget('myrcawidget');
    this.data$ = this.rcaData.getData(this.params);
  }
}
