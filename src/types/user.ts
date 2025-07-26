import { Order } from './table';

export type userRole = 'admin' | 'user';

export type User = {
  id: string;
  email: string;
  displayName: string;
  role: userRole;
  active: boolean;
};

export type UserState = {
  users: User[];
  loading: boolean;
  error: string | null;
  order: Order;
  orderBy: string;
  page: number;
  rowsPerPage: number;
  dense: boolean;
  newConditionToggle: boolean;
};

export type UserUpdatePayload = {
  email: string;
  displayName: string;
  role: userRole;
  active?: boolean;
  password?: string;
};