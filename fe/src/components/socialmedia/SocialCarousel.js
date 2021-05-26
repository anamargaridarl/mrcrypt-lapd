import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
//@components
import SocialCarouselItem from "./SocialCarrouselItem";

const axios = require('axios');

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


let i = 0;
 function SocialCarrousel() {
  const [influencers,setInfluencers] = useState([]);

  useEffect(() => {
    getInfluencers();
  },[]);

  const getInfluencers = async () => {
    try {
      axios({
        method: 'get',
        url: 'http://localhost:8080/api/social-media-trends/influencers'
      }).then((response) => setInfluencers(response.data.influencers));
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Carousel responsive={responsive}>
      {influencers.map((element) => {
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
