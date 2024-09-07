import { Role } from '@/modules/users/enums/role.enum';

export interface UserToken {
  access_token: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    roles: Role[];
    id: string;
  };
}
