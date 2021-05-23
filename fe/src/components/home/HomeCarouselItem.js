import React, { useEffect, useState } from 'react'
//@core-material-ui
import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
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

export default function CarouselItem({ name, parameter, parameterTime, value }) {

  const { paper, innerElement, growthElement, body } = useStyles();
  const [data, setData] = useState([])


  const getData = () => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/homepage/global/` + parameter + "/" + parameterTime
    }).then(response => {
      setData(response.data)
    }).catch((err) => console.log(err))
  }


  useEffect(() => {
    getData()
  }, [])

  return (
    <Paper className={paper}>
      <Grid
        className={body}
        container
        justify="flex-start"
        alignItems="flex-start"
      >
        <p>{name.toUpperCase()}</p>
        <Grid container className={innerElement} justify="center">
          <b>{Math.round(data.value)} {value} </b>
          {/* <Grid item className={growthElement} style={{ color: growth < 0 ? red : green }}>
            {growth + "%"}
          </Grid> */}
        </Grid>
        <TinyChart widthContainer={"80%"} heightContainer={70} strokeColor={purple} dataAux={data.timestamp}></TinyChart>
      </Grid>
    </Paper>
  )
}
