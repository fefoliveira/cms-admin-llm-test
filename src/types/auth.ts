import { Permission } from "./admin-user";

export type ActionMapType<M extends Record<string, unknown>> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUserType = {
  id: string;
  email: string;
  displayName: string;
  role: "super_admin" | "admin" | "moderator" | "viewer";
  permissions?: Permission[];
  accessToken?: string;
  refreshToken?: string;
  admin_user?: {
    id: string;
    email: string;
    displayName: string;
    role: "super_admin" | "admin" | "moderator" | "viewer";
    permissions?: Permission[];
  };
};

export type AuthStateType = {
  user: AuthUserType | null;
  loading: boolean;
};
