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
      { path: "variables", element: <VariablesPage /> },
      { path: "adminlogs", element: <AdminLogsPage /> },
    ],
  },
];
