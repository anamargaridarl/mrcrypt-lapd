import React, { useState } from "react";
import NewsList from "../components/news/NewsList";
import TagsCard from "../components/news/TagsCard";
import PageHeader from "../components/PageHeader";
import TopBar from "../components/TopBar";
import Grid from "@material-ui/core/Grid";
import Footer from "../components/Footer";

const NewsPage = () => {
  return (
    <div>
      <TopBar></TopBar>
      <PageHeader name="News"></PageHeader>
      <Grid container spacing={3}>
        <Grid item lg={8} md={6} xs={12}>
          <NewsList />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TagsCard></TagsCard>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default NewsPage;
