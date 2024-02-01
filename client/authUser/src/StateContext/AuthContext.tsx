import React, { ReactNode, createContext, useContext, useEffect, useReducer, useState } from 'react';
import { IQuestion, ICollation } from "../Questiongenerators";


interface AuthState {
  isAuthenticated: boolean;
}

type AuthAction = { type: 'LOGIN' } | { type: 'LOGOUT' };

export interface IUser {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    image_url: string;
}

interface AuthContextType {
  authState: AuthState;
  login: () => void;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  user: IUser | null;
  selectedAnswers: ICollation[];
  data: IQuestion[];
  object: IQuestion[];
  seconds: number;
  QuestionsNum: number;
  // questions: IQuestion;
  updateQuestionsNum(arg: number): void;
  updateSeconds(arg: number): void;
  updateSelectedAnswers(arg: ICollation[]): void;
  updateData(arg: IQuestion[]): void;
  updateObject(arg: IQuestion[]): void;
  // setId: React.Dispatch<React.SetStateAction<number| null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState = {
  isAuthenticated: false,
};
 

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
  
  // const [id, setId] = useState<number |null>(() => {
  //   const localStorageKey = 'id';
  //   // Load state from localStorage or use null
  //   const storedId = localStorage.getItem(localStorageKey);
  //   return storedId ? JSON.parse(storedId) : null;
  // })
  

  // useEffect(() => {
  //   localStorage.setItem('id', JSON.stringify(id));
  // }, [id]);


  // console.log("from authcontext", id);

  const tabId = Math.random().toString(36).substring(7);

  // Load state from localStorage or use initial state]
  const sessionStorageKey = `auth_${tabId}`
  const localStorageUserKey = `user_${tabId}`
  const storedAuthState = sessionStorage.getItem(sessionStorageKey);
  const initialAuthState = storedAuthState ? JSON.parse(storedAuthState) : initialState;



  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  // Update localStorage whenever authState changes
  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(authState));
  }, [authState, sessionStorageKey]);

  const [user, setUser] = useState<IUser | null>(() => {
    // Load state from localStorage or use null
    // const localStorageKey = `user_${Date.now()}`
    const storedUser = localStorage.getItem(localStorageUserKey);
    return storedUser ? JSON.parse(storedUser) : null;
  });

   // Update localStorage whenever the user state changes
   useEffect(() => {
    localStorage.setItem(localStorageUserKey, JSON.stringify(user));
  }, [user]);


  const login = () => dispatch({ type: 'LOGIN' });
  const logout = () => {
    // setId(null);
    dispatch({ type: 'LOGOUT' })};
  

    //from QuizApp
    const [selectedAnswers, setSelectedAnswers] = useState<ICollation[]>([]);

  //the course type questions
  const [data, setData] = useState<IQuestion[]>([]);

  //
  const [object, setObject] = useState<IQuestion[]>([]);

  // timer state
  const [seconds, setSeconds] = useState<number>(60);
  const [QuestionsNum, setQuestionsNum] = useState<number>(10);

  const updateSelectedAnswers = (newState: ICollation[]) => {
    setSelectedAnswers(newState);
  };
  const updateSeconds = (newState: number) => {
    setSeconds(newState);
  };
  const updateData = (newState: IQuestion[]) => {
    setData(newState);
  };
  const updateObject = (newState: IQuestion[]) => {
    setObject(newState);
  };
  const updateQuestionsNum = (newState: number) => {
    setQuestionsNum(newState);
  }

  const contextValue: AuthContextType = {
    selectedAnswers,
    updateSelectedAnswers,
    data,
    updateData,
    seconds,
    updateSeconds,
    object,
    updateObject,
    QuestionsNum,
    updateQuestionsNum,
    authState, login, logout, setUser, user 
  };
    
// .................end ...............


  return (
    <AuthContext.Provider value={contextValue}>
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

