"use client";

import React, { ReactElement, ReactNode, useContext, useMemo } from "react";
import { NavContext } from "./context";

export function NavContextProvider(props: { children: ReactNode }) {
  const initialState = {
    openItem: ["dashboard"],
    openComponent: "buttons",
    drawerOpen: false,
    componentDrawerOpen: true,
  };

  const [state, setState] = React.useState(initialState);

  function activeItem(openItem: string[]) {
    setState((prev) => ({ ...prev, openItem }));
  }
  function activeComponent(openComponent: string) {
    setState((prev) => ({ ...prev, openComponent }));
  }
  function openDrawer(drawerOpen: boolean) {
    setState((prev) => ({ ...prev, drawerOpen }));
  }
  function openComponentDrawer(componentDrawerOpen: boolean) {
    setState((prev) => ({ ...prev, componentDrawerOpen }));
  }
  return (
    <NavContext.Provider
      value={useMemo(
        () => ({
          ...state,
          activeComponent,
          activeItem,
          openDrawer,
          openComponentDrawer,
        }),
        [state]
      )}
    >
      {props.children}
    </NavContext.Provider>
  );
}

export const useNavContext = () => useContext(NavContext);
