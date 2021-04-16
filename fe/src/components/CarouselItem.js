import React from 'react'
//@core-material-ui
import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

//@components
import TinyChart from "./TinyChart";

//@core-material-ui
import { makeStyles } from "@material-ui/core/styles";

//@stylying
import "react-multi-carousel/lib/styles.css";
import {  green, purple, red } from "../styles/colors";

const useStyles = makeStyles({
    paper: {
      width: "13em",
      margin: "2em 1em",
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

//Example data TODO: fetch data from backend
const data = [
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
  ];
  
export default function CarouselItem({name, value, growth}) {

    const { paper, innerElement, growthElement, body } = useStyles();
    return (
      <Paper className={paper}>
      <Grid
        className={body}
        container
        justify="flex-start"
        alignItems="flex-start"
      >
        <p>{name}</p>
        <Grid container className={innerElement} justify="space-between">
          <Grid item>
            {" "}
            <b>{value} </b>
          </Grid>
          <Grid item className={growthElement} style= {{color:growth < 0? red : green }}>
            {growth + "%"}
          </Grid>
        </Grid>
        <TinyChart widthContainer={"80%"} heightContainer={70} strokeColor={purple} dataAux={data}></TinyChart>
      </Grid>
    </Paper>
    )
}
