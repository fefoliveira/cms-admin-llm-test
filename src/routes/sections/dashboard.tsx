import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { SplashScreen } from "src/components/loading-screen";

// ----------------------------------------------------------------------

// Dashboard
const DashboardLayout = lazy(() => import("src/layouts/dashboard"));
const RulesPage = lazy(() => import("src/pages/dashboard/rules/rules.view"));
const ConversionRatesPage = lazy(
  () => import("src/pages/dashboard/conversion-rates/conversion-rates.view")
);
const UsersPage = lazy(() => import("src/pages/dashboard/users/users.view"));
const VariablesPage = lazy(
  () => import("src/pages/dashboard/variables/variables.view")
);
const AdminLogsPage = lazy(
  () => import("src/pages/dashboard/admin-logs/admin-logs.view")
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
