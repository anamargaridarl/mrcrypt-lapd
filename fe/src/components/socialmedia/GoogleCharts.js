import React, { useState } from "react";
//@components
import Select from "../Select";
import LineCharts from "../LineCharts";
//@materialui-core
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
//@styling
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

const data = [
  {
    name: "2008",
    pv: 2400,
  },
  {
    name: "2010",
    pv: 1398,
  },
  {
    name: "2012",
    pv: 9800,
  },
  {
    name: "2014",
    pv: 3908,
  },
  {
    name: "2016",
    pv: 4800,
  },
  {
    name: "2018",
    pv: 3800,
  },
  {
    name: "2020",
    pv: 4300,
  },
];

//TODO: add listValues correspondent to the selects
//for now using the same list for all (mock structure)
const list = [
  { id: 1, name: "Bitcoin" },
  { id: 2, name: "Titcoin" },
  { id: 3, name: "Xitcoin" },
  { id: 4, name: "Mitcoin" },
];

export default function GoogleCharts() {
  const [coin, setCoin] = useState("Bitcoin");
  const [location, setLocation] = useState("Bitcoin");
  const [time, setTime] = useState("Bitcoin");
  const [searchType, setSearchType] = useState("Bitcoin");
  const { container, title, blocks } = useStyles();

  const handleCoin = (e) => {
    setCoin(e);
  };

  const handleLocation = (e) => {
    setLocation(e);
  };

  const handleTime = (e) => {
    setTime(e);
  };

  const handleSearchType = (e) => {
    setSearchType(e);
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
                handleChangeParent={handleLocation}
                listValues={list}
                actualElement={location}
                title={"Location"}
              ></Select>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Select
                handleChangeParent={handleTime}
                listValues={list}
                actualElement={time}
                title={"Time"}
              ></Select>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Select
                handleChangeParent={handleSearchType}
                listValues={list}
                actualElement={searchType}
                title={"Type of Search"}
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
