import React, { useEffect, useState } from "react";
//@core-material-ui
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
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
  symbol,
  coin,
  slug,
  price,
  twentyfour,
  seven,
  cap,
  volume,
  lastdays
) {
  return {
    nb,
    symbol,
    coin,
    slug,
    price,
    twentyfour,
    seven,
    cap,
    volume,
    lastdays
  };
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const imageCoin = (url) => {
  return <img alt="Coin" width={"25px"} src={url} />
}

export default function BasicTable() {

  const classes = useStyles();
  const [rows, setRows] = useState([])
  const [graphs, setGraphs] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const history = useHistory();


  const createRows = () => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/homepage/coinRanking`
    }).then(response => {
      let i = 1;
      const rows = response.data.map((element) => {
        if (element === null)
          return null
        return createData(
          i++,
          element.symbol,
          element.coin,
          element.slug,
          element.price,
          element.twentyfour,
          element.seven,
          element.cap,
          element.volume
        )
      })
      setRows(rows)
    });
  };

  console.log(rows)

  const getGraphs = () => {

    let i = 0;
    for (i = 0; i < rows.length; i++) {
      sleep(1000)
      axios({
        method: 'get',
        url: `http://localhost:8080/api/homepage/coinChart/` + rows[i].symbol + "/" + rows[i].slug
      }).then(response => {
        setGraphs(oldArray => [...oldArray, response.data !== undefined ? response.data : { data: null, imageUrl: null }])
      })
      .catch((err) => setGraphs(oldArray => [...oldArray, { data: null, imageUrl: null }]))
    }

  }


  useEffect(() => {
    getGraphs();
  }, [rows])

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
                  <TableCell style={{ paddingLeft: "1em" }} component="th" scope="row">
                    {row.nb}
                  </TableCell>
                  <TableCell style={{ padding: "0" }} align="left">
                    <Grid container onClick={() => { history.push("/coinpage/" + row.slug) }}>
                      {graphs.length === rows.length ? (<img alt="Coin" width={"25px"} src={graphs[row.nb - 1].imageUrl !== undefined ? graphs[row.nb - 1].imageUrl : ""} />) : ""}
                  &nbsp;{row.coin}
                    </Grid>
                  </TableCell >
                  <TableCell style={{ padding: "0" }} align="left">{Math.round(row.price * 1000) / 1000}</TableCell>
                  <TableCell style={{ color: row.twentyfour < 0 ? red : green, padding: "0" }} align="left">{Math.round(row.twentyfour * 1000) / 1000 < 0 ? <Grid container><ArrowDropDownIcon /> {Math.round(Math.abs(row.twentyfour) * 1000) / 1000} </Grid> : <Grid container><ArrowDropUpIcon /> {Math.round(Math.abs(row.twentyfour) * 1000) / 1000} </Grid>}</TableCell>
                  <TableCell style={{ color: row.seven < 0 ? red : green, padding: "0" }} align="left">{Math.round(row.seven * 1000) / 1000 < 0 ? <Grid container><ArrowDropDownIcon /> {Math.round(Math.abs(row.seven) * 1000) / 1000} </Grid> : <Grid container><ArrowDropUpIcon /> {Math.round(Math.abs(row.seven) * 1000) / 1000} </Grid>}</TableCell>
                  <TableCell style={{ padding: "0" }} align="left"> $ {Math.round(row.cap * 1000) / 1000 }</TableCell>
                  <TableCell style={{ padding: "0" }} align="left">$ {Math.round(row.volume * 1000) / 1000}</TableCell>
                  <TableCell style={{ padding: "0" }} align="left">{graphs.length === rows.length ? <TinyChart
                    widthContainer={"50%"}
                    heightContainer={60}
                    strokeColor={lightGreen}
                    dataAux={graphs[row.nb - 1].data}
                  ></TinyChart> : ""}</TableCell>
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
