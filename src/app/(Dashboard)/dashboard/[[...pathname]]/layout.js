"use client";

import DashboardHeader from "@/components/DashboardComponent/DashboardHeader/DashboardHeader";
import Sidebar from "@/components/DashboardComponent/Sidebar/Sidebar";

// vercel error when we use export metadata in client component
// export const metadata = {
//   title: "Dashboard",
//   description: "Dashboard Content",
// };

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-[#F5FAF8] min-h-screen">
      <Sidebar />

      {/* Dashboard main content */}
      <main className={`flex-1`}>
        <DashboardHeader />
        {children}
      </main>

      {/* <div class="flex flex-col w-full h-screen">
        <div class="h-1/2 w-full bg-red-500"></div>
        <div class="h-1/2 w-full bg-blue-500"></div>
      </div> */}

      {/* <aside className={`w-80 bg-white border-l`}>
        <p>I am here</p>
      </aside> */}
    </div>
  );
}
