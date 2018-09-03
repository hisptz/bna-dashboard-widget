import { createSelector } from "@ngrx/store";
import * as fromRoot from "../reducers";
import * as fromRootCauseConfiguration from "../reducers/root-cause-analysis-configuration.reducer";
import { getCurrentRootCauseAnalysisWidget } from "./root-cause-analysis-widget.selectors";
import { RootCauseAnalysisWidget } from "../models";

export const getRootCauseAnalysisConfigurationState = createSelector(
  fromRoot.getRootState,
  (state: fromRoot.State) => state.rootCauseAnalysisConfiguration
);

export const getRootCauseAnalysisConfigurationEntities = createSelector(
  getRootCauseAnalysisConfigurationState,
  fromRootCauseConfiguration.getRootCauseAnalysisConfigurationEntitiesState
);

export const getCurrentRootCauseAnalysisConfiguration = createSelector(
  getRootCauseAnalysisConfigurationEntities,
  getCurrentRootCauseAnalysisWidget,
  (
    rootCauseAnalysisConfigurationEntities: any,
    currentRootCauseAnalysisWidget: RootCauseAnalysisWidget
  ) => {
    const configurationId = currentRootCauseAnalysisWidget
      ? currentRootCauseAnalysisWidget.configurationId
      : "";
    return rootCauseAnalysisConfigurationEntities[configurationId];
  }
);
