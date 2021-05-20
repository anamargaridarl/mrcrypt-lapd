import React, { useState, useEffect } from "react";
//@components
import Select from "../Select";
import LineCharts from "../LineCharts";
//@materialui-core
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
//@styling
import { purple } from "../../styles/colors";
import { makeStyles } from "@material-ui/core/styles";

const axios = require('axios');

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

const defaultData = [
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

const locations = [
  {id: 1, name: "US"},
  {id: 2, name: "PT"},
  {id: 3, name: "WW"},
];

const timePeriods = [
  {id: 1, name: "last week"},
  {id: 2, name: "last month"},
  {id: 3, name: "last year"},
  {id: 4, name: "last decade"},
];

const searchType = [
  {id: 1, name: "web searc ['images', 'news', 'youtube' or 'froogle']"}
];

export default function GoogleCharts() {
  const [coin, setCoin] = useState("Bitcoin");
  const [coins, setCoins] = useState([{id: 1, name: ""}]);
  const [location, setLocation] = useState("US");
  const [time, setTime] = useState("last week");
  const [searchType, setSearchType] = useState("");
  const [data, setData] = useState([]);
  const { container, title, blocks } = useStyles();

  useEffect(() => {
    getCoins();
  },[]);

  useEffect(() => {
    getData();
  },[coin, location, time]);

  const getCoins = async () => {
    try {
      axios({
        method: 'get',
        url: 'http://localhost:8080/api/converser/coins'
      })
      .then((response) => {
        const fetchedCoins = response.data.coins.map((item, i) => ({id: i+1, name: item.name}))
        setCoins(fetchedCoins);
      });  
    } catch (err) {
      console.error(err);
    }
  };

  const getData = async () => {
    try {
      axios({
        method: 'get',
        url: 'http://localhost:8080/api/social-media-trends/googleInterest',
        params: {
          coin: coin,
          location: location,
          timePeriod: time,
        },
      }).then((response) => setData(response.data.evolution));
    } catch (e) {
      console.error(e);
      setData(defaultData);
    }
  };

  const handleCoin = (e) => {
    setCoin(e);
    getData();
  };

  const handleLocation = (e) => {
    setLocation(e);
    getData();
  };

  const handleTime = (e) => {
    setTime(e);
    getData();
  };

  const handleSearchType = (e) => {
    //setSearchType(e);
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
            listValues={coins}
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
                listValues={locations}
                actualElement={location}
                title={"Location"}
              ></Select>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Select
                handleChangeParent={handleTime}
                listValues={timePeriods}
                actualElement={time}
                title={"Time"}
              ></Select>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Select
                handleChangeParent={handleSearchType}
                listValues={[]}
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
