import React from "react";
import Slider from "react-slick";
const BACKEND_URL = import.meta.env.VITE_API_URL;

function PostCarrousel({ images }) {
  if (!images || images.length === 0) return null;
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="w-full overflow-hidden rounded-lg bg-fondo-claro">
      <style></style>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={`${BACKEND_URL}${image.imageUrl}`}
              alt={`imagen ${index + 1}`}
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default PostCarrousel;
