import React from "react";
import NewsList from "../components/news/NewsList";
import TagsCard from "../components/news/TagsCard";
import PageHeader from "../components/PageHeader";
import TopBar from "../components/TopBar";
import Grid from "@material-ui/core/Grid";
import Footer from "../components/Footer";
//@styling
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  sticky : {
    position: 'sticky'
  }
});

const NewsPage = () => {
  document.title = "News page";
  const {sticky} = useStyles();
  return (
    <div>
      <TopBar></TopBar>
      <PageHeader name="News"></PageHeader>
      <Grid container item spacing={3} xs={12}>
        <Grid item lg={8} md={6} xs={12}>
          <NewsList />
        </Grid>
        <Grid className = {sticky} item lg={4} md={6} xs={12}>
          <TagsCard></TagsCard>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default NewsPage;
