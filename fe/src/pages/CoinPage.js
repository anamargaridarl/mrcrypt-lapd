import React from "react";
import { useParams } from "react-router";
import Grid from "@material-ui/core/Grid";

import PageHeader from "../components/PageHeader";
import TopBar from "../components/TopBar";
import CoinInfo from "../components/CoinInfo";
import CoinValue from "../components/CoinValue";
import CoinStats from "../components/CoinStats";
import CardCoinInfo from "../components/cardCoinInfo";
import CoinChart from "../components/coinChart";
//@core-material-ui
import { makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles({});

export default function CoinPage() {
  let { coinName } = useParams();
  const classes = useStyles();

  return (
    <div>
      <PageHeader name={`Coins/${coinName}`}></PageHeader>
      <Grid container>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <CoinInfo></CoinInfo>
          <Grid container>
            <CardCoinInfo></CardCoinInfo>
            <CardCoinInfo></CardCoinInfo>
            <CardCoinInfo></CardCoinInfo>
          </Grid>
          <CoinChart></CoinChart>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <CoinValue></CoinValue>
          <CoinStats></CoinStats>
        </Grid>
      </Grid>
    </div>
  );
}
