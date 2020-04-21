import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { selectAllUsers } from '../reducers/user.reducer';
import { User } from '@iapps/ngx-dhis2-http-client';
import { getAppAuthorities } from 'src/app/helpers/get-app-authorities.helper';
export const getUserState = createSelector(
  getRootState,
  (state: State) => state.user
);

export const getAllUser = createSelector(getUserState, selectAllUsers);

export const getCurrentUser = createSelector(
  getAllUser,
  (users: User[]) => users[0]
);

export const getAppManagementAuthorities = createSelector(
  getCurrentUser,
  (currentUser: User) => getAppAuthorities(currentUser)
);
