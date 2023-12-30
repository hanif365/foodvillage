import useStore from "@/store/store";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";
import { TfiClose } from "react-icons/tfi";

const UserProfile = () => {
  const { closeDashboardHeaderMenu } = useStore((state) => state);
  const router = useRouter();
  const session = useSession();

  const userProfileData = [
    {
      icon: <RiDashboardFill />,
      title: "Dashboard",
      desc: "Dashboard Management",
      path: "/dashboard",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
    },
    // {
    //   icon: <FaUsers />,
    //   title: "All Users",
    //   desc: "Show all Users",
    //   path: "/dashboard/allusers",
    //   iconColor: "rgb(0, 194, 146)",
    //   iconBg: "rgb(235, 250, 242)",
    // },
    {
      icon: <BsFillPersonCheckFill />,
      title: "My Profile",
      desc: "Account Settings",
      path: "/dashboard/myprofile",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
    },
  ];

  const handlenavigate = (item) => {
    closeDashboardHeaderMenu();
    router.push(item.path);
  };
  return (
    <div className="absolute right-1 top-16 bg-white  p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <button
          className="p-3 cursor-pointer rounded-full hover:text-white hover:bg-red-400"
          type="button"
          onClick={() => closeDashboardHeaderMenu()}
        >
          <TfiClose className="w-6 h-6 " />
        </button>
      </div>
      <div className="flex gap-5 items-center mt-6 border-gray-200 border-b pb-6">
        <Image
          src={session?.data?.user.image || "/dummy_profile.jpg"}
          alt="profile_photo icon"
          width={90}
          height={90}
          className="rounded-full"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
          {session?.data?.user.name.split(" ").pop()}
          </p>
          {/* <p className="text-gray-500 text-sm dark:text-gray-400">
            Software Engineer
          </p> */}
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
          {session?.data?.user.email}
          </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b border-gray-100 p-4 hover:bg-gray-50 cursor-pointer  dark:hover:bg-[#42464D]"
            onClick={() => handlenavigate(item)}
          >
            <div
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 self-center"
            >
              {item.icon}
            </div>

            <div className="self-center">
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <button
          className="text-xl text-white bg-red-500 hover:bg-red-600 py-3 w-full rounded-lg"
          // to set dashboardMenuInitialState means all state will be false
          onClick={() => {
            closeDashboardHeaderMenu();
            signOut();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
