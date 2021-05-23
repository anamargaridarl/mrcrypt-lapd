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
  },
  page: {
    backgroundColor: gray,
    height: "100vh",
  },
});

export default function SocialMediaPage() {
  const { page, table, header, bottomPage, subTitle } = useStyles();

  return (
    <div className={page}>
      <TopBar></TopBar>
      <p className={header}> Social Media Trends</p>
      <Container className={table} maxWidth={false}>
        <p className={subTitle}> Influencers</p>
        <SocialMediaCarousel></SocialMediaCarousel>
        <Grid container className={bottomPage}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <p className={subTitle}>Reddit</p>
            <SocialTable
              url="topSubreddits"
              title="SubReddits Weekly Growth"
              header="Subreddit"
              metric="Increase %"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={8}>
            <p className={subTitle}>Google</p>
            <Grid container>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <GoogleCharts></GoogleCharts>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <SocialTable
                  url="topCryptoSearches"
                  title="Top 10 Cryptocurrency Related Google Searches"
                  header="Name"
                  metric="Increase in Search Frequency"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}
