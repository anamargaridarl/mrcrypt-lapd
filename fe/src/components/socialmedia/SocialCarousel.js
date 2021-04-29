import React from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
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
  {
    title: "Documenting Bitcoin",
    imageSrc: "assets/bitcoin.png",
    weightedRank: 59,
    engagementRank: 3,
    followerRank: 109,
    postRank: 63,
  }
];

let i = 0;
function SocialCarrousel() {
  return (
    <Carousel responsive={responsive}>
      {data.map((element) => {
        return (
          <SocialCarouselItem
            key= {i++}
            data = {element}
          />
        );
      })}
    </Carousel>
  );
}

export default SocialCarrousel;
