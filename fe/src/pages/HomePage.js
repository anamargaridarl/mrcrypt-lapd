import React from "react";

//@components
import HomeCarousel from "../components/Carousel";
import TopBar from "../components/TopBar";
import CoinTable from "../components/home/CoinTable";
import Container from "@material-ui/core/Container";
import Footer from "../components/Footer";

//@stylying
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    margin: "1em 3.5em",
  },
  table: {
    padding: "0.5em 3.5em",
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

export default function HomePage() {
  const { title, table } = useStyles();

  return (
    <div>
      <TopBar></TopBar>
      <HomeCarousel data={data}></HomeCarousel>
      <p className={title}>
        {" "}
        <b>Market</b>{" "}
      </p>
      <Container className={table} maxWidth="false">
        <CoinTable></CoinTable>
      </Container>
      <Footer />
    </div>
  );
}
