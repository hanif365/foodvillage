"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import "./page.css";
import {
  FaEye,
  FaEyeSlash,
  FaGithub,
  FaGoogle,
} from "react-icons/fa6";
import PhotoGalleries from '../../../data/photoGallery.json';
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // console.log(session.status);

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  if (session.status === "loading") {
    return (
      <div className="mt-40 min-h-screen">
        <Image
          src="/loading.gif"
          alt="Loading Image"
          width={30}
          height={30}
          className="mx-auto"
        />
      </div>
    );
  }

  // if (session?.status === "authenticated") {
  //   router?.push("/");
  // }

  console.log(session.status);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { email, password } = formData;

    // Sign in using the "credentials" provider
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An error occurred, Please try Again!");
    }
  };

  // Sign in using the "google / github" provider
  const providerSignInAndRedirect = async (provider) => {
    await signIn(provider);
    router.push("/dashboard");
  };

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Function to check if the email is valid
  const isEmailValid = (email) => {
    return emailRegex.test(email);
  };

  // console.log(error);

  const settings = {
    // dots: true,
    arrows: false,
    infinite: true,
    fade: true,
    pauseOnHover: false,
    speed: 3000, // Animation speed in milliseconds
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000, // Delay between each auto scroll (in milliseconds)
    swipeToSlide: true,
    centerMode: true, // Enable center mode
    centerPadding: "0px", // Adjust padding to center the cards (60px for left and right showing)
  };

  return (
    <div className="relative min-h-screen flex">
      <div className="flex flex-col sm:flex-row-reverse items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
        {/* image box start */}
        <div className="sm:w-1/2 md:w-1/2 hidden md:block">
          <Slider {...settings}>
            {PhotoGalleries.map((event, index) => (
              <div
                key={index}
                className="sm:w-1/2 md:w-2/5 h-full hidden md:flex flex-auto justify-center items-center  overflow-hidden text-white bg-no-repeat bg-cover relative  bg-gradient-to-r from-sky-500 to-indigo-400  rounded-bl-[10px] 2xl:rounded-none transform skew-x-[3deg] origin-top"
              >
                <div className="relative">
                  <Image
                    src={event.thumbnail}
                    alt="event Image"
                    width={2000}
                    height={2000}
                    className="w-full h-[110vh] 2xl:h-[100vh]"
                  />

                  {/* when Image show uncomment below line */}
                  <div className="absolute top-40 2xl:top-60 left-0 right-0 bottom-0 flex flex-col  px-10 z-[1]">
                    <p className="text-xl lg:text-4xl 2xl:text-6xl font-bold pt-40">
                      {event.title}
                    </p>
                    <p className="text-base lg:text-xl 2xl:text-2xl font-bold pt-10">
                      {event.subtitle}
                    </p>
                  </div>
                  {/* when Image show uncomment below line */}
                  <div className="absolute top-0 left-0 right-0 bottom-0  bg-gradient-to-b from-blue-300 via-blue-500 to-blue-800 opacity-40"></div>
                </div>
                
              </div>
            ))}
          </Slider>
        </div>
        {/* image box end */}

        <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-1/2 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
          <div className="max-w-3xl w-full space-y-8 pt-20">
            <div className="">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Welcome Back!
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Please login to explore more
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {/* email */}
              <div className="relative">
                {isEmailValid(formData.email) && (
                  <div className="absolute right-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-14 w-8 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                )}

                <input
                  className={`w-full text-base px-4 py-4 border-b border-gray-300 focus:outline-none rounded-2xl ${
                    isEmailValid(formData.email)
                      ? "focus:border-[#4C50E8]"
                      : "focus:border-red-500"
                  }`}
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* password */}
              <div className="relative">
                <input
                  className="w-full text-base px-4 py-4 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-[#4C50E8]"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />

                {formData.password ? (
                  showPassword ? (
                    <FaEye
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      style={{ width: "20px", height: "20px" }}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FaEyeSlash
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      style={{ width: "20px", height: "20px" }}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )
                ) : (
                  <></>
                )}
              </div>

              {/* other component */}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-indigo-400 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  // className="w-full login_btn relative flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4 rounded-lg tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                  className="text-[18px] lg:text-[24px] login_btn w-full flex justify-center items-center px-10 py-8 relative border uppercase font-semibold  leading-none overflow-hidden bg-[#070B39] rounded-md text-white cursor-pointer tracking-[0.1em]"
                >
                  <span className="absolute inset-0 bg-yellow-400 rounded"></span>
                  <span className="absolute inset-0 flex justify-center items-center font-bold">
                    Login
                  </span>
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </form>

            <p className="flex space-x-5  text-md text-gray-500">
              <span>Don't have an account?</span>
              <Link
                href="/register"
                className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
              >
                Register
              </Link>
            </p>

            <div className="flex items-center justify-center space-x-2">
              <span className="h-px w-16 bg-gray-400"></span>
              <span className="text-gray-400 font-normal">
                or continue with
              </span>
              <span className="h-px w-16 bg-gray-400"></span>
            </div>

            <div className="flex flex-row justify-center items-center space-x-3">
              <button
                onClick={() => providerSignInAndRedirect("google")}
                className="w-11 h-11 items-center justify-center inline-flex rounded-2xl font-bold text-lg bg-blue-500 hover:shadow-lg cursor-pointer transition ease-in duration-300"
              >
                <FaGoogle className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => providerSignInAndRedirect("github")}
                className="w-11 h-11 items-center justify-center inline-flex rounded-2xl font-bold text-lg bg-blue-400 hover:shadow-lg cursor-pointer transition ease-in duration-300"
              >
                <FaGithub className="w-6 h-6 text-white" />
              </button>

              {/* <button
                onClick={() => providerSignInAndRedirect("facebook")}
                className="w-11 h-11 items-center justify-center inline-flex rounded-2xl font-bold text-lg bg-blue-900 hover:shadow-lg cursor-pointer transition ease-in duration-300"
              >
                <FaFacebookF className="w-6 h-6 text-white" />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
