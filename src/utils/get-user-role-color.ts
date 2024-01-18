import { UserRoles } from '../types/enums';

export const getUserRoleColor = (role: UserRoles) => {
  switch (role) {
    case UserRoles.Admin:
      return 'error';
    case UserRoles.Contributor:
      return 'info';

    case UserRoles.Publisher:
      return 'success';

    default:
      return 'info';
  }
};
