import React from "react";
//@core-material-ui
import { makeStyles, Box } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import { gray } from "../../styles/colors";

const useStyles = makeStyles((_) => ({
  bgGray: {
    backgroundColor: gray,
  },
}));


export default function CoinStats(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const data = props.data;


  if (data === null) {
    return <div>Loading coin statistics...</div>
  }

  const rows = [];

  for(const key in data) {
    rows.push({name: key, value: data[key]})
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box className={classes.bgGray} m={1} p={2}>
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell style={{ borderColor: "#aaa" }}>
                <Box mb={3} mt={1} fontSize={18} fontWeight="fontWeightBold">
                  Statistics
                </Box>
              </TableCell>
              <TableCell
                style={{ borderColor: "#aaa" }}
                align="right"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => (
                <TableRow key={i}>
                  <TableCell
                    style={{ borderColor: "#aaa" }}
                    component="th"
                    scope="row"
                  >
                    {row.name.replace(/_/g," ")}
                  </TableCell>
                  <TableCell style={{ borderColor: "#aaa" }} align="right">
                    {row.value.toFixed(3)}
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
