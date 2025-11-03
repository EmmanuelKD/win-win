import { Contestant } from "@/types";
import {
  Box,
  Card,
  CardMedia,
  Stack,
  Typography,
  CardContent,
  Button,
  Container,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import HexagonButtonComponent from "./hexagon-button";
import { InfoCircleFilled } from "@ant-design/icons";

export default function ContestantCard({
  contestant,
}: {
  contestant: Contestant;
}) {
  return (
    <Card>
      <CardMedia>
        <Box sx={{ position: "relative" }}>
          <Image
            src={contestant.avatar}
            alt={contestant.name}
            width={310}
            height={366}
            objectFit="cover"
          />
          <IconButton
            sx={{
              top: 10,
              right: 10, 
              position: "absolute",
              backgroundColor: "black",
              color: (th) => th.palette.primary.main,
              borderRadius: "50px",

              //   width: "300px", // Set a fixed width
              //   // or use maxWidth to prevent it from growing
              //   maxWidth: "400px",
            }}
          >
            <InfoCircleFilled  />
          </IconButton>
          <Container
            maxWidth="sm"
            sx={{
              bottom: 15,
              left: 10,
              py: (th) => th.spacing(1),
              color: "black",
              position: "absolute",
              borderRadius: "50px",
              backgroundColor: (th) => th.palette.primary.main,
                width: "150px", // Set a fixed width
              //   // or use maxWidth to prevent it from growing
                maxWidth: "300px",
            }}
          >
            <Typography variant="h5" textAlign={"center"}>
              {" "}
              {contestant.university}
            </Typography>
          </Container>
        </Box>
      </CardMedia>
      <CardContent sx={{py:0}}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5">{contestant.name}</Typography>
          <HexagonButtonComponent />
        </Stack>
      </CardContent>
    </Card>
  );
}
