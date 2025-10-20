import { IUser } from '@/models/IUser';

export interface IAuthContext {
  user: IUser | null;
}
