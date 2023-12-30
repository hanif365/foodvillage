"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const ShowAllUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("all");

  useEffect(() => {
    fetchAllUserData();
  }, []);

  const fetchAllUserData = async () => {
    try {
      const response = await fetch(`/api/users`);
      if (!response.ok) {
        return;
      }

      const result = await response.json();
      setAllUsers(result);
      filterUsersByRole(selectedRole, result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const filterUsersByRole = (role, users) => {
    if (role === "all") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) => user.roles && user.roles.length > 0 && user.roles[0] === role
      );
      setFilteredUsers(filtered);
    }
  };

  const handleRoleButtonClick = (role) => {
    setSelectedRole(role);
    filterUsersByRole(role, allUsers);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/users?userId=${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(`User deleted successfully`);
        setAllUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        filterUsersByRole(
          selectedRole,
          allUsers.filter((user) => user._id !== userId)
        );
        showToast(`User deleted successfully!`, "success");
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showToast = (message, type = "info") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="w-full">
      <div className="bg-white pt-5 pb-9 rounded-xl">
        <div className="flex justify-between mx-5 mb-3">
          <h4 className="text-base lg:text-xl 2xl:text-2xl font-bold">
            All Users
          </h4>
          <div className="flex space-x-3 my-3">
            <button
              onClick={() => handleRoleButtonClick("all")}
              className={`border text-sm px-5 py-2 rounded-lg ${
                selectedRole === "all" ? "bg-[#87b9ff4b] text-blue-400" : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleRoleButtonClick("user")}
              className={`border text-sm px-5 py-2 rounded-lg ${
                selectedRole === "user" ? "bg-[#87b9ff4b] text-blue-400" : ""
              }`}
            >
              User
            </button>
            <button
              onClick={() => handleRoleButtonClick("admin")}
              className={`border text-sm px-5 py-2 rounded-lg ${
                selectedRole === "admin" ? "bg-[#87b9ff4b] text-blue-400" : ""
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => handleRoleButtonClick("hr")}
              className={`border text-sm px-5 py-2 rounded-lg ${
                selectedRole === "hr" ? "bg-[#87b9ff4b] text-blue-400" : ""
              }`}
            >
              HR
            </button>
          </div>
        </div>

        {filteredUsers && filteredUsers.length > 0 ? (
          <table className="min-w-full">
            <thead>
              <tr className="text-left">
                <th className="text-sm lg:text-lg font-semibold p-5">Name</th>
                <th className="text-sm lg:text-lg font-semibold p-5">Email</th>
                <th className="text-sm lg:text-lg font-semibold p-5">Phone</th>
                <th className="text-sm lg:text-lg font-semibold p-5">NID</th>
                <th className="text-sm lg:text-lg font-semibold p-5">DOB</th>
                <th className="text-sm lg:text-lg font-semibold p-5">Role</th>
                <th className="text-sm lg:text-lg font-semibold p-5">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={index}
                  className={`h-16 hover:bg-gray-100 cursor-pointer ${
                    index !== filteredUsers.length - 1
                      ? "border-b dark:border-b-[#ffffff0c]"
                      : ""
                  }`}
                >
                  <td className="text-xs lg:text-sm font-semibold p-5">
                    {user?.name}
                  </td>
                  <td className="text-xs lg:text-sm font-semibold p-5">
                    {user?.email}
                  </td>
                  <td className="text-xs lg:text-sm font-semibold p-5">
                    {user?.phoneNumber}
                  </td>
                  <td className="text-xs lg:text-sm font-semibold p-5">
                    {user?.nid}
                  </td>
                  <td className="text-xs lg:text-sm font-semibold p-5">
                    {user?.dateOfBirth
                      ? new Date(user.dateOfBirth).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                  </td>

                  <td className="text-xs lg:text-sm font-semibold p-5">
                    {user?.roles[0]}
                  </td>

                  <td className="text-xs lg:text-sm font-semibold p-5 flex">
                    <Link
                      href={`/dashboard/adduser?userId=${user._id}`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600 block md:inline-block"
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 block md:inline-block"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-lg font-semibold">No user Found!</p>
        )}
      </div>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ShowAllUser;
