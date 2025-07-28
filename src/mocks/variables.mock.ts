import { Variable } from 'src/types/variables';

export const variablesMock: Variable[] = [
  {
    id: 'var-001',
    name: 'COMMISSION_RATE',
    valueType: '3.5',
    inputType: 'number',
    createdBy: 'admin',
  },
  {
    id: 'var-002',
    name: 'MAX_TRANSACTION_AMOUNT',
    valueType: '50000',
    inputType: 'number',
    createdBy: 'admin',
  },
  {
    id: 'var-003',
    name: 'SYSTEM_MAINTENANCE_MODE',
    valueType: 'false',
    inputType: 'boolean',
    createdBy: 'admin',
  },
  {
    id: 'var-004',
    name: 'EMAIL_NOTIFICATION_ENABLED',
    valueType: 'true',
    inputType: 'boolean',
    createdBy: 'manager',
  },
  {
    id: 'var-005',
    name: 'DEFAULT_CURRENCY',
    valueType: 'BRL',
    inputType: 'string',
    createdBy: 'admin',
  },
  {
    id: 'var-006',
    name: 'SESSION_TIMEOUT',
    valueType: '3600',
    inputType: 'number',
    createdBy: 'admin',
  },
  {
    id: 'var-007',
    name: 'API_RATE_LIMIT',
    valueType: '1000',
    inputType: 'number',
    createdBy: 'admin',
  },
  {
    id: 'var-008',
    name: 'BACKUP_FREQUENCY',
    valueType: 'daily',
    inputType: 'string',
    createdBy: 'manager',
  },
];