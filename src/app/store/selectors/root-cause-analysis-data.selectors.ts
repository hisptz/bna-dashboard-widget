import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import * as fromRoot from '../reducers';
import * as fromRootCauseData from '../reducers/root-cause-analysis-data.reducer';
import { getRouterParams } from './router.selectors';
import { getCurrentRootCauseAnalysisConfiguration } from './root-cause-analysis-configuration.selectors';
import {
  RootCauseAnalysisConfiguration,
  RootCauseAnalysisData
} from '../models';

export const getRootCauseAnalysisDataState = createSelector(
  fromRoot.getRootState,
  (state: fromRoot.State) => state.rootCauseAnalysisData
);

export const getRootCauseAnalysisDataEntities = createSelector(
  getRootCauseAnalysisDataState,
  fromRootCauseData.getRootCauseAnalysisDataEntitiesState
);

export const getRootCauseAnalysisDatas = createSelector(
  getRootCauseAnalysisDataState,
  fromRootCauseData.getAllRootCauseAnalysisDataState
);

export const getAllRootCauseAnalysisData = createSelector(
  getRootCauseAnalysisDatas,
  getCurrentRootCauseAnalysisConfiguration,
  getRouterParams,
  (
    rootCauseAnalysisDatas,
    currentConfiguration: RootCauseAnalysisConfiguration,
    routeParams: any
  ) => {
    const routeIndicators = _.flatten(
      (routeParams ? routeParams.groups || [] : []).map(group => group.members)
    );

    const indicatorIdReference = _.find(
      currentConfiguration ? currentConfiguration.dataElements || [] : [],
      ['name', 'indicatorId']
    );

    return _.map(
      rootCauseAnalysisDatas,
      (rootCauseAnalysisData: RootCauseAnalysisData) => {
        const newDataValues = {};
        _.each(
          currentConfiguration ? currentConfiguration.dataElements : [],
          (dataElement: any) => {
            newDataValues[dataElement.id] = dataElement.routerParam
              ? routeParams
                ? routeParams[dataElement.routerParam.namespace]
                  ? routeParams[dataElement.routerParam.namespace][
                      dataElement.routerParam.key
                    ]
                  : ''
                : ''
              : rootCauseAnalysisData.dataValues[dataElement.id];
          }
        );

        const dataValues = rootCauseAnalysisData.isActive
          ? newDataValues
          : rootCauseAnalysisData.dataValues;

        const indicatorInData =
          dataValues[
            indicatorIdReference ? indicatorIdReference.id : undefined
          ];

        return {
          ...rootCauseAnalysisData,
          isOrphaned:
            !_.find(routeIndicators, ['id', indicatorInData]) &&
            !rootCauseAnalysisData.isActive,
          dataValues
        };
      }
    );
  }
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

export const getRootCauseAnalysisDataSavingColorState = createSelector(
  getRootCauseAnalysisDataState,
  fromRootCauseData.getRootCauseAnalysisDataSavingColorState
);

export const getRootCauseAnalysisDataErrorState = createSelector(
  getRootCauseAnalysisDataState,
  fromRootCauseData.getRootCauseAnalysisDataErrorState
);

export const getRootCauseAnalysisDataNotificationState = createSelector(
  getRootCauseAnalysisDataState,
  fromRootCauseData.getRootCauseAnalysisDataNotificationState
);
