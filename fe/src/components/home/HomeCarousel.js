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
    name: "ACTIVE CONTRIBUTERS",
    value: 377.780,
    growth: 163.50
  },
  {
    name: "ACTIVE CONTRIBUTERS",
    value: 377.780,
    growth: -163.50
  },
  {
    name: "ACTIVE CONTRIBUTERS",
    value: 377.780,
    growth: +163.50
  },
  {
    name: "ACTIVE CONTRIBUTERS",
    value: 377.780,
    growth: +163.50
  },
  {
    name: "ACTIVE CONTRIBUTERS",
    value: 377.780,
    growth: +163.50
  },
  {
    name: "ACTIVE CONTRIBUTERS",
    value: 377.780,
    growth: +163.50
  },
  {
    name: "ACTIVE CONTRIBUTERS",
    value: 377.780,
    growth: +163.50
  },
  {
    name: "ACTIVE CONTRIBUTERS",
    value: 377.780,
    growth: +163.50
  },
  {
    name: "ACTIVE CONTRIBUTERS",
    value: 377.780,
    growth: +163.50
  },
  {
    name: "ACTIVE CONTRIBUTERS",
    value: 377.780,
    growth: +163.50
  }
]

function HomeCarrousel() {
  const { background } = useStyles();

  return (
    <Carousel className={background} responsive={responsive}>
      {data.map((element) => {
        return (
          <HomeCarouselItem
            name={element.name}
            value={element.value}
            growth={element.growth}
          />
        );
      })}
    </Carousel>
  );
}

export default HomeCarrousel;
