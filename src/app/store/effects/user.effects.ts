import { Injectable } from '@angular/core';
import {
  NgxDhis2HttpClientService,
  ErrorMessage,
  User,
} from '@iapps/ngx-dhis2-http-client';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/internal/operators';

import {
  AddCurrentUser,
  LoadCurrentUser,
  LoadCurrentUserFail,
  UserActionTypes,
} from '../actions/user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private httpClient: NgxDhis2HttpClientService
  ) {}

  @Effect()
  loadCurrentUser$: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.LoadCurrentUser),
    switchMap((action: LoadCurrentUser) =>
      this.httpClient.me().pipe(
        map((user: User) => new AddCurrentUser(user, action.systemInfo)),
        catchError((error: ErrorMessage) => of(new LoadCurrentUserFail(error)))
      )
    )
  );
}
