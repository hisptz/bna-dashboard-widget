import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { RootCauseAnalysisWidget } from "../models/root-cause-analysis-widget.model";
import {
  RootCauseAnalysisWidgetActions,
  RootCauseAnalysisWidgetActionTypes
} from "../actions/root-cause-analysis-widget.actions";

export interface State extends EntityState<RootCauseAnalysisWidget> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  error: any;
  currentWidget: string;
}

export const adapter: EntityAdapter<
  RootCauseAnalysisWidget
> = createEntityAdapter<RootCauseAnalysisWidget>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false,
  hasError: false,
  error: null,
  currentWidget: ""
});

export function reducer(
  state = initialState,
  action: RootCauseAnalysisWidgetActions
): State {
  switch (action.type) {
    case RootCauseAnalysisWidgetActionTypes.AddRootCauseAnalysisWidget: {
      return adapter.addOne(action.rootCauseAnalysisWidget, {
        ...state,
        loaded: true
      });
    }

    case RootCauseAnalysisWidgetActionTypes.UpsertRootCauseAnalysisWidget: {
      return adapter.upsertOne(action.payload.rootCauseAnalysisWidget, state);
    }

    case RootCauseAnalysisWidgetActionTypes.AddRootCauseAnalysisWidgets: {
      return adapter.addMany(action.payload.rootCauseAnalysisWidgets, state);
    }

    case RootCauseAnalysisWidgetActionTypes.UpsertRootCauseAnalysisWidgets: {
      return adapter.upsertMany(action.payload.rootCauseAnalysisWidgets, state);
    }

    case RootCauseAnalysisWidgetActionTypes.UpdateRootCauseAnalysisWidget: {
      return adapter.updateOne(action.payload.rootCauseAnalysisWidget, state);
    }

    case RootCauseAnalysisWidgetActionTypes.UpdateRootCauseAnalysisWidgets: {
      return adapter.updateMany(action.payload.rootCauseAnalysisWidgets, state);
    }

    case RootCauseAnalysisWidgetActionTypes.DeleteRootCauseAnalysisWidget: {
      return adapter.removeOne(action.payload.id, state);
    }

    case RootCauseAnalysisWidgetActionTypes.DeleteRootCauseAnalysisWidgets: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case RootCauseAnalysisWidgetActionTypes.LoadRootCauseAnalysisWidget: {
      return { ...state, loading: true };
    }

    case RootCauseAnalysisWidgetActionTypes.LoadRootCauseAnalysisWidgetFail: {
      return {
        ...state,
        loading: false,
        loaded: false,
        hasError: true,
        error: action.error
      };
    }

    case RootCauseAnalysisWidgetActionTypes.ClearRootCauseAnalysisWidgets: {
      return adapter.removeAll(state);
    }

    case RootCauseAnalysisWidgetActionTypes.SetCurrentRootCauseAnalysisWidget: {
      return { ...state, currentWidget: action.currentWidgetId };
    }

    default: {
      return state;
    }
  }
}

export const {
  selectEntities: getRootCauseAnalysisWidgetEntitiesState
} = adapter.getSelectors();
