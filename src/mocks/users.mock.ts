import { User } from 'src/types/user';

export const usersMock: User[] = [
  {
    id: 'user-001',
    email: 'admin@company.com',
    displayName: 'Admin User',
    role: 'admin',
    active: true,
  },
  {
    id: 'user-002',
    email: 'manager@company.com',
    displayName: 'Manager Silva',
    role: 'user',
    active: true,
  },
  {
    id: 'user-003',
    email: 'user1@company.com',
    displayName: 'João Santos',
    role: 'user',
    active: false,
  },
  {
    id: 'user-004',
    email: 'user2@company.com',
    displayName: 'Maria Oliveira',
    role: 'user',
    active: true,
  },
  {
    id: 'user-005',
    email: 'admin2@company.com',
    displayName: 'Super Admin',
    role: 'admin',
    active: true,
  },
  {
    id: 'user-006',
    email: 'user3@company.com',
    displayName: 'Pedro Costa',
    role: 'user',
    active: false,
  },
  {
    id: 'user-007',
    email: 'manager2@company.com',
    displayName: 'Ana Lima',
    role: 'admin',
    active: true,
  },
  {
    id: 'user-008',
    email: 'user4@company.com',
    displayName: 'Carlos Ferreira',
    role: 'user',
    active: true,
  },
];