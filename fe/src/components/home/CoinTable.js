import React, {useEffect, useState} from "react";
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
//@core-material-ui:icons
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
//@components
import TinyChart from "../TinyChart";
//@stylying
import { lightGreen, darkGray, red, green } from "../../styles/colors";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHead:{
    "& .MuiTableCell-head": {
    fontWeight: "bold",
    color: darkGray
    }
  }
});


//Example data TODO: fetch data from backend
const data = [
  {
    id: 1,
    coin: "Bitcoin",
    imageUrl: "./assets/bitcoin.png",
    price: "$55.232.56",
    twentyfour: -0.24,
    seven: -0.34,
    cap: "$2.044.111.343",
    volume: "$2.044.111.343",
    volatility: 0.041,
    data: [
      {
        name: "Page A",
        pv: 2400,
      },
      {
        name: "Page B",
        pv: 1398,
      },
      {
        name: "Page C",
        pv: 9800,
      },
      {
        name: "Page D",
        pv: 3908,
      },
      {
        name: "Page E",
        pv: 4800,
      },
      {
        name: "Page F",
        pv: 3800,
      },
      {
        name: "Page G",
        pv: 4300,
      },
    ]
  },
  {
    id: 2,
    coin: "Bitcoin",
    imageUrl: "./assets/bitcoin.png",
    price: "$55.232.56",
    twentyfour: -0.24,
    seven: 0.34,
    cap: "$2.044.111.343",
    volume: "$2.044.111.343",
    volatility: 0.041,
    data: [
      {
        name: "Page A",
        pv: 2400,
      },
      {
        name: "Page B",
        pv: 1398,
      },
      {
        name: "Page C",
        pv: 9800,
      },
      {
        name: "Page D",
        pv: 3908,
      },
      {
        name: "Page E",
        pv: 4800,
      },
      {
        name: "Page F",
        pv: 3800,
      },
      {
        name: "Page G",
        pv: 4300,
      },
    ]
  },
  {
    id: 3,
    coin: "Bitcoin",
    imageUrl: "./assets/bitcoin.png",
    price: "$55.232.56",
    twentyfour: -0.54,
    seven: 0.34,
    cap: "$2.044.111.343",
    volume: "$2.044.111.343",
    volatility: 0.041,
    data: [
      {
        name: "Page A",
        pv: 2400,
      },
      {
        name: "Page B",
        pv: 1398,
      },
      {
        name: "Page C",
        pv: 9800,
      },
      {
        name: "Page D",
        pv: 3908,
      },
      {
        name: "Page E",
        pv: 4800,
      },
      {
        name: "Page F",
        pv: 3800,
      },
      {
        name: "Page G",
        pv: 4300,
      },
    ]
},
  {
    id: 4,
    coin: "Bitcoin",
    imageUrl: "./assets/bitcoin.png",
    price: "$55.232.56",
    twentyfour: -0.24,
    seven: 0.34,
    cap: "$2.044.111.343",
    volume: "$2.044.111.343",
    volatility: 0.041,
    data: [
      {
        name: "Page A",
        pv: 2400,
      },
      {
        name: "Page B",
        pv: 1398,
      },
      {
        name: "Page C",
        pv: 9800,
      },
      {
        name: "Page D",
        pv: 3908,
      },
      {
        name: "Page E",
        pv: 4800,
      },
      {
        name: "Page F",
        pv: 3800,
      },
      {
        name: "Page G",
        pv: 4300,
      },
    ]
  },
]

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

const imageCoin = (url) => {
  return (<img alt="Coin" width={"25px"} src={url} />)
}

export default function BasicTable() {

  const [rows, setRows] = useState([])

  const createRows = () => {

    const rows = data.map((element) => {
      return createData(
        element.id,
        element.coin,
        imageCoin(element.imageUrl),
        element.price,
        element.twentyfour,
        element.seven,
        element.cap,
        element.volume,
        element.volatility,
        <TinyChart
          widthContainer={"50%"}
          heightContainer={60}
          strokeColor={lightGreen}
          dataAux= {element.data}
        ></TinyChart>
      )
    })
    setRows(rows)
  };

  useEffect(() => {
    createRows();
  }, [])
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead  >
          <TableRow className={classes.tableHead}>
            <TableCell align="left" >#</TableCell>
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
              <TableCell style= {{color:row.twentyfour < 0? red : green }} align="left">{row.twentyfour < 0 ? <Grid container><ArrowDropDownIcon/> {Math.abs(row.twentyfour)} </Grid>: <Grid container><ArrowDropUpIcon/> {Math.abs(row.twentyfour)} </Grid> }</TableCell>
              <TableCell style= {{color:row.seven < 0? red : green }} align="left">{row.seven < 0 ? <Grid container><ArrowDropDownIcon/> {Math.abs(row.seven)} </Grid>: <Grid container><ArrowDropUpIcon/> {Math.abs(row.seven)} </Grid>}</TableCell>
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
