import React from "react";
import Carousel from "react-multi-carousel";
//@core-material-ui
import { makeStyles } from "@material-ui/core/styles";
//@styling
import "react-multi-carousel/lib/styles.css";
import { gray } from "../../styles/colors";
//@components
import HomeCarouselItem from "./HomeCarouselItem";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  bigMobile: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const useStyles = makeStyles({
  background: {
    backgroundColor: gray,
  },
});

//TODO: fetch data from backend for the items
const data = [
  {
    name: "BTC Dominance",
    parameter: "btc_dominance_24h",
    parameterTime: "btc_dominance",
    value: "%"
  },
  {
    name: "Market Cap",
    parameter: "market_cap_24h",
    parameterTime: "market_cap",
    value: "USD"
  },
  {
    name: "Social Volume",
    parameter: "social_volume_24h",
    parameterTime: "social_volume_sum",
    value: ""
  },
  {
    name: "Active Contributors",
    parameter: "social_contributors_24h",
    parameterTime: "social_contributors"
  },
  {
    name: "Average Sentiment",
    parameter: "average_sentiment_24h",
    parameterTime: "average_sentiment",
    value: ""
  },
  {
    name: "News",
    parameter: "news_24h",
    parameterTime: "news",
    value: ""
  },
  {
    name: "Links Shared",
    parameter: "url_shares_24h",
    parameterTime: "url_shares",
    value: ""
  }
]

function HomeCarrousel() {
  const { background } = useStyles();

  return (
    <Carousel className={background} responsive={responsive}>
      {data.map((element) => {
        return (
          <HomeCarouselItem
            value={element.value}
            name={element.name}
            parameter={element.parameter}
            parameterTime={element.parameterTime}
          />
        );
      })}
    </Carousel>
  );
}

export default HomeCarrousel;
