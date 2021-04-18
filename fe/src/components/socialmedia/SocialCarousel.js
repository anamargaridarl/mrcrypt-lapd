import Carousel from "react-multi-carousel";

//@core-material-ui
import { makeStyles } from "@material-ui/core/styles";

//@stylying
import "react-multi-carousel/lib/styles.css";
import { gray } from "../../styles/colors";

//@components
import SocialCarouselItem from "./SocialCarrouselItem";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
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

const useStyles = makeStyles({});

//TODO: fetch data from backend for the items
const data = [
  {
    title: "Documenting Bitcoin",
    imageSrc: "assets/bitcoin.png",
    weightedRank: 59,
    engagementRank: 3,
    followerRank: 109,
    postRank: 63,
  },
  {
    title: "Documenting Bitcoin",
    imageSrc: "assets/bitcoin.png",
    weightedRank: 59,
    engagementRank: 3,
    followerRank: 109,
    postRank: 63,
  },
];

function SocialCarrousel() {
  const {} = useStyles();

  return (
    <Carousel responsive={responsive}>
      <SocialCarouselItem />
      <SocialCarouselItem />
      <SocialCarouselItem />
      <SocialCarouselItem />
      <SocialCarouselItem />
      <SocialCarouselItem />
      <SocialCarouselItem />

      {/* {data.map((element) => {
        return (
          <SocialCarouselItem
            data = {element}
          />
        );
      })} */}
    </Carousel>
  );
}

export default SocialCarrousel;
