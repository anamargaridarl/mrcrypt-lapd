import React from "react";
import InfluencerCard from "../components/socialmedia/SocialCarrouselItem";
import PageHeader from "../components/PageHeader";
import TopBar from "../components/TopBar";
import Container from "@material-ui/core/Container";
import SocialMediaCarousel from "../components/socialmedia/SocialCarousel";
import SocialCarouselItem from "../components/socialmedia/SocialCarrouselItem";


//@stylying
import { makeStyles } from "@material-ui/core/styles";

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
      </Container>
    </div>
  );
}
