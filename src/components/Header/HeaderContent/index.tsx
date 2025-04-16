// material-ui
"use client";
import { Box, useMediaQuery, useTheme } from "@mui/material";

// project import
import MobileSection from "./MobileSection";
import Notification from "./Notification";
import Profile from "./Profile";
import Search from "./Search";
import { useAuthContext } from "@/context/auth";
import { AuthContextType } from "@/context/auth/types";

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = ({ autContext }: { autContext: AuthContextType }) => {
  const theme = useTheme();

  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));
  const { user, isAuthenticated } = autContext;

  return (
    <>
      {!matchesXs && <Search autContext={autContext} />}
      {matchesXs && <Box sx={{ width: "100%", ml: 1 }} />}
      {(isAuthenticated || user?.role === "admin") && <Notification />}
      {!matchesXs && <Profile autContext={autContext} />}
      {matchesXs && <MobileSection autContext={autContext} />}
    </>
  );
};

export default HeaderContent;
