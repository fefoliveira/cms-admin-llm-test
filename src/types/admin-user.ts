export interface Permission {
  id: string;
  module: string;
  page: string;
  menuItem: string;
  route: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport?: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password?: string; // Only for creation/update
  role: "super_admin" | "admin" | "moderator" | "viewer";
  avatar?: string;
  isActive: boolean;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface AdminUserFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: AdminUser["role"];
  avatar?: File | string;
  isActive: boolean;
  permissions: Permission[];
}

export interface AdminUserFilters {
  search?: string;
  role?: AdminUser["role"];
  isActive?: boolean;
}

// Menu structure for permissions mapping
export interface MenuStructure {
  id: string;
  title: string;
  path: string;
  icon?: string;
  children?: MenuStructure[];
  permissions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    export?: boolean;
  };
}

// Permission template for different roles
export interface RoleTemplate {
  role: AdminUser["role"];
  name: string;
  description: string;
  defaultPermissions: Partial<Permission>[];
}
