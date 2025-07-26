import { lazy, Suspense } from "react";

import { SplashScreen } from "@/components/loading-screen";

// ----------------------------------------------------------------------

// Error
const Page404 = lazy(() => import("@/pages/error/404.view"));

// ----------------------------------------------------------------------

export const errorRoutes = [
  {
    path: "404",
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Page404 />
      </Suspense>
    ),
  },
];
