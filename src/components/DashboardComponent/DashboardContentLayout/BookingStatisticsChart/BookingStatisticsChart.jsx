import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const currentMonthIndex = new Date().getMonth();

const dataValues = [15, 8, 10, 6, 14, 8, 10, 8, 5, 6, 10, 13];

const highlightColor = "#A3CCFF"; // Choose a highlight color for the running month

const data = {
  labels,
  datasets: [
    {
      data: dataValues,
      backgroundColor: labels.map((_, index) =>
        index === currentMonthIndex ? highlightColor : "#D5E6FB"
      ),
      borderRadius: 5,
    },
  ],
};

const BookingStatisticsChart = () => {
  return (
    <div className="mt-3 p-3 bg-white rounded-lg shadow-sm w-full lg:w-1/2">
      <h4 className="text-lg pb-5">Booking Statistics</h4>
      <div className="">
        <Bar options={options} data={data} className="" />
      </div>
    </div>
  );
};

export default BookingStatisticsChart;
