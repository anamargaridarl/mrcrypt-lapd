import React, { useEffect, useState } from "react";
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

const axios = require("axios");

function HomeCarrousel() {
  const [data, setData] = useState([]);
  const { background } = useStyles();
  const getData = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/api/coins/global",
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Carousel className={background} responsive={responsive}>
      {data.map((element) => {
        return (
          <HomeCarouselItem
            key={element.id}
            tootltip={element.tooltip}
            value={element.value}
            name={element.name}
            type={element.type}
            dataTime={element.timestamp}
          />
        );
      })}
    </Carousel>
  );
}

export default HomeCarrousel;
