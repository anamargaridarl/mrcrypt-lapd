import React from "react";
//@materialui-core
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
//@components
import TopBar from "../components/TopBar";
import SocialMediaCarousel from "../components/socialmedia/SocialCarousel";
import GoogleCharts from "../components/socialmedia/GoogleCharts";
import SocialTable from "../components/socialmedia/SocialMediaTable";
import Footer from "../components/Footer";
//@styling
import { makeStyles } from "@material-ui/core/styles";
import { gray } from "../styles/colors";

const useStyles = makeStyles({
  table: {
    padding: "0.5em 3.5em",
  },
  header: {
    marginBottom: "0",
    marginTop: "2em",
    marginLeft: "4em",
    fontWeight: "bold",
  },
  subTitle: {
    marginTop: "0",
    paddingLeft: "0.5em",
    fontSize: "1.25em",
  },
  bottomPage: {
    marginTop: "2em",
    marginBottom: "3em",
    justifyContent: "space-between"
  },
  page: {
    backgroundColor: gray,
  },
});

export default function SocialMediaPage() {
  document.title = "Social Media Trends";
  const { page, table, header, bottomPage, subTitle } = useStyles();

  return (
    <div className={page}>
      <TopBar />
      <p className={header}> Social Media Trends</p>
      <Container className={table} maxWidth={false}>
        <p className={subTitle}> Influencers</p>
        <SocialMediaCarousel />
        <Grid container className={bottomPage}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <p className={subTitle}>Reddit</p>
            <SocialTable
              url="topSubreddits"
              title="SubReddits Weekly Growth"
              header="Subreddit"
              metric="Increase"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <p className={subTitle}>Google</p>
            <GoogleCharts />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} style={{marginTop: "2.8em"}}>
            <SocialTable
              url="topCryptoSearches"
              title="Cryptocurrency Related Google Searches"
              header="Name"
              metric="Increase"
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}
