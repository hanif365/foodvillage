"use client";

import AddUserContentLayout from "@/components/DashboardComponent/AddUserContentLayout/AddUserContentLayout";
import AllUsersContentLayout from "@/components/DashboardComponent/AllUsersContentLayout/AllUsersContentLayout";
import DashboardContentLayout from "@/components/DashboardComponent/DashboardContentLayout/DashboardContentLayout";
import MyBookingContentLayout from "@/components/DashboardComponent/MyBookingContentLayout/MyBookingContentLayout";
import MyProfileContentLayout from "@/components/DashboardComponent/MyProfileContentLayout/MyProfileContentLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = ({ params }) => {
  const path = params?.pathname ? params?.pathname[0] : "/";
  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated") {
    router?.push("/login");
  }

  let content = null;
  switch (path) {
    case "/":
      content = <DashboardContentLayout />;
      break;

    case "adduser":
      content = <AddUserContentLayout />;
      break;

    case "allusers":
      content = <AllUsersContentLayout />;
      break;

    case "mybooking":
      content = <MyBookingContentLayout />;
      break;

    case "myprofile":
      content = <MyProfileContentLayout />;
      break;

    case "myreview":
      content = (
        <>
          <h1 className="text-2xl font-semibold">myreview Page</h1>
          <p>This is the content of Link 2 page.</p>
        </>
      );
      break;

    case "wishlist":
      content = (
        <>
          <h1 className="text-2xl font-semibold">wishlist Page</h1>
          <p>This is the content of Link 2 page.</p>
        </>
      );
      break;

    case "setting":
      content = (
        <div className="p-3">
          <h1 className="">Coming soon...</h1>
        </div>
      );
      break;

    case "help":
      content = (
        <>
          <h1 className="text-2xl font-semibold">help Page</h1>
          <p>This is the content of Link 2 page.</p>
        </>
      );
      break;

    default:
      content = (
        <>
          <h1 className="text-2xl font-semibold">Dashboard Default page</h1>
          <p>(when route is /dashboard/123)</p>
        </>
      );
  }

  if (session.status === "authenticated") {
    return (
      <div>
        <div className="">{content}</div>
      </div>
    );
  }
};

export default Dashboard;
