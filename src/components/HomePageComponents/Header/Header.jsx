"use client";
import React from "react";
import { Link } from "react-scroll";
import "./Header.css";

const Header = () => {
  return (
    <header className="py-28 2xl:py-64 bg-[url('/bg_hero.jpg')] bg-no-repeat bg-cover">
      <div className="mx-auto px-5 py-16 md:px-10 md:pt-24 lg:pt-32">
        <div className="mx-auto mb-0 w-full max-w-4xl 2xl:max-w-6xl text-center md:mb-12 lg:mb-16">
          <h1 className="text-white mb-8 text-4xl 2xl:text-8xl font-bold md:text-7xl">
            Tasty Delights, Culinary Wonderland
          </h1>
          <p className="mx-auto mb-5 max-w-4xl text-sm text-[#e9e2e2] sm:text-xl md:mb-6 lg:mb-8">
            Discover, Savor, and Share
          </p>
          <div className="flex items-stretch justify-center">
            <Link
              activeClassName="active"
              to="most_popular_recipes"
              spy={true}
              smooth={true}
              offset={-120}
              duration={500}
              className="btn "
              type="button"
            >
              BOOK RECEIPE
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
