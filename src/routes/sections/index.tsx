import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { paths } from 'src/routes/paths';
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// Dashboard
const DashboardLayout = lazy(() => import('src/layouts/dashboard'));
const RulesPage = lazy(() => import('src/pages/dashboard/rules/rules.view'));
const ConversionRatesPage = lazy(() => import('src/pages/dashboard/conversion-rates/conversion-rates.view'));
const UsersPage = lazy(() => import('src/pages/dashboard/users/users.view'));
const VariablesPage = lazy(() => import('src/pages/dashboard/variables/variables.view'));
const AdminLogsPage = lazy(() => import('src/pages/dashboard/admin-logs/admin-logs.view'));

// Auth
const LoginPage = lazy(() => import('src/pages/auth/login.view'));

// Error
const Page404 = lazy(() => import('src/pages/error/404.view'));

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={paths.dashboard.rules.root} replace />,
    },
    {
      path: paths.dashboard.root,
      element: (
        <Suspense fallback={<SplashScreen />}>
          <DashboardLayout />
        </Suspense>
      ),
      children: [
        { element: <Navigate to={paths.dashboard.rules.root} replace />, index: true },
        { path: 'rules', element: <RulesPage /> },
        { path: 'conversionrate', element: <ConversionRatesPage /> },
        { path: 'users', element: <UsersPage /> },
        { path: 'variables', element: <VariablesPage /> },
        { path: 'adminlogs', element: <AdminLogsPage /> },
      ],
    },
    {
      path: paths.auth.jwt.login,
      element: (
        <Suspense fallback={<SplashScreen />}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: '*',
      element: (
        <Suspense fallback={<SplashScreen />}>
          <Page404 />
        </Suspense>
      ),
    },
  ]);
}