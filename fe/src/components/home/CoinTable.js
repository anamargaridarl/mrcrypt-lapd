import React, { useEffect, useState } from "react";
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
import TablePagination from '@material-ui/core/TablePagination';
//@core-material-ui:icons
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
//@components
import TinyChart from "../TinyChart";
//@styling
import { lightGreen, darkGray, red, green } from "../../styles/colors";
const axios = require('axios');

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHead: {
    padding: 0,
    "& .MuiTableCell-head": {
      fontWeight: "bold",
      color: darkGray
    }
  }
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
    lastdays
  };
}


const imageCoin = (url) => {
  return <img alt="Coin" width={"25px"} src={"./assets/bitcoin.png"} />
}

export default function BasicTable() {

  const classes = useStyles();
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const createRows = () => {

    axios({
      method: 'get',
      url: `http://localhost:8080/api/homepage/coinRanking`
    }).then(response => {
      let i = 0;
      const rows = response.data.map((element) => {
        return createData(
          i++,
          element.coin,
          imageCoin(element.imageUrl),
          element.price,
          element.twentyfour,
          element.seven,
          element.cap,
          element.volume,
          <TinyChart
            widthContainer={"50%"}
            heightContainer={60}
            strokeColor={lightGreen}
            dataAux={element.data}
          ></TinyChart>
        )
      })
      setRows(rows)
    });
  };

  useEffect(() => {
    createRows();
  }, [])

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
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
              {/* <TableCell align="left">Volatility</TableCell> */}
              <TableCell align="left">Last 7 Days</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((row) => (
                < TableRow key={row.nb} >
                  <TableCell style={{ padding: "0", paddingLeft: "1em" }} component="th" scope="row">
                    {row.nb}
                  </TableCell>
                  <TableCell style={{ padding: "0" }} align="left">
                    <Grid container>
                      {/* {row.coinimage !== undefined ? row.coinimage : ""} */}
                  &nbsp;{row.coin}
                    </Grid>
                  </TableCell >
                  <TableCell style={{ padding: "0" }} align="left">{row.price}</TableCell>
                  <TableCell style={{ color: row.twentyfour < 0 ? red : green, padding: "0" }} align="left">{row.twentyfour < 0 ? <Grid container><ArrowDropDownIcon /> {Math.abs(row.twentyfour)} </Grid> : <Grid container><ArrowDropUpIcon /> {Math.abs(row.twentyfour)} </Grid>}</TableCell>
                  <TableCell style={{ color: row.seven < 0 ? red : green, padding: "0" }} align="left">{row.seven < 0 ? <Grid container><ArrowDropDownIcon /> {Math.abs(row.seven)} </Grid> : <Grid container><ArrowDropUpIcon /> {Math.abs(row.seven)} </Grid>}</TableCell>
                  <TableCell style={{ padding: "0" }} align="left"> $ {row.cap}</TableCell>
                  <TableCell style={{ padding: "0" }} align="left">$ {row.volume}</TableCell>
                  <TableCell style={{ padding: "0" }} align="left">{row.lastdays}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer >
      <TablePagination
        rowsPerPageOptions={[6]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
