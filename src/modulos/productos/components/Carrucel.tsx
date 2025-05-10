import Image from "next/image";
import Slider from "react-slick";
import image0 from "../../../images/imagen0.jpg";
import image1 from "../../../images/imagen2.jpg";
import image2 from "../../../images/imagen3.jpg";
import image3 from "../../../images/imagen1.jpg";
import image4 from "../../../images/imagen4.jpg";
import { Box, Typography } from "@mui/material";

const slides = [
  { src: image0, title: "New arrivals in Toys" },
  { src: image1, title: "News in cameras" },
  { src: image2, title: "New Electronics Just In" },
  { src: image3, title: "New Fashion Arrivals" },
  { src: image4, title: "New Computers & Laptops" },
];

const Carrucel = () => {
  const settings = {
    className: "",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    <>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box key={index} sx={{ position: "relative", width: "100%" }}>
            <Box
              sx={{
                position: "absolute",
                top: "60px",
                left: 0,
                width: "100%",
                display: "flex",
                color: "white",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <Typography variant="h3" fontWeight="bold">
                {slide.title}
              </Typography>
            </Box>

            <Image
              src={slide.src}
              alt={slide.title}
              layout="responsive"
              objectFit="cover"
            />
          </Box>
        ))}
      </Slider>
    </>
  );
}

export default Carrucel;