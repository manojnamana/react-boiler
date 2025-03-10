import React from "react";
import { Grid, Paper } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ images }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 5,
        bgcolor: "black",
        width: "-webkit-fill-available",
        p: 3,
        alignItems: "center",
      }}
      fullWidth
    >
      <Slider {...settings}>
        {images.map((src, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{ borderRadius: 20, maxHeight: 207, width: "100%" }}
            />
          </div>
        ))}
      </Slider>
    </Paper>
  );
};

export default Carousel;
