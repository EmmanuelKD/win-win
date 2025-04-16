"use client";
import { ReactNode, useContext, useEffect, useReducer, useRef } from "react";
import { AuthClass } from "@/firebase/auth";
import { AuthContext } from "./context";
import { Toaster } from "react-hot-toast";
import { AuthReducerType, AuthStateType } from "./types";

const HANDLERS = {
    INITIALIZE: "INITIALIZE",
    SIGN_IN: "SIGN_IN",
    SIGN_OUT: "SIGN_OUT",
  };
  
  const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
  };
  
  
  
  const handlers = {
    [HANDLERS.INITIALIZE]: (state: AuthStateType, action: AuthReducerType) => {
      const user = action.payload;
  
      return {
        ...state,
        ...// if payload (user) is provided, then is authenticated
        (user
          ? {
              isAuthenticated: true,
              isLoading: false,
              user,
            }
          : {
              isLoading: false,
            }),
      };
    },
    [HANDLERS.SIGN_IN]: (state: AuthStateType, action: AuthReducerType) => {
      const user = action.payload;
  
      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    },
    [HANDLERS.SIGN_OUT]: (state: AuthStateType) => {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    },
  };
  
  const reducer = (state: AuthStateType, action: AuthReducerType) =>
    // @ts-ignore
    handlers[action.type] ? handlers[action.type](state, action) : state;
  
  
  export const AuthContextProvider = (props: { children: ReactNode }) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const initialized = useRef(false);
  
    const initialize = async () => {
      // Prevent from calling twice in development mode with React.StrictMode enabled
      if (initialized.current) {
        return;
      }
  
      initialized.current = true;
  
      let isAuthenticated = false;
  
      try {
        isAuthenticated = window.sessionStorage.getItem("authenticated") === "true";
      } catch (err) {
        console.error(err);
      }
  
      if (isAuthenticated) {
        let auth = new AuthClass();
        let user = auth.getUserFromLocalStorage();
  
        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: user,
        });
      } else {
        dispatch({
          type: HANDLERS.INITIALIZE,
        });
      }
    };
  
    useEffect(
      () => {
        initialize();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );
  
    const skip = () => {
      try {
        window.sessionStorage.setItem("authenticated", "true");
      } catch (err) {
        console.error(err);
      }
  
      const user = {
        id: "5e86809283e28b96d2d38537",
        avatar: "/assets/avatars/avatar-anika-visser.png",
        name: "Anika Visser",
        email: "anika.visser@devias.io",
      };
  
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user,
      });
    };
  
    const signIn = async (email: string, password: string) => {
      let auth = new AuthClass();
      let user = await auth.loginWithEmailAndPassword({ email, password });
  
      if (!user) {
        throw new Error("Invalid user please contact admin");
      }
  
      try {
        window.sessionStorage.setItem("authenticated", "true");
      } catch (err) {
        console.error(err);
      }
  
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user,
      });
    };
  
    const signUp = async (email: string, name: string, password: string) => {
      throw new Error("Sign up is not implemented");
    };
  
    const signOut = () => {
      let auth = new AuthClass();
      auth.signOutCurrentUser();
  
      dispatch({
        type: HANDLERS.SIGN_OUT,
      });
    };
  
    return (
      <AuthContext.Provider
        value={{
          ...state,
          skip,
          signIn,
          signUp,
          signOut,
        }}
      >
        {children}
        <Toaster />
      </AuthContext.Provider>
    );
  };
  
 
  
  export const AuthConsumer = AuthContext.Consumer;
  
  export const useAuthContext = () => useContext(AuthContext);
  