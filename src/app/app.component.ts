import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from './store/reducers/index';
import { SetCurrentRootCauseAnalysisWidget } from './store/actions/root-cause-analysis-widget.actions';
import { LoadRootCauseAnalysisConfigurations } from './store/actions/root-cause-analysis-configuration.actions';
import {LoadCurrentUser, LoadSystemInfo} from './store/actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bna-widget';
  routeParams = {
    dashboardItemId: 'rcawidget'
  };
  configurationId = 'rcaconfig';
  constructor(private store: Store<fromRoot.State>) {
    store.dispatch(new LoadSystemInfo());

    this.store.dispatch(
      new LoadRootCauseAnalysisConfigurations(
        this.configurationId,
        this.routeParams.dashboardItemId
      )
    );

    this.store.dispatch(
      new SetCurrentRootCauseAnalysisWidget(this.routeParams.dashboardItemId)
    );
  }
}
