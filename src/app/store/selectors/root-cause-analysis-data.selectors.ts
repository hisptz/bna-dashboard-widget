import { createSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromRootCauseData from '../reducers/root-cause-analysis-data.reducer';

export const getRootCauseAnalysisDataState = createSelector(
  fromRoot.getRootState,
  (state: fromRoot.State) => state.rootCauseAnalysisData
);

export const getRootCauseAnalysisDataEntities = createSelector(
  getRootCauseAnalysisDataState,
  fromRootCauseData.getRootCauseAnalysisDataEntitiesState
);

export const getAllRootCauseAnalysisData = createSelector(
  getRootCauseAnalysisDataState,
  fromRootCauseData.getAllRootCauseAnalysisDataState
);

export const getRootCauseAnalysisDataLoadingState = createSelector(
  getRootCauseAnalysisDataState,
  fromRootCauseData.getRootCauseAnalysisDataLoadingState
);

export const getRootCauseAnalysisDataLoadedState = createSelector(
  getRootCauseAnalysisDataState,
  fromRootCauseData.getRootCauseAnalysisDataLoadedState
);

export const getRootCauseAnalysisDataHasErrorState = createSelector(
  getRootCauseAnalysisDataState,
  fromRootCauseData.getRootCauseAnalysisDataHasErrorState
);

export const getRootCauseAnalysisDataErrorState = createSelector(
  getRootCauseAnalysisDataState,
  fromRootCauseData.getRootCauseAnalysisDataErrorState
);

export const getRootCauseAnalysisDataNotificationState = createSelector(
  getRootCauseAnalysisDataState,
  fromRootCauseData.getRootCauseAnalysisDataNotificationState
);
