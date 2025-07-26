import { Navigate, useRoutes } from "react-router-dom";

import { paths } from "../paths";
import { authRoutes } from "./auth";
import { dashboardRoutes } from "./dashboard";
import { errorRoutes } from "./error";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    {
      path: "/",
      element: <Navigate to={paths.dashboard.rules.root} replace />,
    },

    {
      path: "/dashboard/",
      element: <Navigate to={paths.dashboard.rules.root} replace />,
    },

    // ----------------------------------------------------------------------

    // Auth routes
    ...authRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    // Error routes
    ...errorRoutes,

    // No match 404
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
