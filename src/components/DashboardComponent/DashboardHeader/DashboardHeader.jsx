import Image from "next/image";
import React from "react";
import { FaBars, FaChevronDown } from "react-icons/fa6";
import { LuBellDot } from "react-icons/lu";
import UserProfile from "./UserProfile/UserProfile";
import Notification from "./Notification/Notification";
import useStore from "@/store/store";
import { useSession } from "next-auth/react";

const DashboardHeader = () => {
  const {
    toggleSidebar,
    setIsDashboardHeaderMenuClicked,
    isDashboardHeaderMenuClicked,
  } = useStore((state) => state);
  const session = useSession();
  return (
    <div
      className={`p-4 sticky top-0 flex justify-end lg:justify-between dark:bg-[#1C1C25] bg-white `}
    >
      <div
        onClick={toggleSidebar}
        className="self-center hidden lg:block cursor-pointer rounded-full p-3 hover:bg-gray-50"
      >
        <FaBars size={25} />
      </div>

      <div className="self-center">
        <div className="flex ">
          {/* <div className="self-center pr-6">
            <Image
              src="/message_notification_icon.png"
              alt="message_notification_icon"
              width={25}
              height={25}
              className="cursor-pointer"
            />
          </div> */}

          <div className="self-center pr-6">
            <LuBellDot
              className={`w-6 h-6 dark:text-[#ffffff] text-[#0060FF] cursor-pointer `}
              onClick={() => setIsDashboardHeaderMenuClicked("notification")}
            />
          </div>

          {/* User Profile Section */}
          <div
            className={`flex justify-evenly cursor-pointer self-center hover:dark:bg-[#131313] hover:bg-gray-50 lg:py-2 lg:px-4 rounded-xl`}
            onClick={() => setIsDashboardHeaderMenuClicked("userProfile")}
          >
            <Image
              src={session?.data?.user.image || "/dummy_profile.jpg"}
              alt="profile_photo icon"
              width={40}
              height={40}
              className="rounded-full"
            />

            <div className="self-center pl-3 hidden lg:block">
              <h5 className="text-sm text-gray-400 whitespace-nowrap">
                Hi,{" "}
                <span className="font-bold">
                  {session?.data?.user.name.split(" ").pop()}
                </span>
              </h5>
            </div>
            <div className="pl-2 self-center hidden lg:block">
              <FaChevronDown className="w-3 h-6 text-gray-400" />
            </div>
          </div>
          {/* here will be User Profile */}
          {isDashboardHeaderMenuClicked.userProfile && <UserProfile />}
          {isDashboardHeaderMenuClicked.notification && <Notification />}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
