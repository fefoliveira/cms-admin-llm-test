import { useMemo, useEffect, useReducer, useCallback } from "react";

import axios, { endpoints } from "../../../utils/axios";
import { mockLoggedUser } from "../../../mocks/auth.mock";

import { AuthContext } from "../auth-context";
import { AuthUserType, ActionMapType, AuthStateType } from "../../../types";
import {
  jwtDecode,
  setSession,
  isValidToken,
  STORAGE_KEY_ACCESS,
  STORAGE_KEY_REFRESH,
} from "../utils";

// ----------------------------------------------------------------------
// CONFIGURAÇÃO: SEMPRE LOGADO
// Para desabilitar e usar autenticação real, altere ALWAYS_LOGGED_IN para false
const ALWAYS_LOGGED_IN = true;
// ----------------------------------------------------------------------

enum Types {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      // Se ALWAYS_LOGGED_IN estiver ativo, sempre manter usuário logado
      if (ALWAYS_LOGGED_IN) {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: mockLoggedUser,
          },
        });
        return;
      }

      // Código para autenticação real (quando ALWAYS_LOGGED_IN = false)
      const accessToken = localStorage.getItem(STORAGE_KEY_ACCESS);
      const refreshToken = localStorage.getItem(STORAGE_KEY_REFRESH);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken, refreshToken);

        const adminUser = jwtDecode(accessToken) as AuthUserType;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...adminUser?.admin_user,
              accessToken,
            },
          },
        });
      } else if (refreshToken && isValidToken(refreshToken)) {
        const token = await axios.post(endpoints.auth.refresh, {
          refreshToken,
        });

        setSession(token.data.accessToken, refreshToken);

        const adminUser = jwtDecode(token.data.accessToken) as AuthUserType;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...adminUser?.admin_user,
              refreshToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      // Se ALWAYS_LOGGED_IN estiver ativo, manter usuário logado mesmo em caso de erro
      if (ALWAYS_LOGGED_IN) {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: mockLoggedUser,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    // Se ALWAYS_LOGGED_IN estiver ativo, sempre fazer login com sucesso
    if (ALWAYS_LOGGED_IN) {
      dispatch({
        type: Types.LOGIN,
        payload: {
          user: mockLoggedUser,
        },
      });
      return;
    }

    // Código para autenticação real (quando ALWAYS_LOGGED_IN = false)
    const data = {
      email,
      password,
      host: window.location.host,
    };

    const res = await axios.post(`${endpoints.auth.login}`, data);

    const { accessToken, refreshToken, adminUser } = res.data;

    setSession(accessToken, refreshToken);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...adminUser,
          accessToken,
        },
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    // Se ALWAYS_LOGGED_IN estiver ativo, não fazer logout real
    if (ALWAYS_LOGGED_IN) {
      // Apenas simular um logout momentâneo e fazer login novamente
      dispatch({
        type: Types.LOGOUT,
      });

      // Imediatamente fazer login novamente para manter sempre logado
      setTimeout(() => {
        dispatch({
          type: Types.LOGIN,
          payload: {
            user: mockLoggedUser,
          },
        });
      }, 100);
      return;
    }

    // Código para logout real (quando ALWAYS_LOGGED_IN = false)
    setSession(null, null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: "jwt",
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      //
      login,
      logout,
    }),
    [login, logout, state.user, status]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
