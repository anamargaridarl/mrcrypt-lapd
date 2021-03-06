import React from "react";
import Converser from "../components/converser/Converser";
import PageHeader from "../components/PageHeader";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import Container from "@material-ui/core/Container";
//@styling
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    padding: "0.5em 3.5em",
  },
});

export default function ConverserPage() {
  document.title = "Converser";
  const { table } = useStyles();

  return (
    <>
      <TopBar />
      <PageHeader name="Converser"></PageHeader>
      <Container className={table} >
        <Converser />
      </Container>
      <Footer />
    </>
  );
}
