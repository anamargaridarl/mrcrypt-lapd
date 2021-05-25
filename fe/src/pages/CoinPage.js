import React, {useEffect} from "react";
import { useParams } from "react-router";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import CoinInfo from "../components/coin/CoinInfo";
import CoinValue from "../components/coin/CoinValue";
import CoinStats from "../components/coin/CoinStats";
import CardCoinInfo from "../components/coin/cardCoinInfo";
import CoinChart from "../components/coin/coinChart";
//@core-material-ui
import { makeStyles, Container } from "@material-ui/core";
const axios = require('axios');


const useStyles = makeStyles({
  table: {
    padding: "0.5em 3.5em",
  },
  intro: {
    marginTop: "2em",
  },
  container: {
    paddingRight: "5em",
  },
});

export default function CoinPage() {
  let { coinName } = useParams();
  const { container, table, intro } = useStyles();

  const [coinInfo, setCoinInfo] = React.useState(null);
  const [coinStats, setCoinStats] = React.useState(null);
  const [coinValue, setCoinValue] = React.useState(null);
  const [chartValue, setChartValue] = React.useState([]);
  const [dillutedMarketUp, setDillutedMarketUp] = React.useState(null); 
  const [volume, setVolume] = React.useState(null);
  const [marketCap, setMarketCap] = React.useState(null);

  useEffect(() => {
    const getCoinInfo = async () => {
      try {
        axios({
          method: 'get',
          url: `http://localhost:8080/api/coins/${coinName}/coinInfo`
        })
        .then((response) => {
          setCoinInfo(response.data.value);
          if (response.status !== 200) {
            throw new Error();
          }
        });  
      } catch (err) {
        console.error(err);
      }
    };
    getCoinInfo();

}, [coinName]);

  useEffect(() => {
    
    const getCoinStats = async() => {
      try {
        if (coinInfo === null) {
          return;
        } 
        axios({
          method: 'get',
          url: `http://localhost:8080/api/coins/${coinInfo.symbol}/stats`
        })
        .then((response) => {
          setCoinStats(response.data.value);
          if (response.status !== 200) {
            throw new Error();
          }
        });  
      } catch(err) {
        console.log(err);
      }
    }

    const getCoinValue = async () =>{
      try {
        if (coinInfo === null) {
          return;
        } 
        axios({
          method: 'get',
          url: `http://localhost:8080/api/coins/${coinInfo.symbol}/price`
        })
        .then((response) => {
          setCoinValue(response.data.value);
          if (response.status !== 200) {
            throw new Error();
          }
        });  
      } catch(err) {
        console.log(err);
      }
    }

    const getChartValues = async () => {
      try {
        if (coinInfo === null) {
          return;
        }

        axios({
          method: 'get',
          url: `http://localhost:8080/api/coins/${coinInfo.symbol}/coinEvolution`
        }).then(response => {
          setChartValue(response.data.values);
        });

      } catch(err) {
        console.log(err);
      }
    }

    const getDillutedMarketCap = async() => {
      try {

        if (coinInfo === null) {
          return;
        }

        axios({
          method: 'get',
          url: `http://localhost:8080/api/coins/market/${coinInfo.symbol.toLowerCase()},btc,eth`
        }).then(response => {
          setDillutedMarketUp(response.data.value);
        });

      } catch(error) {
        console.log(error);
      }
    }

    const getCardInfo = async() => {
      try {
        if (coinInfo === null) {
          return;
        }
        axios({
          method: 'get',
          url: `http://localhost:8080/api/coins/${coinInfo.symbol}/info`
        }).then(response => {
          setVolume(response.data.volume);
          setMarketCap(response.data.marketCap);
        });

      } catch(error) {
        console.log(error);
      }
    }
    getCoinStats()
    getCoinValue();
    getChartValues();
    getDillutedMarketCap();
    getCardInfo();
  }, [coinInfo])
  

  return (
    <>
      <TopBar></TopBar>
      <Container className={table} maxWidth={false}>
        <Breadcrumbs aria-label="breadcrumb">
          <b>Coins</b>
          <p>{coinName}</p>
        </Breadcrumbs>
        <Grid container spacing={10}>
          <Grid className={container} item xs={12} sm={12} md={8} lg={8}>
            <CoinInfo data = {coinInfo}></CoinInfo>
            <Grid container className={intro} justify="space-between">
              <CardCoinInfo data =  {{data: marketCap, title: 'Market cap'}}></CardCoinInfo>
              <CardCoinInfo data = {{data: dillutedMarketUp?.[coinInfo?.symbol], title: 'Fully dilluted market cap'}}></CardCoinInfo>
              <CardCoinInfo data = {{data: volume, title: 'Volume',  symbol : coinInfo?.symbol}}></CardCoinInfo>
            </Grid>
            <CoinChart data={chartValue} name={coinName}></CoinChart>
          </Grid>
          <Grid container item xs={12} sm={12} md={4} lg={4} direction="column">
            <CoinValue data = {coinValue} percentage = {dillutedMarketUp?.[coinInfo?.symbol]?.percentage} coinName={coinName} 
            symbol = {coinInfo?.symbol}></CoinValue>
            <CoinStats data={coinStats}></CoinStats>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
