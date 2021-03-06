import React, { useEffect, useState } from "react";
//@materialui-core
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
//@styling
import { makeStyles } from "@material-ui/core/styles";

const axios = require('axios');

const useStyles = makeStyles({
  table: {
    maxWidth: "25em",
  },
  title: {
      margin: "1em",
      fontWeight: "bold"
  },
  head:{
    fontWeight: "bold"
  }
});

function createData(rank, name, increase) {
  return { rank, name, increase };
}

const defaultRows = [
  createData(1, "Bitcoinzzz", 6.0),
  createData(2, "Bitcoinzzz", 9.0),
  createData(3, "Bitcoinzzz", 16.0),
  createData(4, "Bitcoinzzz", 3.7),
  createData(5, "Bitcoinzzz", 16.0),
];

export default function SocialTable({url, title, header, metric}) {
  const [ rows, setRows ] = useState([]);

  useEffect(() => {
    getRows();
  },[]);

  const getRows = async () => {
    if(!url) {
      setRows(defaultRows);
      return;
    }
    try {
      axios({
        method: 'get',
        url: `http://localhost:8080/api/social-media-trends/${url}`
      }).then((response) => setRows(response.data.results));
    } catch (e) {
      console.error(e);
    }
  };
  
  const classes = useStyles();
  return (
    <TableContainer className={classes.table} component={Paper}>
      <p  className={classes.title}>{title}</p>
      <div style={{ overflow: 'auto', height: '20em' }}>
        <Table aria-label="simple table" style={{ tableLayout: 'fixed' }}>
          <TableHead >
            <TableRow >
              <TableCell className={classes.head}>#</TableCell>
              <TableCell className={classes.head} align="right">{header}</TableCell>
              <TableCell className={classes.head}  align="right">{metric}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.rank}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.increase}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
}
