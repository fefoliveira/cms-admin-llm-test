import { Order } from './table';

export type AdminLog = {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  oldData: any;
  newData: any;
  description: string;
};

export type AdminLogState = {
  adminLogs: AdminLog[];
  loading: boolean;
  error: string | null;
  order: Order;
  orderBy: string;
  page: number;
  rowsPerPage: number;
  dense: boolean;
  newConditionToggle: boolean;
};