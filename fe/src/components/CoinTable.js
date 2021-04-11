import React from "react";

//@core-material-ui
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

//@components
import TinyChart from "./TinyChart";

//@stylying
import { lightGreen } from "../styles/colors";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(
  nb,
  coin,
  coinimage,
  price,
  twentyfour,
  seven,
  cap,
  volume,
  volatility,
  lastdays
) {
  return {
    nb,
    coin,
    coinimage,
    price,
    twentyfour,
    seven,
    cap,
    volume,
    volatility,
    lastdays,
  };
}

const imageCoin = (
  <img alt="Coin" width={"25px"} src={"./assets/bitcoin.png"} />
);

const rows = [
  createData(
    1,
    "Bitcoin",
    imageCoin,
    "$55.232.56",
    -0.24,
    -0.34,
    "$2.044.111.343",
    "$2.044.111.343",
    0.041,
    <TinyChart
      widthContainer={"50%"}
      heightContainer={60}
      strokeColor={lightGreen}
    ></TinyChart>
  ),
  createData(
    2,
    "Bitcoin",
    imageCoin,
    "$55.232.56",
    -0.24,
    -0.34,
    "$2.044.111.343",
    "$2.044.111.343",
    0.041,
    <TinyChart
      widthContainer={"50%"}
      heightContainer={60}
      strokeColor={lightGreen}
    ></TinyChart>
  ),
  createData(
    3,
    "Bitcoin",
    imageCoin,
    "$55.232.56",
    -0.24,
    -0.34,
    "$2.044.111.343",
    "$2.044.111.343",
    0.041,
    <TinyChart
      widthContainer={"50%"}
      heightContainer={60}
      strokeColor={lightGreen}
    ></TinyChart>
  ),
  createData(
    4,
    "Bitcoin",
    imageCoin,
    "$55.232.56",
    -0.24,
    -0.34,
    "$2.044.111.343",
    "$2.044.111.343",
    0.041,
    <TinyChart
      widthContainer={"50%"}
      heightContainer={60}
      strokeColor={lightGreen}
    ></TinyChart>
  ),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="left">Coin</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">24H %</TableCell>
            <TableCell align="left">7Ds %</TableCell>
            <TableCell align="left">Market Cap</TableCell>
            <TableCell align="left">Market Volume</TableCell>
            <TableCell align="left">Volatility</TableCell>
            <TableCell align="left">Last 7 Days</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.nb}>
              <TableCell component="th" scope="row">
                {row.nb}
              </TableCell>
              <TableCell align="left">
                <Grid container>
                  {row.coinimage}&nbsp;{row.coin}
                </Grid>
              </TableCell>
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="left">{row.twentyfour}</TableCell>
              <TableCell align="left">{row.seven}</TableCell>
              <TableCell align="left">{row.cap}</TableCell>
              <TableCell align="left">{row.volume}</TableCell>
              <TableCell align="left">{row.volatility}</TableCell>
              <TableCell align="left">{row.lastdays}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
