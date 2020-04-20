import { User } from '@iapps/ngx-dhis2-http-client';
import { AppAuthority } from '../models/app-authorities.model';

export function getAppAuthorities(currentUser: User): AppAuthority {
  const authorities = currentUser ? currentUser.authorities || [] : [];

  const isSuperUser = authorities.includes('ALL');

  if (isSuperUser) {
    return { All: true };
  }

  return {
    All: false,
    AddRootCause: authorities.includes('BNA_ADD_ROOT_CAUSE'),
    EditRootCause: authorities.includes('BNA_EDIT_ROOT_CAUSE'),
    DeleteRootCause: authorities.includes('BNA_DELETE_ROOT_CAUSE'),
  };
}
