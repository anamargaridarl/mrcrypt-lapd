import React from 'react';
//@core-material-ui
import {makeStyles, Box, Container } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import {gray} from  "../../styles/colors";


const useStyles = makeStyles((_) =>({
  bgGray: {
    backgroundColor: gray,
  }
}));

// this data will need to be fetched from an api
const rows = [
    {
        name: "Bitcoin price",
        price: 53242.45
    },
    {
        name: "Bitcoin price",
        price: 53242.45
    },
    {
        name: "Bitcoin price",
        price: 53242.45
    }
]

const coin = {
    name: "Bitcoin"
}


export default function CoinStats() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <Box className={classes.bgGray} m ={1} p ={2} >
        <TableContainer>
            <Table  size="small" aria-label="a dense table">
            <TableHead>
            <TableRow >
                <TableCell style={{borderColor:"#aaa"}}><Box mb={3} mt= {1} fontSize={18} fontWeight="fontWeightBold">{coin.name} price statistics</Box></TableCell>
                <TableCell style={{borderColor:"#aaa"}} align="right"></TableCell>
            </TableRow>
            </TableHead>
                <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                        <TableRow key={i}>
                            <TableCell style={{borderColor:"#aaa", }} component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell style={{borderColor:"#aaa"}}  align="right">
                                {row.price.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
                            </TableCell>
                        </TableRow>
                        ))}
                </TableBody>

            </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[1, 5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </Box>
  );
}