import { ButtonBase, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";

const HexagonButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  width: "40.28px",
  height: "40.28px",
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  textTransform: "none",
  border: "none",
  fontSize: "16px",
  fontWeight: "bold",
  clipPath:
    "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
  borderRadius: "8px", // Adjust border radius as needed
  overflow: "hidden",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: theme.palette.primary.main,
    zIndex: -1,
    clipPath:
      "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
    borderRadius: "8px", // Adjust border radius as needed
  },
  "&:hover": {
    background: theme.palette.primary.dark,
  },
  "&:active": {
    background: theme.palette.primary.darker,
  },
  [theme.breakpoints.up("md")]:{
    width: "50.28px",
    height: "50.28px",
  }
}));

const HexagonButtonComponent = () => {

  return (
    <Tooltip title="Vote">
      <HexagonButton>
        <Image
          src="/vote.png"
          alt=""
          width={25}
          height={25}
          objectFit="cover" // Options: 'contain', 'cover', 'fill', 'none', 'scale-down'
        />
      </HexagonButton>
    </Tooltip>
  );
};

export default HexagonButtonComponent;
