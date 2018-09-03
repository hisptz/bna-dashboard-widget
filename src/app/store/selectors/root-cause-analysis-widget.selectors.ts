import { createSelector } from "@ngrx/store";
import * as fromRoot from "../reducers";
import * as fromRootCauseWidget from "../reducers/root-cause-analysis-widget.reducer";

export const getRootCauseAnalysisWidgetState = createSelector(
  fromRoot.getRootState,
  (state: fromRoot.State) => state.rootCauseAnalysisWidget
);

export const getCurrentRootCauseAnalysisWidget = createSelector(
  getRootCauseAnalysisWidgetState,
  (rootCauseWidget: fromRootCauseWidget.State) =>
    rootCauseWidget.entities[rootCauseWidget.currentWidget]
);
