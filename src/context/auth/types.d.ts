import { UserType } from "@/types";

type AuthStateType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: UserType;
};
type AuthReducerType = {
  payload?: any;
  type?: string;
};

type AuthContextType = {
  skip: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, name: string, password: string) => Promise<void>;
  signOut: () => void;
} & AuthStateType;
