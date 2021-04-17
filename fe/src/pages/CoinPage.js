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
import { makeStyles, Container, Box } from "@material-ui/core";

const useStyles = makeStyles({});

export default function CoinPage() {
  let { coinName } = useParams();
  const classes = useStyles();

  return (
    <Container>
      <PageHeader name={`Coins/${coinName}`}></PageHeader>
      <Grid container spacing={1}>
        <Grid
          container
          alignItems="center"
          item
          xs={12}
          sm={12}
          md={8}
          lg={8}
          style={{ gap: 15 }}
        >
          <CoinInfo></CoinInfo>
          <Grid container justify="space-evenly">
            <CardCoinInfo></CardCoinInfo>
            <CardCoinInfo></CardCoinInfo>
            <CardCoinInfo></CardCoinInfo>
          </Grid>
          <Box mt={4} width="90%" height="auto">
            <CoinChart></CoinChart>
          </Box>
        </Grid>
        <Grid container item xs={12} sm={12} md={4} lg={4} direction="column">
          <CoinValue></CoinValue>
          <CoinStats></CoinStats>
        </Grid>
      </Grid>
    </Container>
  );
}
