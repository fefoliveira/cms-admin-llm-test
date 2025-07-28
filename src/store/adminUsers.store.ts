import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  AdminUser,
  AdminUserFilters,
  Permission,
  MenuStructure,
  RoleTemplate,
} from "../types/admin-user";

// Menu structure mapping for automatic permission generation
const MENU_STRUCTURE: MenuStructure[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    path: "/dashboard",
    permissions: { view: true, create: false, edit: false, delete: false },
  },
  {
    id: "rules",
    title: "Regras",
    path: "/dashboard/rules",
    permissions: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      export: true,
    },
  },
  {
    id: "conversion-rates",
    title: "Taxas de Conversão",
    path: "/dashboard/conversionrate",
    permissions: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      export: true,
    },
  },
  {
    id: "users",
    title: "Usuários",
    path: "/dashboard/users",
    permissions: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      export: true,
    },
  },
  {
    id: "admin-users",
    title: "Usuários Admin",
    path: "/dashboard/admin-users",
    permissions: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      export: false,
    },
  },
  {
    id: "variables",
    title: "Variáveis",
    path: "/dashboard/variables",
    permissions: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      export: true,
    },
  },
  {
    id: "admin-logs",
    title: "Logs de Admin",
    path: "/dashboard/adminlogs",
    permissions: {
      view: true,
      create: false,
      edit: false,
      delete: false,
      export: true,
    },
  },
];

// Role templates with default permissions
const ROLE_TEMPLATES: RoleTemplate[] = [
  {
    role: "super_admin",
    name: "Super Administrador",
    description: "Acesso total ao sistema",
    defaultPermissions: MENU_STRUCTURE.map((menu) => ({
      module: "dashboard",
      page: menu.title,
      menuItem: menu.title,
      route: menu.path,
      canView: true,
      canCreate: menu.permissions.create,
      canEdit: menu.permissions.edit,
      canDelete: menu.permissions.delete,
      canExport: menu.permissions.export || false,
    })),
  },
  {
    role: "admin",
    name: "Administrador",
    description: "Acesso amplo, exceto gerenciamento de admins",
    defaultPermissions: MENU_STRUCTURE.filter(
      (menu) => menu.id !== "admin-users"
    ).map((menu) => ({
      module: "dashboard",
      page: menu.title,
      menuItem: menu.title,
      route: menu.path,
      canView: true,
      canCreate: menu.permissions.create,
      canEdit: menu.permissions.edit,
      canDelete: menu.permissions.delete,
      canExport: menu.permissions.export || false,
    })),
  },
  {
    role: "moderator",
    name: "Moderador",
    description: "Acesso de edição limitado",
    defaultPermissions: MENU_STRUCTURE.filter(
      (menu) => !["admin-users", "variables", "admin-logs"].includes(menu.id)
    ).map((menu) => ({
      module: "dashboard",
      page: menu.title,
      menuItem: menu.title,
      route: menu.path,
      canView: true,
      canCreate: menu.id === "dashboard" ? false : true,
      canEdit: menu.id === "dashboard" ? false : true,
      canDelete: false,
      canExport: menu.permissions.export || false,
    })),
  },
  {
    role: "viewer",
    name: "Visualizador",
    description: "Apenas visualização",
    defaultPermissions: MENU_STRUCTURE.filter(
      (menu) => !["admin-users", "variables", "admin-logs"].includes(menu.id)
    ).map((menu) => ({
      module: "dashboard",
      page: menu.title,
      menuItem: menu.title,
      route: menu.path,
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canExport: false,
    })),
  },
];

// Mock data
const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: "1",
    name: "Fernando Oliveira",
    email: "fernando@roxcode.io",
    role: "super_admin",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    isActive: true,
    permissions: ROLE_TEMPLATES.find(
      (t) => t.role === "super_admin"
    )?.defaultPermissions.map((p, index) => ({
      id: `perm_${index + 1}`,
      ...p,
    })) as Permission[],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-07-28T14:20:00Z",
    lastLogin: "2024-07-28T14:20:00Z",
  },
  {
    id: "2",
    name: "Maria Silva",
    email: "maria@roxcode.io",
    role: "admin",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b3bb?w=150",
    isActive: true,
    permissions: ROLE_TEMPLATES.find(
      (t) => t.role === "admin"
    )?.defaultPermissions.map((p, index) => ({
      id: `perm_${index + 10}`,
      ...p,
    })) as Permission[],
    createdAt: "2024-02-10T09:15:00Z",
    updatedAt: "2024-07-25T16:45:00Z",
    lastLogin: "2024-07-27T11:30:00Z",
  },
  {
    id: "3",
    name: "João Santos",
    email: "joao@roxcode.io",
    role: "moderator",
    isActive: true,
    permissions: ROLE_TEMPLATES.find(
      (t) => t.role === "moderator"
    )?.defaultPermissions.map((p, index) => ({
      id: `perm_${index + 20}`,
      ...p,
    })) as Permission[],
    createdAt: "2024-03-05T14:20:00Z",
    updatedAt: "2024-07-20T10:10:00Z",
    lastLogin: "2024-07-26T08:45:00Z",
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana@roxcode.io",
    role: "viewer",
    isActive: false,
    permissions: ROLE_TEMPLATES.find(
      (t) => t.role === "viewer"
    )?.defaultPermissions.map((p, index) => ({
      id: `perm_${index + 30}`,
      ...p,
    })) as Permission[],
    createdAt: "2024-04-12T11:00:00Z",
    updatedAt: "2024-07-15T13:25:00Z",
    lastLogin: "2024-07-10T15:20:00Z",
  },
];

interface AdminUsersStore {
  adminUsers: AdminUser[];
  loading: boolean;
  filters: AdminUserFilters;
  selectedUser: AdminUser | null;

  // Actions
  fetchAdminUsers: () => Promise<void>;
  createAdminUser: (
    userData: Omit<AdminUser, "id" | "createdAt" | "updatedAt">
  ) => Promise<AdminUser>;
  updateAdminUser: (
    id: string,
    userData: Partial<AdminUser>
  ) => Promise<AdminUser>;
  deleteAdminUser: (id: string) => Promise<void>;
  toggleUserStatus: (id: string) => Promise<void>;
  setFilters: (filters: AdminUserFilters) => void;
  setSelectedUser: (user: AdminUser | null) => void;

  // Permission helpers
  generatePermissionsForRole: (role: AdminUser["role"]) => Permission[];
  getMenuStructure: () => MenuStructure[];
  getRoleTemplates: () => RoleTemplate[];
  getUserPermissions: (userId: string) => Permission[];
  updateUserPermissions: (
    userId: string,
    permissions: Permission[]
  ) => Promise<void>;

  // Utils
  getFilteredUsers: () => AdminUser[];
  clearFilters: () => void;
}

export const useAdminUsersStore = create<AdminUsersStore>()(
  persist(
    (set, get) => ({
      adminUsers: [],
      loading: false,
      filters: {},
      selectedUser: null,

      fetchAdminUsers: async () => {
        set({ loading: true });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        set({ adminUsers: MOCK_ADMIN_USERS, loading: false });
      },

      createAdminUser: async (userData) => {
        set({ loading: true });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        const newUser: AdminUser = {
          ...userData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          adminUsers: [...state.adminUsers, newUser],
          loading: false,
        }));

        return newUser;
      },

      updateAdminUser: async (id, userData) => {
        set({ loading: true });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        set((state) => ({
          adminUsers: state.adminUsers.map((user) =>
            user.id === id
              ? { ...user, ...userData, updatedAt: new Date().toISOString() }
              : user
          ),
          loading: false,
        }));

        const updatedUser = get().adminUsers.find((u) => u.id === id)!;
        return updatedUser;
      },

      deleteAdminUser: async (id) => {
        set({ loading: true });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        set((state) => ({
          adminUsers: state.adminUsers.filter((user) => user.id !== id),
          loading: false,
        }));
      },

      toggleUserStatus: async (id) => {
        const user = get().adminUsers.find((u) => u.id === id);
        if (user) {
          await get().updateAdminUser(id, { isActive: !user.isActive });
        }
      },

      setFilters: (filters) => {
        set({ filters });
      },

      setSelectedUser: (user) => {
        set({ selectedUser: user });
      },

      generatePermissionsForRole: (role) => {
        const template = ROLE_TEMPLATES.find((t) => t.role === role);
        return (
          (template?.defaultPermissions.map((p, index) => ({
            id: `perm_${Date.now()}_${index}`,
            ...p,
          })) as Permission[]) || []
        );
      },

      getMenuStructure: () => MENU_STRUCTURE,

      getRoleTemplates: () => ROLE_TEMPLATES,

      getUserPermissions: (userId) => {
        const user = get().adminUsers.find((u) => u.id === userId);
        return user?.permissions || [];
      },

      updateUserPermissions: async (userId, permissions) => {
        await get().updateAdminUser(userId, { permissions });
      },

      getFilteredUsers: () => {
        const { adminUsers, filters } = get();

        return adminUsers.filter((user) => {
          if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            if (
              !user.name.toLowerCase().includes(searchLower) &&
              !user.email.toLowerCase().includes(searchLower)
            ) {
              return false;
            }
          }

          if (filters.role && user.role !== filters.role) {
            return false;
          }

          if (
            filters.isActive !== undefined &&
            user.isActive !== filters.isActive
          ) {
            return false;
          }

          return true;
        });
      },

      clearFilters: () => {
        set({ filters: {} });
      },
    }),
    {
      name: "admin-users-store",
      partialize: (state) => ({
        adminUsers: state.adminUsers,
        filters: state.filters,
      }),
    }
  )
);
