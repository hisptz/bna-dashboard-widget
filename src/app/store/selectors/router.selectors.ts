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
      if (paramKey === 'groups') {
        newRouteParams[paramKey] = getGroupArray(routeParams[paramKey]);
      } else {
        newRouteParams[paramKey] = getRouteParamObject(routeParams[paramKey]);
      }
    });
    return newRouteParams;
  }
);

function getGroupArray(urlGroupString) {
  const splitedGroups = (urlGroupString.split(',') || []).map(group => {
    const splitedGroup = group.split('.');
    const groupContent = (splitedGroup[0] || '').split(':');
    const groupMembers = (splitedGroup[1] || '').split(';');
    /* console.log(groupMembers) */ return {
      id: groupContent[0],
      name: _.replace(groupContent[1], '-', ' '),
      members: (groupMembers || []).map(memberContent => {
        const splitedMemberContent = memberContent.split(':');
        return {
          id: splitedMemberContent[0],
          name: _.replace(splitedMemberContent[1], '-', ' ')
        };
      })
    };
  });
  return splitedGroups;
}

function getRouteParamObject(routeParamString) {
  const splitedParam = routeParamString.split(':');
  return {
    id: splitedParam[0],
    name: _.replace(splitedParam[1], '-', ' ')
  };
}
