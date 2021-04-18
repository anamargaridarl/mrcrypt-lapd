import React from "react";
//@core-material-ui
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  coinTitle: {
    marginLeft: "2em",
  },
});

// this data will need to be fetched from an api
const coinData = {
  name: "Bitcoin",
  description:
    "Bitcoin is a digital currency that was created in January 2009. It follows the ideas set out in a whitepaper by the mysterious and pseudonymous Satoshi Nakamoto The identity of the person or persons who created the technology is still a mystery. Bitcoin offers the promise of lower transaction fees than traditional online payment mechanisms and, unlike government-issued currencies, it is operated by a decentralized authority.",
  imagePath: "/assets/bitcoin.png",
};

export default function CoinInfo() {
  const classes = useStyles();

  return (
    <Grid container>
      <img width={"60px"} alt={coinData.name} src={coinData.imagePath} />
      <h2 classeName={classes.coinTitle}>{coinData.name}</h2>
      {coinData.description}
    </Grid>
  );
}