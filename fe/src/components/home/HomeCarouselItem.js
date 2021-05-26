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


let SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

function abbreviateNumber(number) {

  // what tier? (determines SI symbol)
  var tier = Math.log10(Math.abs(number)) / 3 | 0;

  // if zero, we don't need a suffix
  if (tier === 0) return number;

  // get suffix and determine scale
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);

  // scale the number
  var scaled = number / scale;

  // format number and add suffix
  return scaled.toFixed(1) + suffix;
}

export default function CarouselItem({ tootltip, name, type, value, dataTime }) {

  const { paper, innerElement, body } = useStyles();
  const growth = (dataTime[22].pv - dataTime[0].pv) / (dataTime[0].pv)
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
          <Grid container className={innerElement} justify="space-between">
            <Grid item>
              {" "}
              <b>{abbreviateNumber(Math.round(value * 1000) / 1000)}{type} </b>
            </Grid>
            <Grid item style={{ color: growth < 0 ? red : green }}>
              {Math.round(growth * 1000) / 1000 + "%"}
            </Grid>
          </Grid>
          <TinyChart widthContainer={"80%"} heightContainer={70} strokeColor={purple} dataAux={dataTime}></TinyChart>
        </Grid>
      </Tooltip>
    </Paper>
  )
}
