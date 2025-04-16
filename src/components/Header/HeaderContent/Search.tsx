// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from "@mui/material";

// assets
import { SearchOutlined } from "@ant-design/icons";
import { useAuthContext } from "@/context/auth";
import { AuthContextType } from "@/context/auth/types";

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = ({ autContext }: { autContext: AuthContextType }) => {
  const { user, isAuthenticated } = autContext;

  return (
    <Box sx={{ width: "100%", ml: { xs: 0, md: 1 } }}>
      {(isAuthenticated || user?.role === "admin") && (
        <FormControl sx={{ width: { xs: "100%", md: 224 } }}>
          <OutlinedInput
            size="small"
            id="header-search"
            startAdornment={
              <InputAdornment position="start" sx={{ mr: -0.5 }}>
                <SearchOutlined />
              </InputAdornment>
            }
            aria-describedby="header-search-text"
            inputProps={{
              "aria-label": "weight",
            }}
            placeholder="Ctrl + K"
          />
        </FormControl>
      )}
    </Box>
  );
};

export default Search;
