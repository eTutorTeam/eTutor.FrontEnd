import { RoleTypes } from '../enums/role-types.enum';

export interface UserTokenResponse {
  token: string;
  roles: RoleTypes[];
  userName: string;
  email: string;
  uId: number;
}
