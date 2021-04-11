import Carousel from "react-multi-carousel";

//@core-material-ui
import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

//@components
import TinyChart from "./TinyChart";

//@core-material-ui
import { makeStyles } from "@material-ui/core/styles";

//@stylying
import "react-multi-carousel/lib/styles.css";
import { grey, green, purple } from "../styles/colors";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  bigMobile: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const useStyles = makeStyles({
  background: {
    backgroundColor: grey,
  },
  paper: {
    width: "13em",
    margin: "2em 1em",
    padding: "0.5em",
    justifyContent: "center",
  },
  body: {
    margin: "0 1em",
  },
  innerElement: {
    width: "80%",
  },
  growthElement: {
    color: green,
  },
});

function Carousel2() {
  const { background } = useStyles();

  return (
    <div>
      <Carousel className={background} responsive={responsive}>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </Carousel>
    </div>
  );
}

function Item() {
  const { paper, innerElement, growthElement, body } = useStyles();

  return (
    <Paper className={paper}>
      <Grid
        className={body}
        container
        justify="flex-start"
        alignItems="flex-start"
      >
        <p>ACTIVE CONTRIBUTERS</p>
        <Grid container className={innerElement} justify="space-between">
          <Grid item>
            {" "}
            <b>377.780 </b>
          </Grid>
          <Grid item className={growthElement}>
            +163.50%
          </Grid>
        </Grid>
        <TinyChart widthContainer={"80%"} heightContainer={70} strokeColor={purple}></TinyChart>
      </Grid>
    </Paper>
  );
}

export default Carousel2;
