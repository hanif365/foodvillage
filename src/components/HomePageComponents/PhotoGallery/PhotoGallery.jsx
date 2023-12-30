"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import PhotoGalleries from "../../../data/photoGallery.json";

const PhotoGallery = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    // pauseOnHover: false,
    speed: 500, // Animation speed in milliseconds
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Delay between each auto scroll (in milliseconds)
    swipeToSlide: true,
    centerMode: true, // Enable center mode
    centerPadding: "0px", // Adjust padding to center the cards (60px for left and right showing)
    // lazyLoad: "ondemand",
    // centerMode: true,
    // centerPadding: '30px',
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="my-10 lg:mb-20" id="most_popular_recipes">
      <h1 className="text-3xl text-center md:text-4xl lg:text-5xl 2xl:text-6xl font-extrabold mt-4 mb-5">
        Most Popular Recipes
      </h1>
      <p className="mb-8 mt-4 text-base text-[#636262] sm:text-base md:mb-6 lg:mb-10 text-center">
        Take Your Most Favorite Recipes
      </p>
      <Slider {...settings}>
        {PhotoGalleries.map((event, index) => (
          <div key={index} className="py-5 lg:py-10">
            <div className="mx-3 group relative overflow-hidden rounded-lg h-[20rem] 2xl:h-[24rem]">
              <Image
                src={event.thumbnail}
                alt="upcoming event Image"
                width={1000}
                height={1000}
                className="w-full h-[20rem] 2xl:h-[24rem] group-hover:scale-110 transition-all duration-300 transform cursor-pointer"
              />
            </div>
            <p className="lg:text-lg font-semibold pt-2 mx-3">{event.title}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PhotoGallery;
