"use client"

import { createContext } from "react";
import { AppContextType } from "./types";

export const AppContext = createContext<AppContextType>({
  contestantIsLoading: false,
  allContestants: [],
});
