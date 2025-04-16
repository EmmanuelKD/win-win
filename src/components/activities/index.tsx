import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import HexagonButtonComponent from "../contestants/card/hexagon-button";
import { Timestamp } from "firebase/firestore";
import moment from "moment";

const rows = [
  {
    action: "Someone voted for Warren Fornah",
    createdAt: Timestamp.fromDate(new Date()),
    id: "8",
  },
  {
    action: "Someone voted for Warren Fornah",
    createdAt: Timestamp.fromDate(new Date()),
    id: "7",
  },
  {
    action: "Someone voted for Warren Fornah",
    createdAt: Timestamp.fromDate(new Date()),
    id: "6",
  },
  {
    action: "Someone voted for Warren Fornah",
    createdAt: Timestamp.fromDate(new Date()),
    id: "5",
  },
  {
    action: "Someone voted for Warren Fornah",
    createdAt: Timestamp.fromDate(new Date()),
    id: "4",
  },
  {
    action: "Someone voted for Warren Fornah",
    createdAt: Timestamp.fromDate(new Date()),
    id: "3",
  },
  {
    action: "Someone voted for Warren Fornah",
    createdAt: Timestamp.fromDate(new Date()),
    id: "2",
  },
  {
    action: "Someone voted for Warren Fornah",
    createdAt: Timestamp.fromDate(new Date()),
    id: "1",
  },
  {
    action: "Someone voted for Warren Fornah",
    createdAt: Timestamp.fromDate(new Date()),
    id: "0",
  },
];

export default function ActivitiesStreamBoardTable() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  // const now = moment();
  // alert(moment(rows[0].createdAt.toDate()).fromNow());
  return (
    <TableContainer component={Paper}>
      <Table
        size={isSmallScreen ? "small" : "medium"}
        sx={{ minWidth: { md: 650 }, maxWidth: { sm: 250, md: "100%" } }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">Recent Activity</TableCell>
            <TableCell
              align="right"
              // sx={{ display: { xs: "none", md: "block" } }}
            >
              
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.action}</TableCell>

              <TableCell
                align="right"
                // sx={{ display: { xs: "table-cell", md: "none" } }}
              >
                {moment(row.createdAt.toDate()).fromNow().toString()}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
