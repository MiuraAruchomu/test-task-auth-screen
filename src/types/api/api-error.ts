import { STATUS } from '@/constants/request';

export type TApiStatus = (typeof STATUS)[keyof typeof STATUS];

export interface IApiError {
  status: TApiStatus;
  message: string;
}
