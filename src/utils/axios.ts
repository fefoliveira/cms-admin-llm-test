import axios, { AxiosRequestConfig } from "axios";

import { HOST_API } from "../config-global";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  // ENDPOINTS DO PAINEL ADMINISTRATIVO:
  adminLogs: "/adminlog",
  adminUser: {
    getAll: "/adminuser",
    getById: "/adminuser",
    create: "/adminuser/create",
    update: "/adminuser/update",
    updateByEmail: "/adminuser/update-by-email",
    inactivate: "/adminuser/inactivate",
  },
  auth: {
    me: "/api/auth/me",
    register: "/api/auth/register",
    login: "/auth/login",
    refresh: "/auth/refresh", // Refresh access token
    logout: "/auth/logout",
    clientToken: "/auth/client-token",
  },
  conversionRates: {
    getAll: "/conversionrate",
    getActive: "/conversionrate/active",
    create: "/conversionrate/create",
    update: "/conversionrate/update",
    inactivate: "/conversionrate/inactivate",
    activate: "/conversionrate/activate",
  },
  points: {
    generatePoints: "/points/generate",
  },
  rules: {
    getAll: "/rules",
    getActive: "/rules/active",
    create: "/rules/create",
    update: "/rules/update",
    inactivate: "/rules/inactivate",
  },
  variables: "/variables",
  upload: {
    file: "/upload",
    image: "/upload/image", // Rota que só será usada para o upload de novas imagens para novos sites, a princípio somente via Insomnia
  },
  download: {
    image: "/download/image",
  },
};
