import { useContext } from "react";
import { AuthContext, AuthContextType } from "../auth/context/auth-context";
import { useAdminUsersStore } from "../store/adminUsers.store";
import { Permission } from "../types/admin-user";

interface UsePermissionsReturn {
  hasPermission: (
    route: string,
    action: "view" | "create" | "edit" | "delete" | "export"
  ) => boolean;
  canViewPage: (route: string) => boolean;
  canCreate: (route: string) => boolean;
  canEdit: (route: string) => boolean;
  canDelete: (route: string) => boolean;
  canExport: (route: string) => boolean;
  getUserPermissions: () => Permission[];
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
}

export function usePermissions(): UsePermissionsReturn {
  const { user } = useContext(AuthContext) as AuthContextType;

  // Se não há usuário logado, negar todas as permissões
  if (!user) {
    return {
      hasPermission: () => false,
      canViewPage: () => false,
      canCreate: () => false,
      canEdit: () => false,
      canDelete: () => false,
      canExport: () => false,
      getUserPermissions: () => [],
      isAdmin: () => false,
      isSuperAdmin: () => false,
    };
  }

  // Super admin sempre tem todas as permissões
  if (user.role === "super_admin") {
    return {
      hasPermission: () => true,
      canViewPage: () => true,
      canCreate: () => true,
      canEdit: () => true,
      canDelete: () => true,
      canExport: () => true,
      getUserPermissions: () => user.permissions || [],
      isAdmin: () => true,
      isSuperAdmin: () => true,
    };
  }

  const currentUserPermissions = user.permissions || [];

  const hasPermission = (
    route: string,
    action: "view" | "create" | "edit" | "delete" | "export"
  ): boolean => {
    const permission = currentUserPermissions.find((p) => p.route === route);
    if (!permission) return false;

    switch (action) {
      case "view":
        return permission.canView;
      case "create":
        return permission.canCreate;
      case "edit":
        return permission.canEdit;
      case "delete":
        return permission.canDelete;
      case "export":
        return permission.canExport || false;
      default:
        return false;
    }
  };

  const canViewPage = (route: string): boolean => {
    return hasPermission(route, "view");
  };

  const canCreate = (route: string): boolean => {
    return hasPermission(route, "create");
  };

  const canEdit = (route: string): boolean => {
    return hasPermission(route, "edit");
  };

  const canDelete = (route: string): boolean => {
    return hasPermission(route, "delete");
  };

  const canExport = (route: string): boolean => {
    return hasPermission(route, "export");
  };

  const getUserPermissionsData = (): Permission[] => {
    return currentUserPermissions;
  };

  const isAdmin = (): boolean => {
    return user.role === "admin" || user.role === "super_admin";
  };

  const isSuperAdmin = (): boolean => {
    return user.role === "super_admin";
  };

  return {
    hasPermission,
    canViewPage,
    canCreate,
    canEdit,
    canDelete,
    canExport,
    getUserPermissions: getUserPermissionsData,
    isAdmin,
    isSuperAdmin,
  };
}
