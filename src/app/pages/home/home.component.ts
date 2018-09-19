import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getRouterParams } from '../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  routerParams$: Observable<any>;
  selectedOrgUnit$: Observable<string>;
  selectedPeriod$: Observable<string>;

  constructor(private store: Store<State>) {
    this.routerParams$ = store.select(getRouterParams);
  }

  ngOnInit() {}
}
