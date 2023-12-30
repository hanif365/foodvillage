import React from "react";
import BookingStaticsChart from "./BookingStatisticsChart/BookingStatisticsChart";
import CostStatisticsChart from "./CostStatisticsChart/CostStatisticsChart";
import BookingStatus from "./BookingStatus/BookingStatus";

const DashboardContentLayout = () => {
  return (
    <div className="p-3">
      <BookingStatus />

      <div className="flex flex-col lg:flex-row lg:space-x-3">
        <BookingStaticsChart />
        <CostStatisticsChart />
      </div>
    </div>
  );
};

export default DashboardContentLayout;
