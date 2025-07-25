export type ActionMapType<M extends Record<string, any>> = {
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
  role: string;
  accessToken?: string;
  refreshToken?: string;
  admin_user?: {
    id: string;
    email: string;
    displayName: string;
    role: string;
  };
};

export type AuthStateType = {
  user: AuthUserType | null;
  loading: boolean;
};