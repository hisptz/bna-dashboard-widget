import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppAuthority } from 'src/app/models/app-authorities.model';

import {
  getAppManagementAuthorities,
  getCurrentUser,
  getRouterParams,
  State,
  getCurrentRootCauseAnalysisConfiguration,
} from '../../store';
import { getSystemInfo } from '../../store/selectors/system-info.selectors';
import { RootCauseAnalysisConfiguration } from 'src/app/store/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  routerParams$: Observable<any>;
  selectedOrgUnit$: Observable<string>;
  systemInfo$: Observable<any>;
  currentUser$: Observable<any>;
  appAuthorities$: Observable<AppAuthority>;
  configuration$: Observable<RootCauseAnalysisConfiguration>;
  lastYear: any = new Date().getFullYear() - 1; // its hack for getting lastYear on init

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.routerParams$ = this.store.select(getRouterParams);
    this.currentUser$ = this.store.select(getCurrentUser);
    this.systemInfo$ = this.store.select(getSystemInfo);
    this.appAuthorities$ = this.store.select(getAppManagementAuthorities);
    this.configuration$ = this.store.pipe(
      select(getCurrentRootCauseAnalysisConfiguration)
    );
  }
}
