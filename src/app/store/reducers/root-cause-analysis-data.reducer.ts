import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { RootCauseAnalysisData } from '../models/root-cause-analysis-data.model';
import {
  RootCauseAnalysisDataActions,
  RootCauseAnalysisDataActionTypes
} from '../actions/root-cause-analysis-data.actions';

export interface State extends EntityState<RootCauseAnalysisData> {
  // additional entities state properties
  isActive: boolean;
  loading: boolean;
  loaded: boolean;
  notification: { message: string };
  showEmptyRow: boolean;
  showNotification: boolean;
  showDeleteConfirmation: boolean;
  hasError: boolean;
  error: any;
}

export const adapter: EntityAdapter<
  RootCauseAnalysisData
> = createEntityAdapter<RootCauseAnalysisData>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  isActive: false,
  loading: false,
  loaded: false,
  notification: null,
  showDeleteConfirmation: false,
  showNotification: false,
  showEmptyRow: false,
  hasError: false,
  error: null
});

export function reducer(
  state = initialState,
  action: RootCauseAnalysisDataActions
): State {
  switch (action.type) {
    case RootCauseAnalysisDataActionTypes.AddRootCauseAnalysisData: {
      return adapter.addOne(action.rootCauseAnalysisData, state);
    }

    case RootCauseAnalysisDataActionTypes.UpsertRootCauseAnalysisData: {
      return adapter.upsertOne(action.payload.rootCauseAnalysisData, state);
    }

    case RootCauseAnalysisDataActionTypes.AddRootCauseAnalysisDatas: {
      return adapter.addMany(action.rootCauseAnalysisDatas, {
        ...state,
        loading: false,
        loaded: true,
        showNotification: false,
        notification: {
          message: 'Root Cause Analysis Data Loaded'
        }
      });
    }

    case RootCauseAnalysisDataActionTypes.UpsertRootCauseAnalysisDatas: {
      return adapter.upsertMany(action.payload.rootCauseAnalysisDatas, state);
    }

    case RootCauseAnalysisDataActionTypes.UpdateRootCauseAnalysisData: {
      return adapter.updateOne(
        {
          id: action.rootCauseAnalysisData
            ? action.rootCauseAnalysisData.id
            : null,
          changes: action.rootCauseAnalysisData
        },
        state
      );
    }

    case RootCauseAnalysisDataActionTypes.UpdateRootCauseAnalysisDatas: {
      return adapter.updateMany(action.payload.rootCauseAnalysisDatas, state);
    }

    case RootCauseAnalysisDataActionTypes.ResetRootCauseAnalysisData: {
      return {
        ...state,
        notification: {
          message: null
        }
      };
    }

    case RootCauseAnalysisDataActionTypes.DeleteRootCauseAnalysisData: {
      return adapter.removeOne(action.rootCauseAnalysisData.id, {
        ...state,
        showNotification: true,
        notification: {
          message: 'Deleting This Root Cause Analysis Data'
        }
      });
    }

    case RootCauseAnalysisDataActionTypes.DeleteRootCauseAnalysisDatas: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case RootCauseAnalysisDataActionTypes.LoadRootCauseAnalysisDatas: {
      return {
        ...state,
        loading: true,
        loaded: false,
        showNotification: true,
        notification: {
          message: 'Loading Root Cause Analysis Data'
        }
      };
    }

    case RootCauseAnalysisDataActionTypes.ClearRootCauseAnalysisDatas: {
      return adapter.removeAll(state);
    }

    case RootCauseAnalysisDataActionTypes.LoadRootCauseAnalysisDatasFail: {
      return { ...state, loading: false, hasError: true, error: action.error };
    }

    case RootCauseAnalysisDataActionTypes.SaveRootCauseAnalysisData: {
      return adapter.updateOne(
        {
          id: action.rootCauseAnalysisData.id,
          changes: action.rootCauseAnalysisData
        },
        {
          ...state,
          isActive: true,
          showNotification: true,
          notification: {
            message: `Saving Analysis Data `
          }
        }
      );
    }

    case RootCauseAnalysisDataActionTypes.SaveRootCauseAnalysisDataSuccess: {
      return adapter.updateOne(
        { id: action.rootCauseAnalysisData.id, changes: { isNew: false } },
        {
          ...state,
          isActive: false,
          showNotification: false,
          notification: {
            message: `Data has been successfully updated`
          }
        }
      );
    }

    case RootCauseAnalysisDataActionTypes.SaveRootCauseAnalysisDataFail: {
      return {
        ...state,
        isActive: true,
        showNotification: false,
        notification: {
          message: `Could not update data : ${action.error.message}`
        }
      };
    }

    case RootCauseAnalysisDataActionTypes.CreateRootCauseAnalysisData: {
      console.log(action.rootCauseAnalysisData);

      return {
        ...state,
        showNotification: true,
        notification: {
          message: `Saving Analysis Data `
        }
      };
    }

    case RootCauseAnalysisDataActionTypes.CreateRootCauseAnalysisDataSuccess: {
      return adapter.addOne(action.rootCauseAnalysisData, {
        ...state,
        showNotification: false,
        notification: {
          message: `Data successfully saved`
        }
      });
    }

    case RootCauseAnalysisDataActionTypes.CreateRootCauseAnalysisDataFail: {
      return {
        ...state,
        showNotification: false,
        notification: {
          message: `Could not save data ${action.error.message}`
        }
      };
    }

    default: {
      return state;
    }
  }
}

export const {
  selectEntities: getRootCauseAnalysisDataEntitiesState,
  selectAll: getAllRootCauseAnalysisDataState
} = adapter.getSelectors();

export const getRootCauseAnalysisDataLoadingState = (state: State) =>
  state.loading;
export const getRootCauseAnalysisDataLoadedState = (state: State) =>
  state.loaded;
export const getRootCauseAnalysisDataHasErrorState = (state: State) =>
  state.hasError;
export const getRootCauseAnalysisDataErrorState = (state: State) => state.error;
export const getRootCauseAnalysisDataNotificationState = (state: State) =>
  state.notification;
