import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';

import * as fromRootCauseAnalysisDataActions from '../actions/root-cause-analysis-data.actions';
import { RootCauseAnalysisDataService } from '../../services';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { RootCauseAnalysisData } from '../models/root-cause-analysis-data.model';

@Injectable()
export class RootCauseAnalysisDataEffects {
  @Effect()
  loadRootCauseAnalysisDatas$: Observable<any> = this.actions$.pipe(
    ofType(
      fromRootCauseAnalysisDataActions.RootCauseAnalysisDataActionTypes
        .LoadRootCauseAnalysisDatas
    ),
    mergeMap(
      (action: fromRootCauseAnalysisDataActions.LoadRootCauseAnalysisDatas) =>
        this.rootCauseAnalysisDataService
          .getRootCauseAnalysisData(action.configurationId)
          .pipe(
            map(
              (rootCauseAnalysisData: RootCauseAnalysisData[]) =>
                new fromRootCauseAnalysisDataActions.AddRootCauseAnalysisDatas(
                  rootCauseAnalysisData
                )
            ),
            catchError((error: any) =>
              of(
                new fromRootCauseAnalysisDataActions.LoadRootCauseAnalysisDatasFail(
                  error
                )
              )
            )
          )
    )
  );

  @Effect()
  saveRootCauseAnalysisData$: Observable<any> = this.actions$.pipe(
    ofType(
      fromRootCauseAnalysisDataActions.RootCauseAnalysisDataActionTypes
        .SaveRootCauseAnalysisData
    ),
    mergeMap(
      (action: fromRootCauseAnalysisDataActions.SaveRootCauseAnalysisData) =>
        this.rootCauseAnalysisDataService
          .updateRootCauseAnalysisData(action.rootCauseAnalysisData)
          .pipe(
            map(
              () =>
                new fromRootCauseAnalysisDataActions.SaveRootCauseAnalysisDataSuccess(
                  action.rootCauseAnalysisData
                )
            ),
            catchError((error: any) =>
              of(
                new fromRootCauseAnalysisDataActions.SaveRootCauseAnalysisDataFail(
                  action.rootCauseAnalysisData,
                  error
                )
              )
            )
          )
    )
  );

  @Effect()
  createRootCauseAnalysisData$: Observable<any> = this.actions$.pipe(
    ofType(
      fromRootCauseAnalysisDataActions.RootCauseAnalysisDataActionTypes
        .CreateRootCauseAnalysisData
    ),
    mergeMap(
      (action: fromRootCauseAnalysisDataActions.CreateRootCauseAnalysisData) =>
        this.rootCauseAnalysisDataService
          .addRootCauseAnalysisData(action.rootCauseAnalysisData)
          .pipe(
            map(
              () =>
                new fromRootCauseAnalysisDataActions.CreateRootCauseAnalysisDataSuccess(
                  action.rootCauseAnalysisData
                )
            ),
            catchError((error: any) =>
              of(
                new fromRootCauseAnalysisDataActions.CreateRootCauseAnalysisDataFail(
                  action.rootCauseAnalysisData,
                  error
                )
              )
            )
          )
    )
  );

  @Effect()
  deleteIntervention$: Observable<any> = this.actions$.pipe(
    ofType(
      fromRootCauseAnalysisDataActions.RootCauseAnalysisDataActionTypes
        .DeleteRootCauseAnalysisData
    ),
    mergeMap(
      (action: fromRootCauseAnalysisDataActions.DeleteRootCauseAnalysisData) =>
        this.rootCauseAnalysisDataService
          .deleteRootCauseAnalysisData(action.rootCauseAnalysisData)
          .pipe(
            map(
              () =>
                new fromRootCauseAnalysisDataActions.DeleteRootCauseAnalysisDataSuccess(
                  action.rootCauseAnalysisData.id
                )
            ),
            catchError((error: any) =>
              of(
                new fromRootCauseAnalysisDataActions.DeleteRootCauseAnalysisDataFail(
                  action.rootCauseAnalysisData,
                  error
                )
              )
            )
          )
    )
  );
  // DeleteRootCauseAnalysisData

  constructor(
    private actions$: Actions,
    private rootCauseAnalysisDataService: RootCauseAnalysisDataService
  ) {}
}
