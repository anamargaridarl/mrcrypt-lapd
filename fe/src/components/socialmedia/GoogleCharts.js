import React, { useState } from "react";
//@components
import Select from "../Select";
import LineCharts from "../LineCharts";
//@materialui-core
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
//@stylying
import { purple } from "../../styles/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    marginRight: "6em",
  },
  blocks: {
    padding: "1em",
  },
  title: {
    margin: "0em 1em",
    paddingTop: "1em",
    fontWeight: "bold",
  },
});

export default function GoogleCharts() {
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
  const list = [
    { id: 1, name: "bitcoin" },
    { id: 2, name: "titcoin" },
    { id: 3, name: "xitcoin" },
    { id: 4, name: "mitcoin" },
  ];
  const [coin, setCoin] = useState("bitcoin");
  const { container, title, blocks } = useStyles();

  const handleCoin = (e) => {
    setCoin(e);
  };

  return (
    <Card className={container}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <p className={title}>Interest Time Evolution</p>
        </Grid>
        <Grid className={blocks} item xs={12} sm={12} md={12} lg={12}>
          <Select
            title={"Coin"}
            listValues={list}
            actualElement={coin}
            handleChangeParent={handleCoin}
          ></Select>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid
            container
            className={blocks}
            spacing={3}
            justify="space-between"
          >
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Select
                handleChangeParent={handleCoin}
                listValues={list}
                actualElement={coin}
                title={"Coin"}
              ></Select>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Select
                handleChangeParent={handleCoin}
                listValues={list}
                actualElement={coin}
                title={"Coin"}
              ></Select>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Select
                listValues={list}
                actualElement={coin}
                title={"Coin"}
              ></Select>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <LineCharts
            widthContainer={"90%"}
            heightContainer={180}
            strokeColor={purple}
            dataAux={data}
          ></LineCharts>
        </Grid>
      </Grid>
    </Card>
  );
}
