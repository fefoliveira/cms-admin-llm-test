import React from "react";
import { usePermissions } from "../../hooks/use-permissions";

interface PermissionGuardProps {
  route: string;
  action: "view" | "create" | "edit" | "delete" | "export";
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PermissionGuard({
  route,
  action,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const { hasPermission } = usePermissions();

  if (!hasPermission(route, action)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface PageGuardProps {
  route: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PageGuard({ route, children, fallback }: PageGuardProps) {
  return (
    <PermissionGuard route={route} action="view" fallback={fallback}>
      {children}
    </PermissionGuard>
  );
}
