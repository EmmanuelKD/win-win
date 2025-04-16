"use client"
import React from "react";
import { ContextType } from "./types";

export const NavContext = React.createContext<ContextType>({
    openItem: ['dashboard'],
    openComponent: 'buttons',
    drawerOpen: false,
    componentDrawerOpen: true,
    activeComponent: (_) => {},
    activeItem: (_) => {},
    openDrawer: (_) => {},
    openComponentDrawer: (_) => {},
})