import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    maxWidth: "22em",
  },
  title: {
      margin: "1em",
      fontWeight: "bold"
  }
});

function createData(rank, name, increase) {
  return { rank, name, increase };
}

const rows = [
  createData(1, "Bitcoinzzz", 6.0),
  createData(2, "Bitcoinzzz", 9.0),
  createData(3, "Bitcoinzzz", 16.0),
  createData(4, "Bitcoinzzz", 3.7),
  createData(5, "Bitcoinzzz", 16.0),
];

export default function SocialTable() {
  const classes = useStyles();

  return (
    <TableContainer className={classes.table} component={Paper}>
      <p  className={classes.title}>SubReddits Weekly Growth</p>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">SubReddit</TableCell>
            <TableCell align="right">Increase %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.rank}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.increase}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
