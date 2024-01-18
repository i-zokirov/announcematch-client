import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useReducer } from 'react';
import { SignUpRequest, authApi } from '../../api/auth';
import { User } from '../../types/user';
import type { State } from './auth-context';
import { AuthContext, initialState } from './auth-context';

const STORAGE_KEY = 'access_token';

enum ActionType {
  INITIALIZE = 'INITIALIZE',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SIGN_OUT = 'SIGN_OUT'
}

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    user: User | null;
    accessToken?: string;
  };
};

type SignInAction = {
  type: ActionType.SIGN_IN;
  payload: {
    user: User;
    accessToken?: string;
  };
};

type SignUpAction = {
  type: ActionType.SIGN_UP;
  payload: {
    user: User;
    accessToken?: string;
  };
};

type SignOutAction = {
  type: ActionType.SIGN_OUT;
};

type Action = InitializeAction | SignInAction | SignUpAction | SignOutAction;

type Handler = (state: State, action: any) => State;

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user, accessToken } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      accessToken
    };
  },

  SIGN_IN: (state: State, action: SignInAction): State => {
    const { user, accessToken } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      accessToken
    };
  },

  SIGN_UP: (state: State, action: SignUpAction): State => {
    const { user, accessToken } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      accessToken
    };
  },
  SIGN_OUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null,
    accessToken: undefined
  })
};

const reducer = (state: State, action: Action): State => (handlers[action.type] ? handlers[action.type](state, action) : state);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async (): Promise<void> => {
    try {
      const access_token = window.sessionStorage.getItem(STORAGE_KEY);

      if (access_token) {
        const user = await authApi.me({ access_token });

        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
            user,
            accessToken: access_token
          }
        });
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    } catch (err) {
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
          user: null
        }
      });
    }
  }, [dispatch]);

  useEffect(() => {
    initialize();
  }, []);

  const signIn = useCallback(
    async (email: string, password: string): Promise<void> => {
      const result = await authApi.signIn({ email, password });
      if (result) {
        const { access_token } = result;
        const user = await authApi.me({ access_token });
        sessionStorage.setItem(STORAGE_KEY, access_token);
        dispatch({
          type: ActionType.SIGN_IN,
          payload: {
            user,
            accessToken: access_token
          }
        });
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    },
    [dispatch]
  );

  const signUp = useCallback(
    async (request: SignUpRequest): Promise<void> => {
      const result = await authApi.signUp(request);
      if (result) {
        const { access_token } = result;
        const user = await authApi.me({ access_token });
        sessionStorage.setItem(STORAGE_KEY, access_token);
        dispatch({
          type: ActionType.SIGN_UP,
          payload: {
            user,
            accessToken: access_token
          }
        });

        sessionStorage.setItem(STORAGE_KEY, access_token);

        dispatch({
          type: ActionType.SIGN_UP,
          payload: {
            user
          }
        });
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    },
    [dispatch]
  );

  const signOut = useCallback(async (): Promise<void> => {
    sessionStorage.removeItem(STORAGE_KEY);
    dispatch({ type: ActionType.SIGN_OUT });
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
