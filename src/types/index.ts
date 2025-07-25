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

export type EffectType = 'add' | 'multiply';

export type Effect = { type: EffectType; value: number };

export type OperationType =
  | 'equal'
  | 'not_equal'
  | 'greater'
  | 'greater_equal'
  | 'less'
  | 'less_equal'
  | 'exist'
  | 'not_exist'
  | '';

export type ValueType = 'string' | 'number' | 'date' | 'datetime' | '';

export type InputType = 'basic' | 'list' | '';

export type Condition = {
  field: string;
  operation: OperationType;
  value: string[];
  valueType: ValueType;
  inputType: InputType;
  valueFile: string;
};

export type Rule = {
  id: string;
  name: string;
  effect: Effect;
  conditions: Condition[];
  status: 'active' | 'inactive';
  createdAt?: Date;
  createdBy: string;
};

export type RuleState = {
  rules: Rule[];
  loading: boolean;
  error: string | null;
  order: Order;
  orderBy: string;
  page: number;
  rowsPerPage: number;
  dense: boolean;
  newConditionToggle: boolean;
};

export type RuleUpdatePayload = {
  name: string;
  effect: { type: 'add' | 'multiply'; value: string };
  conditions: Condition[];
  status: 'active' | 'inactive';
};

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

export * from './auth';
export * from './table';