import { Component } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromRoot from "./store/reducers/index";
import { LoadRootCauseAnalysisDatas } from "./store/actions/root-cause-analysis-data.actions";
import { LoadRootCauseAnalysisWidget } from "./store/actions/root-cause-analysis-widget.actions";
import { LoadRootCauseAnalysisConfiguration } from "./store/actions/root-cause-analysis-configuration.actions";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "bna-widget";
  routeParams = {
    dashboardItemId: "myrcawidget"
  };
  configurationId = "myrcaconfig";
  constructor(private store: Store<fromRoot.State>) {
    store.dispatch(
      new LoadRootCauseAnalysisConfiguration(this.configurationId)
    );
    store.dispatch(
      new LoadRootCauseAnalysisWidget(this.routeParams.dashboardItemId)
    );
    store.dispatch(new LoadRootCauseAnalysisDatas());
  }
}
