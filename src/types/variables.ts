import { Order } from './table';

export type Variable = {
  id: string;
  name: string;
  valueType: string;
  inputType: string;
  createdBy: string;
};

export type VariableState = {
  variables: Variable[];
  loading: boolean;
  error: string | null;
  order: Order;
  orderBy: string;
  page: number;
  rowsPerPage: number;
  dense: boolean;
  newConditionToggle: boolean;
};