import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import HexagonButtonComponent from "../card/hexagon-button";

{
  /* <List>
<ListItem>
  <div>Point</div>
  <ListItemAvatar></ListItemAvatar>
  <ListItemText primary={"Profile"} />
  <ListItemSecondaryAction>Action</ListItemSecondaryAction>
</ListItem>
{Array.from(new Array(8)).map((v, i) => {
  const contestant = {
    avatar: "/contestant.png",
    name: "Warren Fornah",
    bio: "He is a very enegitic guy from the good land of jua, he is a child of God ",
    id: "00012",
    motivationSpeech:
      "I love God, He is the sorce of my strength, he will see through what he has started",
    status: "active",
    telephone: "+232778887",
    univercity: "Limkokwing",
    votes: [
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
    ],
  };

  return (
    
      </div>
      <ListItemAvatar>
        <Avatar
          src={contestant.avatar}
          alt={contestant.name[0].toLocaleUpperCase()}
        />
      </ListItemAvatar>
      <ListItemText
        primary={contestant.name}
        secondary={contestant.motivationSpeech}
      />
      <ListItemSecondaryAction>
       
      </ListItemSecondaryAction>{" "}
    </ListItem>
  );
})}
</List> */
}

const rows = [
  {
    avatar: "/contestant.png",
    name: "Warren Fornah",
    bio: "He is a very enegitic guy from the good land of jua, he is a child of God ",
    id: "00012",
    motivationSpeech:
      "I love God, He is the sorce of my strength, he will see through what he has started",
    status: "active",
    telephone: "+232778887",
    univercity: "Limkokwing",
    votes: [
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
    ],
  },
  {
    avatar: "/contestant.png",
    name: "Warren Fornah",
    bio: "He is a very enegitic guy from the good land of jua, he is a child of God ",
    id: "00012",
    motivationSpeech:
      "I love God, He is the sorce of my strength, he will see through what he has started",
    status: "active",
    telephone: "+232778887",
    univercity: "Limkokwing",
    votes: [
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
    ],
  },
  {
    avatar: "/contestant.png",
    name: "Warren Fornah",
    bio: "He is a very enegitic guy from the good land of jua, he is a child of God ",
    id: "00012",
    motivationSpeech:
      "I love God, He is the sorce of my strength, he will see through what he has started",
    status: "active",
    telephone: "+232778887",
    univercity: "Limkokwing",
    votes: [
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
    ],
  },
  {
    avatar: "/contestant.png",
    name: "Warren Fornah",
    bio: "He is a very enegitic guy from the good land of jua, he is a child of God ",
    id: "00012",
    motivationSpeech:
      "I love God, He is the sorce of my strength, he will see through what he has started",
    status: "active",
    telephone: "+232778887",
    univercity: "Limkokwing",
    votes: [
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
    ],
  },
  {
    avatar: "/contestant.png",
    name: "Warren Fornah",
    bio: "He is a very enegitic guy from the good land of jua, he is a child of God ",
    id: "00012",
    motivationSpeech:
      "I love God, He is the sorce of my strength, he will see through what he has started",
    status: "active",
    telephone: "+232778887",
    univercity: "Limkokwing",
    votes: [
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
    ],
  },
  {
    avatar: "/contestant.png",
    name: "Warren Fornah",
    bio: "He is a very enegitic guy from the good land of jua, he is a child of God ",
    id: "00012",
    motivationSpeech:
      "I love God, He is the sorce of my strength, he will see through what he has started",
    status: "active",
    telephone: "+232778887",
    univercity: "Limkokwing",
    votes: [
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
    ],
  },
  {
    avatar: "/contestant.png",
    name: "Warren Fornah",
    bio: "He is a very enegitic guy from the good land of jua, he is a child of God ",
    id: "00012",
    motivationSpeech:
      "I love God, He is the sorce of my strength, he will see through what he has started",
    status: "active",
    telephone: "+232778887",
    univercity: "Limkokwing",
    votes: [
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
    ],
  },
  {
    avatar: "/contestant.png",
    name: "Warren Fornah",
    bio: "He is a very enegitic guy from the good land of jua, he is a child of God ",
    id: "00012",
    motivationSpeech:
      "I love God, He is the sorce of my strength, he will see through what he has started",
    status: "active",
    telephone: "+232778887",
    univercity: "Limkokwing",
    votes: [
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
      {
        for: "00012",
        from: "00022",
        point: 1000,
        id: "87238",
      },
    ],
  },
];
// const data=rows.map((data)=>({}))

export default function LeaderBoardTable() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <TableContainer component={Paper}>
      <Table
        size={isSmallScreen ? "small" : "medium"}
        sx={{ minWidth: { md: 650 }, maxWidth: { sm: 250, md: "100%" } }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">Rank</TableCell>
            <TableCell align="center">Avatar</TableCell>
            <TableCell
              align="left"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              Info
            </TableCell>
            <TableCell
              align="left"
              sx={{ display: { xs: "block", md: "none" } }}
            >
              Name
            </TableCell>
            <TableCell align="center">Points</TableCell>
            <TableCell align="right">Vote</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              
              <TableCell align="left">{i + 1}</TableCell>
              <TableCell align="center">
                {
                  <Avatar
                    sx={{ width: { sm: "30", md: "70" } }}
                    src={row.avatar}
                    alt={row.name[0].toLocaleUpperCase()}
                  />
                }
              </TableCell>
              <TableCell
                align="left"
                sx={{ display: { xs: "none", md: "table-cell" } }}
              >
                <ListItemText
                  primary={row.name}
                  secondary={row.motivationSpeech}
                />
              </TableCell>
              <TableCell
                align="left"
                sx={{ display: { xs: "table-cell", md: "none" } }}
              >
                {row.name}
              </TableCell>
              <TableCell align="right">
                {row.votes.reduce((prev, cur) => prev + cur.point, 0)}
              </TableCell>
              <TableCell align="right">
                <HexagonButtonComponent />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
