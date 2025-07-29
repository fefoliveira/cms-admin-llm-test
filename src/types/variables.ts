import { Order } from "./table";

export type Variable = {
  id: string;
  name: string;
  valueType: string;
  inputType: string;
  createdBy: string;
  createdAt?: string; // Adicionando timestamp opcional
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
