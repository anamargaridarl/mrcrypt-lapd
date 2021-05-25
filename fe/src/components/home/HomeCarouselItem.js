import React, { useEffect, useState } from 'react'
//@core-material-ui
import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Tooltip from '@material-ui/core/Tooltip';
//@components
import TinyChart from "../TinyChart";
//@core-material-ui
import { makeStyles } from "@material-ui/core/styles";
//@styling
import "react-multi-carousel/lib/styles.css";
import { green, purple, red } from "../../styles/colors";
const axios = require('axios');

const useStyles = makeStyles({
  paper: {
    width: "13em",
    margin: "1em 1em",
    padding: "0.5em",
    justifyContent: "center",
  },
  body: {
    margin: "0 1em",
  },
  innerElement: {
    width: "80%",
  },
  growthElement: {
    color: green,
  },
});

export default function CarouselItem({ tootltip, name, type, value, dataTime }) {

  const { paper, innerElement, body } = useStyles();

  return (
    <Paper className={paper}>
      <Tooltip title={tootltip}>
        <Grid
          className={body}
          container
          justify="flex-start"
          alignItems="flex-start"
        >
          <p>{name.toUpperCase()}</p>
          <Grid container className={innerElement} justify="center">
            <b>{Math.round(value * 100) / 100} {type} </b>
          </Grid>
          <TinyChart widthContainer={"80%"} heightContainer={70} strokeColor={purple} dataAux={dataTime}></TinyChart>
        </Grid>
      </Tooltip>
    </Paper>
  )
}
