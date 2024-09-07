import { Role } from '@/modules/users/enums/role.enum';

export interface UserPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  iat?: number;
  exp?: number;
}
