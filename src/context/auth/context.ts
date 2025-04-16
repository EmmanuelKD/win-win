// The role of this context is to propagate authentication state through the App tree.
"use client"

import { createContext } from "react";
import { AuthContextType } from "./types";
 
export const AuthContext = createContext<AuthContextType>({
    skip: () => {},
    signIn: async (email: string, password: string) => {},
    signUp: async (email: string, name: string, password: string) => {},
    signOut: () => {},
    isAuthenticated: false,
    isLoading: false,
  });
  