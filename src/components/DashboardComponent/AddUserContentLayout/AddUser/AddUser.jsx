"use client";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const initialData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  nid: "",
  dateOfBirth: "",
  address: "",
  roles: [],
};

const AddUser = () => {
  const session = useSession();
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let userId = useSearchParams().get("userId");
  const router = useRouter();

  // console.log(formData);
  // console.log(userId);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Function to check if the email is valid
  const isEmailValid = (email) => {
    return emailRegex.test(email);
  };

  // Function to check if the NID is valid
  const isNIDValid = (nid) => {
    // console.log(nid.length);
    if (nid.length === 10 || nid.length === 13 || nid.length === 17) {
      return true;
    } else {
      return false;
    }
  };

  // Function to check if the Phone Number is valid
  const isPhoneNumberValid = (phoneNum) => {
    if (phoneNum.length === 11) {
      return true;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user?userId=${userId}`);
        if (response.ok) {
          const userData = await response.json();
          // console.log("Fetched user data", userData);

          // Pre-fill the form fields with fetched data
          // setFormData(userData);
          setFormData((prevData) => ({
            ...prevData,
            name: userData.name || "",
            email: userData.email || "",
            phoneNumber: userData.phoneNumber || "",
            nid: userData.nid || "",
            address: userData.address || "",
          }));
        } else {
          // console.error("Failed to fetch user data");
        }
      } catch (error) {
        // console.error("Error:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // handle submit function
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

    if (
      formData.nid.length !== 10 &&
      formData.nid.length !== 13 &&
      formData.nid.length !== 17
    ) {
      setError("NID not valid. NID should have 10, 13, or 17 digits");
      return;
    }

    if (formData.phoneNumber.length !== 11) {
      setError("Phone Number Not Valid. Phone Number should have 11 digits");
      return;
    }

    setLoading(true);

    const apiUrl = userId
      ? `/api/users?userId=${userId}`
      : "/api/auth/register";

    try {
      // console.log(formData);
      const res = await fetch(apiUrl, {
        method: userId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // console.log("RES:", res);

      if (res.ok) {
        setFormData(initialData);
        setLoading(false);
        showToast(
          `${formData?.roles?.length ? formData.roles : "User"} ${
            userId ? "Updated" : "Created"
          } Successfully!`,
          "success"
        );
        if (userId) {
          // router.push("/dashboard/allusers");
          router.push("/dashboard/allusers?success=User Update Successfully!");
        }
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong!");
        setLoading(false);
        showToast(`Something went wrong!`, "error");
      }
    } catch (err) {
      setError("Something went wrong!!");
      setLoading(false);
      showToast(`Something went wrong!`, "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      roles: [value],
    }));
  };

  // Function to check if password and confirmPassword match
  const doPasswordsMatch = () => {
    return formData.password === formData.confirmPassword;
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

  const showToast = (message, type = "info") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // console.log(formData.roles[0]);

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row pt-5 pb-9 rounded-xl items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
        <div className="w-full space-y-8 mx-10">
          <div className="">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {userId ? "Update" : "Add"} User
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {userId ? "Update" : "Add"} Admin, HR, or User
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* name */}
            <div className="">
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
            <div className="">
              <input
                className={`w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl ${
                  isEmailValid(formData.email)
                    ? "focus:border-[#4C50E8]"
                    : "border-red-500"
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
            {!userId && (
              <div className="">
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
            )}

            {/* confirm password */}
            {!userId && (
              <div className="">
                <input
                  className={`w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl ${
                    formData.confirmPassword !== "" && doPasswordsMatch()
                      ? "focus:border-[#4C50E8]"
                      : "border-red-500"
                  }`}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            {/* Phone number */}
            <div className="">
              <input
                className={`w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl ${
                  isPhoneNumberValid(formData.phoneNumber)
                    ? "focus:border-[#4C50E8]"
                    : "border-red-500"
                }`}
                type="number"
                name="phoneNumber"
                placeholder="Phone Number (must be 11 digit)"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* NID number */}
            <div className="">
              <input
                className={`w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl ${
                  isNIDValid(formData.nid)
                    ? "focus:border-[#4C50E8]"
                    : "border-red-500"
                }`}
                type="number"
                name="nid"
                placeholder="NID Number (must be 10, 13, or 17 digit)"
                value={formData.nid}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* DOB */}
            {!userId && (
              <div className="">
                <input
                  className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-[#4C50E8]"
                  type="date"
                  name="dateOfBirth"
                  placeholder="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  // disabled={userId}
                />
              </div>
            )}

            {/* Role */}
            {!userId && (
              <div className="">
                <select
                  name="role"
                  value={formData.roles}
                  onChange={handleRoleChange}
                  className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-[#4C50E8]"
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="hr">HR</option>
                </select>
              </div>
            )}

            {/* Address */}
            <div className="">
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

            {loading && (
              <p className="">
                <Image
                  src="/loading.gif"
                  alt="Loading Image"
                  width={30}
                  height={30}
                  className="mx-auto"
                />
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="text-[14px] lg:text-[16px] confirmSeats_btn w-full flex justify-center items-center px-10 py-8 relative border uppercase font-semibold tracking-wider leading-none overflow-hidden bg-[#0062ffa6] rounded-md text-white cursor-pointer"
              >
                <span className="absolute inset-0 bg-[#0062ffc2] rounded"></span>
                <span className="absolute inset-0 flex justify-center items-center font-bold">
                  {userId ? "Update" : "Add"}{" "}
                  {formData.roles[0] ? formData.roles[0] : "User"}
                </span>
              </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddUser;
