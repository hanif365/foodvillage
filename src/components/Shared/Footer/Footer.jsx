"use client";

import Link from "next/link";
import React from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaLocationDot,
  FaTwitter,
} from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (!pathname.startsWith("/dashboard")) {
    return (
      <footer>
        <div className="flex-col bg-black px-6 py-20 text-white lg:flex lg:px-10 xl:px-24">
          <div className="lg:flex lg:flex-row lg:justify-between">
            <div>
              <div className="max-w-full flex ">
                <img
                  src="/logo2.jpg"
                  alt=""
                  className="inline-block max-h-20 rounded-md"
                />
                {/* <h2 className="text-xl lg:text-3xl 2xl:text-4xl self-center">
                  niPulse
                </h2> */}
              </div>
              <p className="mt-4 max-w-[350px] text-base font-light text-gray-500">
                Your favourite platform for best meal
              </p>
              <div className="mb-8 mt-6 flex flex-row">
                <a href="" className="mr-4 transition hover:text-gray-400">
                  <FaFacebook className="w-6 h-6" />
                </a>
                <a href="" className="mx-4 transition hover:text-gray-400">
                  <AiFillInstagram className="w-6 h-6" />
                </a>

                <a href="" className="mx-4 transition hover:text-gray-400">
                  <FaTwitter className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="flex grow flex-row flex-wrap lg:mx-10 lg:flex-nowrap lg:justify-center">
              <div className="mb-5 mr-8 flex max-w-[200px] grow basis-[100px] flex-col space-y-5 lg:mx-10">
                <h2 className="font-medium">Events</h2>
                <a href="" className="font-light text-gray-500">
                  Special Offers
                </a>
                <a href="" className="font-light text-gray-500">
                  Unlimited Khana
                </a>
                <a href="" className="font-light text-gray-500">
                  Friday Offer
                </a>
              </div>
              <div className="mb-5 mr-8 flex max-w-[200px] grow basis-[100px] flex-col space-y-5 lg:mx-10">
                <h2 className="font-medium">EXPLORE</h2>
                <a href="" className="font-light text-gray-500">
                  Menu
                </a>
                <a href="" className="font-light text-gray-500">
                  Locations
                </a>
                <a href="" className="font-light text-gray-500">
                  Events
                </a>
              </div>
              <div className="mb-5 mr-8 flex max-w-[200px] grow basis-[100px] flex-col space-y-5 lg:mx-10">
                <h2 className="font-medium">COMPANY</h2>
                <a href="" className="font-light text-gray-500">
                  About
                </a>
                <a href="" className="font-light text-gray-500">
                  Blog
                </a>

                <a href="" className="font-light text-gray-500">
                  Gallery
                </a>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-4 flex flex-row items-center">
                <FaLocationDot className="w-6 h-6" />
                <p className="ml-4">Pabna Rajshahi, Bangladesh</p>
              </div>
              <div className="mb-4 flex flex-row items-center">
                <FaEnvelope className="w-6 h-5" />
                <p className="ml-4">abuhanif.cse3@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="mx-auto my-12 w-full border border-[#E4E4E7] lg:my-20"></div>
          <div>
            <p className="lg: text-center text-sm text-gray-500">
              &copy; Copyright {new Date().getFullYear()}. All rights reserved.
              Build By{" "}
              <Link
                href="https://hanif.netlify.app"
                target="_blank"
                className="text-orange-500"
              >
                M.A.Hanif
              </Link>
            </p>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
