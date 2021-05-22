import React from "react";
//@core-material-ui
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { lightGreen, darkGray, white } from "../../styles/colors";

const useStyles = makeStyles((_) => ({
  box: {
    color: white,
    backgroundColor: lightGreen,
    padding:"0 0.5em"
  },
  boxcontainer:{
    marginTop:"0.65em",
  },
  coin: {
    color: darkGray,
  },
  value: {
    margin: 0,
    marginRight:"1em"
  },
  growth: {
    color: lightGreen,
  },
  arrow: {
    paddingTop: "0.5em",
  },
}));

// this data will need to be fetched from an api
const coinData = {
  name: "Bitcoin",
  abreviation: "BTC",
  price: 53418.76,
  percentage: 2.9,
  up: true,
  eth: 32.53,
  ethPercentage: 2.9,
};

export default function CoinValue(props) {
  const { coin, value, growth, arrow, box, boxcontainer, valuecontainer } = useStyles();

  const data = props.data;

  if (data === null) {
    return <div>Loading...</div>
  }



  return (
    <Grid container justify="flex-end">
      <Grid container item justify="flex-end" xs={12} sm={12} md={12} lg={12}>
        <p className={coin}>
          {coinData.name} ({coinData.abreviation})
        </p>
      </Grid>
      <Grid container item justify="flex-end" xs={12} sm={12} md={12} lg={12}>
        <h1 className={value}>
          {data.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h1>
        <Card className={box}>
          <Grid container className={boxcontainer} >
            <ArrowDropUpIcon></ArrowDropUpIcon>
            <b>{coinData.ethPercentage} %</b>
          </Grid>
        </Card>
      </Grid>
      <Grid container item justify="flex-end" xs={6} sm={6} md={10} lg={10}>
        <p>{data.ethQuantity.toFixed(3)} ETH</p>
      </Grid>
      <Grid
        className={growth}
        container
        item
        justify="flex-end"
        xs={6}
        sm={6}
        md={2}
        lg={2}
      >
        <ArrowDropUpIcon className={arrow}></ArrowDropUpIcon>
        <p>{coinData.ethPercentage} %</p>
      </Grid>
    </Grid>
  );
}
