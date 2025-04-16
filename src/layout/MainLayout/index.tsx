"use client";
import { ReactNode, useEffect, useState } from "react";

// material-ui
import { Box, Toolbar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project import
import { useNavContext } from "@/context/nav-context";
import Breadcrumbs from "../../components/@extended/Breadcrumbs";
import Header from "../../components/Header";
import navigation from "@/util/menu-items";
import Drawer from "./Drawer";
import { useAuthContext } from "@/context/auth";

// types

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down("xl"));
  const { drawerOpen, openDrawer } = useNavContext();
  const { user, isAuthenticated } = useAuthContext();

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    openDrawer(!open);
  };

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    openDrawer(!matchDownLG);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      {/* {isAuthenticated && user?.role === "admin" && (
        <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      )} */}
      <Box
        component="main"
        sx={{ width: "100%", flexGrow: 1, p: { xs: 2, sm: 3 } }}
      >
        <Toolbar />
        <Breadcrumbs navigation={navigation} title />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
