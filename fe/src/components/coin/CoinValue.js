import React from "react";
//@core-material-ui
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { lightGreen, darkGray, white, red } from "../../styles/colors";

const useStyles = makeStyles((_) => ({

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
  marginCoin : {
    margin: "0.5rem 0rem",
    color: "#aaa"
  },
  marginBottom: {
    margin: "0 0 2rem 0rem"
  },
  colorGreen: {
    color: white,
    backgroundColor: lightGreen,
    padding:"0 0.5em"

  },
  colorRed: {
    color: white,
    backgroundColor: red,
    padding:"0 0.5em"
  },
  textAlignRight: {
    textAlign: 'right',
    width: "100%"
  }
}));


export default function CoinValue(props) {
  const { coin, value, boxcontainer,colorGreen, colorRed, marginCoin, marginBottom, textAlignRight } = useStyles();

  const data = props.data;


  if (data === null || props.symbol === null || !props.percentage) {
    return <div>Loading...</div>
  }
  const percentage = props.percentage;


  return (
    <Grid container justify="flex-end" className={marginBottom}>
      <Grid container item justify="flex-end" xs={12} sm={12} md={12} lg={12}>
        <p  className={coin}>
          {props.coinName} ({props.symbol})
        </p>
      </Grid>
      <Grid container item justify="flex-end" xs={12} sm={12} md={12} lg={12}>
        <h1 className={value}>
          {data.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h1>
        <Card  className={ percentage >=0 ? colorGreen : colorRed}>
          <Grid container className={boxcontainer} >
            {percentage >= 0 ? (<ArrowDropUpIcon></ArrowDropUpIcon>) : (<ArrowDropDownIcon></ArrowDropDownIcon>)}
            <span>{Math.abs(percentage.toFixed(3))} %</span>
          </Grid>
        </Card>
      </Grid>
      <Grid container item justify="flex-start" xs={8} sm={8} md={8} lg={8}>
        <p className={marginCoin}>{data.bitcoinQuantity.toFixed(3)} BTC</p>
      </Grid>
      <Grid container item justify="flex-start" xs={8} sm={8} md={8} lg={8}>
        <p className={marginCoin}>{data.ethQuantity.toFixed(3)} ETH</p>
      </Grid>
    </Grid>
  );
}
