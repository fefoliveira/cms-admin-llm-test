import { Order } from './table';

export type Status = 'active' | 'inactive';

export type ConversionRate = {
  id: string;
  name: string;
  rate: number;
  default: boolean;
  status: Status;
  startDate: Date;
  endDate: Date;
  createdBy: string;
};

export type ConversionRateState = {
  conversionRates: ConversionRate[];
  loading: boolean;
  error: string | null;
  order: Order;
  orderBy: string;
  page: number;
  rowsPerPage: number;
  dense: boolean;
  newConditionToggle: boolean;
};

export type ConversionRateUpdatePayload = {
  name?: string;
  rate?: number;
  status?: Status;
  startDate?: Date;
  endDate?: Date;
};