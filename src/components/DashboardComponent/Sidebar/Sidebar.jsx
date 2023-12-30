"use client";

import React, { useEffect, useState } from "react";
import { RiDashboardFill, RiSettings5Fill } from "react-icons/ri";
import { BiHelpCircle } from "react-icons/bi";
import { MdLogout, MdRestaurant } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FcHome } from "react-icons/fc";
import { useTheme } from "next-themes";
import {
  BsFillPersonCheckFill,
  BsFillPersonFill,
  BsMoon,
  BsSun,
} from "react-icons/bs";
import {
  FaHeart,
  FaPersonWalkingLuggage,
  FaStar,
  FaUser,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa6";
import useStore from "@/store/store";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const { isSidebarCollapsed } = useStore();
  const pathName = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  console.log(theme);
  const session = useSession();
  const userEmail = session?.data?.user?.email
  console.log(userEmail);

  const [userRole, setUserRole] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user?userEmail=${userEmail}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        console.log("User Data: ", data);
        console.log("User Role: ", data.roles[0]);
        setUserRole(data.roles[0]);
        // setUserData(data);
      } catch (error) {
        // setError(error.message);
      }
    };

    fetchUserData();
  }, [userEmail]);


  console.log("User Role from outside: ", userRole);

  const menuItems = [
    {
      id: "dashboard",
      label: `${userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : ''} Dashboard`,
      path: "/dashboard",
      icon: <RiDashboardFill size={25} />,
    },
    {
      id: "adduser",
      label: "Add User",
      path: "/dashboard/adduser",
      icon: <FaUserPlus size={25} />,
      condition: userRole === 'admin',
      // condition: true,
    },
    {
      id: "allusers",
      label: "All Users",
      path: "/dashboard/allusers",
      icon: <FaUsers size={25} />,
      condition: userRole === 'admin' || userRole === 'hr',
    },
    {
      id: "mybooking",
      label: "My Booking",
      path: "/dashboard/mybooking",
      icon: <MdRestaurant size={25} />,
    },
    {
      id: "myprofile",
      label: "My Profile",
      path: "/dashboard/myprofile",
      icon: <BsFillPersonCheckFill size={25} />,
    },
    // {
    //   id: "myreview",
    //   label: "My Review",
    //   path: "/dashboard/myreview",
    //   icon: <FaStar size={25} />,
    // },
    // {
    //   id: "wishlist",
    //   label: "Wishlist",
    //   path: "/dashboard/wishlist",
    //   icon: <FaHeart size={25} />,
    // },
    {
      id: "setting",
      label: "Setting",
      path: "/dashboard/setting",
      icon: <RiSettings5Fill size={25} />,
    },
    {
      id: "divider",
      isDivider: true,
    },
    // {
    //   id: "help",
    //   label: "Help",
    //   path: "/dashboard/help",
    //   icon: <BiHelpCircle size={25} />,
    // },
    {
      id: "logout",
      label: "Log Out",
      path: "/dashboard/logout",
      icon: <MdLogout size={25} />,
    },
  ];

  const getLastWord = (path) => {
    const pathParts = path.split("/");
    return pathParts[pathParts.length - 1];
  };

  const currentPath = getLastWord(pathName);

  const handlenavigate = (getMenuItem) => {
    if (getMenuItem.id === "logout") {
      signOut();
      return;
    }
    router.push(getMenuItem.path);
  };

  return (
    <aside
      className={`hidden lg:block max-h-screen sticky top-0 overflow-y-auto dark:bg-[#1C1C25] dark:border-none bg-white ${
        isSidebarCollapsed ? "w-24" : "w-72"
      }`}
    >
      <Link href="/" className="flex pb-0 px-3 lg:px-6 pt-5">
        <Image
          src={
            isSidebarCollapsed
              ? "/logo3.png"
              : theme === "dark"
              ? "/logo2.png"
              : "/logo2.png"
          }
          alt="Profile Photo"
          width={1020}
          height={1020}
          className="mx-auto rounded-md hidden md:block cursor-pointer"
        />

        <Image
          src={
            isSidebarCollapsed
              ? "/logo3.png"
              : theme === "dark"
              ? "/logo2.png"
              : "/logo2.png"
          }
          alt="Profile Photo"
          width={1020}
          height={1020}
          className="rounded-xl block md:hidden cursor-pointer"
        />
      </Link>

      <div className="flex flex-col">
        <nav className="mt-3 py-4 px-4 lg:mt-3 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {menuItems.map((menuItem) => (
                <li key={menuItem.id}>
                  {menuItem.isDivider ? (
                    <hr
                      className={`my-10 border-t-2 border-gray-200 ${
                        isSidebarCollapsed ? "mx-0" : "mx-5"
                      } `}
                    />
                  ) : (
                    menuItem.condition !== undefined ? (
                      menuItem.condition && (
                        <div
                          onClick={() => handlenavigate(menuItem)}
                          className={`group  cursor-pointer flex items-center gap-2.5 rounded-lg py-3 font-medium ${
                            isSidebarCollapsed ? "px-0" : "px-8"
                          }
                                 ${
                                   currentPath.includes(menuItem.id)
                                     ? "dark:bg-[#062141] bg-[#D5E6FB] text-[#0060FF]"
                                     : "dark:hover:bg-[#0621413a] hover:bg-[#d5e6fb62] hover:text-[#0062ffb9]"
                                 }
                                `}
                        >
                          <div
                            className={`${
                              isSidebarCollapsed
                                ? "mx-auto"
                                : "mx-0"
                            } `}
                          >
                            {menuItem.icon}
                          </div>
                          <p
                            className={`${
                              isSidebarCollapsed ? "hidden" : "hidden lg:block"
                            } font-bold`}
                          >
                            {menuItem.label}
                          </p>
                        </div>
                      )
                    ) : (
                      <div
                        onClick={() => handlenavigate(menuItem)}
                        className={`group  cursor-pointer flex items-center gap-2.5 rounded-lg py-3 font-medium ${
                          isSidebarCollapsed ? "px-0" : "px-8"
                        }
                               ${
                                 currentPath.includes(menuItem.id)
                                   ? "dark:bg-[#062141] bg-[#D5E6FB] text-[#0060FF]"
                                   : "dark:hover:bg-[#0621413a] hover:bg-[#d5e6fb62] hover:text-[#0062ffb9]"
                               }
                              `}
                      >
                        <div
                          className={`${
                            isSidebarCollapsed
                              ? "mx-auto"
                              : "mx-0"
                          } `}
                        >
                          {menuItem.icon}
                        </div>
                        <p
                          className={`${
                            isSidebarCollapsed ? "hidden" : "hidden lg:block"
                          } font-bold`}
                        >
                          {menuItem.label}
                        </p>
                      </div>
                    )
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
