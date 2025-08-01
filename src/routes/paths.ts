// src/routes/path.ts

// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: "/auth",
  AUTH_DEMO: "/auth-demo",
  DASHBOARD: "/dashboard",

  // ROOTS DO PAINEL ADMINISTRATIVO:
  ADMIN_USER: "/admin-user",
  CONVERSION_RATE: "/conversionrate",
  RULES: "/rules",
  VARIABLES: "/variables",
  ADMIN_LOG: "/adminlog",
  POINTS: "/points",
};

// ----------------------------------------------------------------------

export const paths = {
  page403: "/403",
  page404: "/404",
  page500: "/500",

  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },

  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,

    // PAINEL ADMINISTRATIVO
    rules: {
      root: `${ROOTS.DASHBOARD}/rules`,
      edit: `${ROOTS.DASHBOARD}/rules/:id`,
      create: `${ROOTS.DASHBOARD}/rules/create`,
    },
    conversionRate: {
      root: `${ROOTS.DASHBOARD}/conversionrate`,
      create: `${ROOTS.DASHBOARD}/conversionrate/create`,
    },
    variables: `${ROOTS.DASHBOARD}/variables`,
    adminUsers: {
      root: `${ROOTS.DASHBOARD}/admin-users`,
      create: `${ROOTS.DASHBOARD}/admin-users/create`,
      edit: `${ROOTS.DASHBOARD}/admin-users/edit/:id`,
      permissions: `${ROOTS.DASHBOARD}/admin-users/permissions/:id`,
    },
    adminLogs: `${ROOTS.DASHBOARD}/adminlogs`,
  },
};
