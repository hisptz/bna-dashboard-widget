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
  saveEditButtonTitle: string;
  notification: { message: string };
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
  saveEditButtonTitle: null,
  notification: null,
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
        loaded: true,
        saveEditButtonTitle: 'Edit'
      });
    }

    case RootCauseAnalysisDataActionTypes.UpsertRootCauseAnalysisDatas: {
      return adapter.upsertMany(action.payload.rootCauseAnalysisDatas, state);
    }

    case RootCauseAnalysisDataActionTypes.UpdateRootCauseAnalysisData: {
      return adapter.updateOne(
        {
          id: action.rootCauseAnalysisData.id,
          changes: action.rootCauseAnalysisData
        },
        state
      );
    }

    case RootCauseAnalysisDataActionTypes.UpdateRootCauseAnalysisDatas: {
      return adapter.updateMany(action.payload.rootCauseAnalysisDatas, state);
    }

    case RootCauseAnalysisDataActionTypes.DeleteRootCauseAnalysisData: {
      return adapter.removeOne(action.payload.id, state);
    }

    case RootCauseAnalysisDataActionTypes.DeleteRootCauseAnalysisDatas: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case RootCauseAnalysisDataActionTypes.LoadRootCauseAnalysisDatas: {
      return { ...state, loading: true };
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
          isActive: false,
          notification: {
            message: `Saving analysis data`
          }
        }
      );
    }

    case RootCauseAnalysisDataActionTypes.SaveRootCauseAnalysisDataSuccess: {
      return {
        ...state,
        isActive: false,
        notification: {
          message: `Analysis data successfully updated`
        }
      };
    }

    case RootCauseAnalysisDataActionTypes.SaveRootCauseAnalysisDataFail: {
      return {
        ...state,
        isActive: true,
        notification: {
          message: `Could not update data ${action.error.message}`
        }
      };
    }

    case RootCauseAnalysisDataActionTypes.CreateRootCauseAnalysisData: {
      return {
        ...state,
        notification: {
          message: `Saving Analysis Data`
        }
      };
    }

    case RootCauseAnalysisDataActionTypes.CreateRootCauseAnalysisDataSuccess: {
      return adapter.addOne(action.rootCauseAnalysisData, {
        ...state,
        notification: null
      });
    }

    case RootCauseAnalysisDataActionTypes.CreateRootCauseAnalysisDataFail: {
      return {
        ...state,
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
