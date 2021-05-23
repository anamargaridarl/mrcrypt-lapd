import React from "react";
//@components
import HomeCarousel from "../components/home/HomeCarousel";
import TopBar from "../components/TopBar";
import CoinTable from "../components/home/CoinTable";
import Container from "@material-ui/core/Container";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
//@styling
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    padding: "0.5em 3.5em",
  },
});

export default function HomePage() {
  const { table } = useStyles();

  return (
    <div>
      <TopBar></TopBar>
      <HomeCarousel></HomeCarousel>
      <PageHeader name="Market"></PageHeader>
      <Container className={table} maxWidth={false}>
        <CoinTable></CoinTable>
      </Container>
      {/* <Footer /> */}
    </div>
  );
}
