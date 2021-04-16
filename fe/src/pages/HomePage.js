import React from "react";

//@components
import HomeCarousel from "../components/HomeCarousel";
import TopBar from "../components/TopBar";
import CoinTable from "../components/CoinTable";
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

export default function HomePage() {
  const { title, table } = useStyles();

  return (
    <div>
      <TopBar></TopBar>
      <HomeCarousel></HomeCarousel>
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
