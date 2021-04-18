import React from "react";
import { useParams } from "react-router";
import Grid from "@material-ui/core/Grid";

import PageHeader from "../components/PageHeader";
import TopBar from "../components/TopBar";
import CoinInfo from "../components/coin/CoinInfo";
import CoinValue from "../components/coin/CoinValue";
import CoinStats from "../components/coin/CoinStats";
import CardCoinInfo from "../components/coin/cardCoinInfo";
import CoinChart from "../components/coin/coinChart";
//@core-material-ui
import { makeStyles, Container } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    padding: "0.5em 3.5em",
  },
  intro: {
    marginTop: "2em",
  },
  container: {
    paddingRight:"5em"
  }
});

export default function CoinPage() {
  let { coinName } = useParams();
  const {container, table, intro } = useStyles();

  return (
    <>
      <TopBar></TopBar>
      <PageHeader name={`Coins/${coinName}`}></PageHeader>
      <Container className={table} maxWidth={false}>
        <Grid container spacing={1} >
          <Grid className={container} item xs={12} sm={12} md={8} lg={8}>
            <CoinInfo></CoinInfo>
            <Grid container className={intro} justify="space-between">
              <CardCoinInfo></CardCoinInfo>
              <CardCoinInfo></CardCoinInfo>
              <CardCoinInfo></CardCoinInfo>
            </Grid>
            <CoinChart name={coinName}></CoinChart>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} direction="column">
            <CoinValue></CoinValue>
            <CoinStats></CoinStats>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
