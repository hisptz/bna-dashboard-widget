import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import { getRootState, State } from '../reducers';
import { RouterReducerState } from '@ngrx/router-store';

export const getRouteState = createSelector(
  getRootState,
  (state: State) => state.route
);

export const getRouteUrl = createSelector(
  getRouteState,
  (routeState: RouterReducerState) =>
    routeState && routeState.state ? routeState.state.url : ''
);

export const getRouterParams = createSelector(
  getRouteState,
  (routeState: any) => {
    const routeParams =
      routeState && routeState.state ? routeState.state.queryParams : null;

    if (!routeParams) {
      return null;
    }

    const newRouteParams = {};
    _.each(_.keys(routeParams), paramKey => {
      try {
          newRouteParams[paramKey] = JSON.parse(routeParams[paramKey]);
      } catch (e) {
        newRouteParams[paramKey] = { id: routeParams[paramKey] };
      }
    });
    return newRouteParams;
  }
);
