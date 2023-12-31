"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import "./page.css";
import PhotoGalleries from "../../../data/photoGallery.json";
import { useSession } from "next-auth/react";

const Register = () => {
  const session = useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    nid: "",
    dateOfBirth: "",
    address: "",
    roles: [],
  });
  const [error, setError] = useState(null);

  const router = useRouter();

  console.log(formData);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Function to check if the email is valid
  const isEmailValid = (email) => {
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setError("Email not valid.");
      return;
    }

    try {
      console.log(formData);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 201) {
        router.push("/login?success=Account has been created");
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong!");
      }
    } catch (err) {
      setError("Something went wrong!!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleRoleChange = (e) => {
  //   const { value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     roles: [value],
  //   }));
  // };

  // Function to check if password and confirmPassword match
  const doPasswordsMatch = () => {
    return formData.password === formData.confirmPassword;
  };

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

  if (session.status === "loading") {
    return (
      <div className="mt-40">
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

  return (
    <div className="relative min-h-screen flex">
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
        <div className="sm:w-1/2 md:w-2/5 hidden md:block">
          <Slider {...settings}>
            {PhotoGalleries.map((event, index) => (
              <div
                key={index}
                className="sm:w-1/2 md:w-2/5 h-full hidden md:flex flex-auto justify-center items-center  overflow-hidden text-white bg-no-repeat bg-cover relative  bg-gradient-to-r from-sky-500 to-indigo-400 rounded-br-[10px] transform skew-x-[-2deg] origin-top"
              >
                <div className="relative">
                  <Image
                    src={event.thumbnail}
                    alt="event Image"
                    width={2000}
                    height={2000}
                    className="w-full h-[155vh] 2xl:h-[125vh]"
                  />

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

        <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-3/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
          <div className="max-w-3xl w-full space-y-8 pt-20">
            <div className="">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Hello Food Lovers!
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Please register to explore more
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {/* name */}
              <div className="relative">
                <input
                  className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-[#4C50E8]"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* email */}
              <div className="relative">
                {isEmailValid(formData.email) && (
                  <div className="absolute right-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-8 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                )}

                <input
                  className={`w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl ${
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
                  className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-[#4C50E8]"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* confirm password */}
              <div className="relative">
                {formData.confirmPassword !== "" && doPasswordsMatch() && (
                  <div className="absolute right-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-8 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      title="Password matched"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                )}
                <input
                  className={`w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl ${
                    formData.confirmPassword !== "" && doPasswordsMatch()
                      ? "focus:border-[#4C50E8]"
                      : "focus:border-red-500"
                  }`}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Phone number */}
              <div className="relative">
                <input
                  className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-[#4C50E8]"
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* NID number */}
              <div className="relative">
                <input
                  className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-[#4C50E8]"
                  type="text"
                  name="nid"
                  placeholder="NID Number"
                  value={formData.nid}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* DOB */}
              <div className="relative">
                <input
                  className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-[#4C50E8]"
                  type="date"
                  name="dateOfBirth"
                  placeholder="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Role */}
              {/* <div className="mb-4">
                <select
                  name="role"
                  value={formData.roles}
                  onChange={handleRoleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="HR">HR</option>
                </select>
              </div> */}

              {/* Address */}
              <div className="relative">
                <textarea
                  className="w-full text-base px-4 py-2 border-b bg-gray-50 border-gray-300 focus:outline-none rounded-2xl focus:border-[#4C50E8]"
                  name="address"
                  rows="4"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="text-[14px] lg:text-[16px] register_btn w-full flex justify-center items-center px-10 py-8 relative border uppercase font-semibold tracking-wider leading-none overflow-hidden bg-[#070B39] rounded-md text-white cursor-pointer"
                >
                  <span className="absolute inset-0 bg-yellow-400 rounded"></span>
                  <span className="absolute inset-0 flex justify-center items-center font-bold">
                    Register
                  </span>
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </form>

            <p className="flex space-x-5  text-md text-gray-500">
              <span>Already have an account?</span>
              <Link
                href="/login"
                className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
