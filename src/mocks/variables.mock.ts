import { Variable } from 'src/types/variables';

export const variablesMock: Variable[] = [
  {
    id: 'var-001',
    name: 'user_level',
    valueType: 'number',
    inputType: 'select',
    createdBy: 'admin',
  },
  {
    id: 'var-002',
    name: 'purchase_amount',
    valueType: 'number',
    inputType: 'number',
    createdBy: 'admin',
  },
  {
    id: 'var-003',
    name: 'user_category',
    valueType: 'string',
    inputType: 'select',
    createdBy: 'user',
  },
  {
    id: 'var-004',
    name: 'transaction_type',
    valueType: 'string',
    inputType: 'radio',
    createdBy: 'admin',
  },
  {
    id: 'var-005',
    name: 'is_premium_member',
    valueType: 'boolean',
    inputType: 'checkbox',
    createdBy: 'admin',
  },
  {
    id: 'var-006',
    name: 'account_age_days',
    valueType: 'number',
    inputType: 'number',
    createdBy: 'user',
  },
  {
    id: 'var-007',
    name: 'preferred_language',
    valueType: 'string',
    inputType: 'select',
    createdBy: 'admin',
  },
  {
    id: 'var-008',
    name: 'total_points',
    valueType: 'number',
    inputType: 'number',
    createdBy: 'admin',
  },
  {
    id: 'var-009',
    name: 'subscription_status',
    valueType: 'string',
    inputType: 'radio',
    createdBy: 'user',
  },
  {
    id: 'var-010',
    name: 'notification_enabled',
    valueType: 'boolean',
    inputType: 'checkbox',
    createdBy: 'admin',
  },
];
