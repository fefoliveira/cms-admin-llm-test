import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { SplashScreen } from "src/components/loading-screen";

// ----------------------------------------------------------------------

// JWT
const JwtLoginPage = lazy(() => import("src/pages/auth/login.view"));

// ----------------------------------------------------------------------

const authJwt = {
  path: "jwt",
  element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: "login",
      element: <JwtLoginPage />,
    },
  ],
};

export const authRoutes = [
  {
    path: "auth",
    children: [authJwt],
  },
];
