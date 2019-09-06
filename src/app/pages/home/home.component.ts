import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {State, getRouterParams, getCurrentUser} from '../../store';
import { Observable } from 'rxjs';
import {getSystemInfo} from '../../store/selectors/system-info.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  routerParams$: Observable<any>;
  selectedOrgUnit$: Observable<string>;
  systemInfo$: Observable<any>;
  currentUser$: Observable<any>;
  lastYear: any = new Date().getFullYear() - 1; // its hack for getting lastYear on init

  constructor(private store: Store<State>) {
    this.routerParams$ = store.select(getRouterParams);
    this.currentUser$ = store.select(getCurrentUser);
    this.systemInfo$ = store.select(getSystemInfo);
  }

  ngOnInit() {}
}
