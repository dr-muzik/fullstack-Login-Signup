import React, { ReactNode, createContext, useContext, useReducer, useState } from 'react';

interface AuthState {
  isAuthenticated: boolean;
}

type AuthAction = { type: 'LOGIN' } | { type: 'LOGOUT' };

interface IUser {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
}

interface AuthContextType {
  authState: AuthState;
  login: () => void;
  logout: () => void;
  setUser: (arg: IUser | null ) => void;
  user: IUser | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      const loginState = { ...state, isAuthenticated: true };
      console.log(loginState);
      return loginState;
    case 'LOGOUT':
        const logoutState = { ...state, isAuthenticated: false };
      console.log(logoutState);
      return logoutState;
    //   return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

// interface authProviderProp {
//     children: ReactNode;
// }
const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
  });

  const login = () => dispatch({ type: 'LOGIN' });
  const logout = () => dispatch({ type: 'LOGOUT' });
  const [user, setUser] = useState<IUser | null>(null)

    // console.log(user)
  return (
    <AuthContext.Provider value={{ authState, login, logout, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

//making
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };

