import { Order } from './table';

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