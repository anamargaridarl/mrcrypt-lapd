import React from "react";
import PageHeader from "../components/PageHeader";
import TopBar from "../components/TopBar";
import Container from "@material-ui/core/Container";
import SocialMediaCarousel from "../components/socialmedia/SocialCarousel";
//import SocialCarouselItem from "../components/socialmedia/SocialCarrouselItem";
import Grid from "@material-ui/core/Grid";

//@stylying
import { makeStyles } from "@material-ui/core/styles";
import SocialTable from "../components/socialmedia/SocialMediaTable";
import GoogleCharts from "../components/socialmedia/GoogleCharts";

const useStyles = makeStyles({
  table: {
    padding: "0.5em 3.5em",
  },
});

export default function SocialMediaPage() {
  const { table } = useStyles();

  return (
    <div>
      <TopBar></TopBar>
      <PageHeader name="Social Media Trends"></PageHeader>
      <Container className={table} maxWidth="false">
        <p> Influencers</p>
        <SocialMediaCarousel></SocialMediaCarousel>
        <Grid container>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <p>Reddit</p>
            <SocialTable></SocialTable>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={8}>
            <p>Google</p>
            <Grid container>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <GoogleCharts></GoogleCharts>
              </Grid>
              <SocialTable></SocialTable>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
