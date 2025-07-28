import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { SplashScreen } from "@/components/loading-screen";

// ----------------------------------------------------------------------

// Dashboard
const DashboardLayout = lazy(() => import("@/layouts/dashboard"));
const RulesPage = lazy(() => import("@/pages/dashboard/rules/rules.view"));
const ConversionRatesPage = lazy(
  () => import("@/pages/dashboard/conversion-rates/conversion-rates.view")
);
const UsersPage = lazy(() => import("@/pages/dashboard/users/users.view"));
const VariablesPage = lazy(
  () => import("@/pages/dashboard/variables/variables.view")
);
const AdminLogsPage = lazy(
  () => import("@/pages/dashboard/admin-logs/admin-logs.view")
);
const AdminUsersListPage = lazy(
  () => import("@/pages/dashboard/admin-users/admin-users-list.view")
);
const AdminUserFormPage = lazy(
  () => import("@/pages/dashboard/admin-users/admin-user-form.view")
);
const AdminUserPermissionsPage = lazy(
  () => import("@/pages/dashboard/admin-users/admin-user-permissions.view")
);

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: "dashboard",
    element: (
      <Suspense fallback={<SplashScreen />}>
        <DashboardLayout />
      </Suspense>
    ),
    children: [
      { path: "rules", element: <RulesPage /> },
      { path: "conversionrate", element: <ConversionRatesPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "admin-users", element: <AdminUsersListPage /> },
      { path: "admin-users/create", element: <AdminUserFormPage /> },
      { path: "admin-users/edit/:id", element: <AdminUserFormPage /> },
      {
        path: "admin-users/permissions/:id",
        element: <AdminUserPermissionsPage />,
      },
      { path: "variables", element: <VariablesPage /> },
      { path: "adminlogs", element: <AdminLogsPage /> },
    ],
  },
];
