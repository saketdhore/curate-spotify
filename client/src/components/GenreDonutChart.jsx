import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const GenreDonutChart = ({ topArtists, timeRange, onTimeRangeChange }) => {
  const [tab, setTab] = useState(timeRange);

  const handleTabClick = (range) => {
    setTab(range);
    onTimeRangeChange(range);
  };

  const genreCounts = {};
  topArtists.forEach((artist) => {
    artist.genres.forEach((genre) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });

  const sortedGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const labels = sortedGenres.map(([genre]) => genre);
  const data = sortedGenres.map(([_, count]) => count);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Top Genres",
        data,
        backgroundColor: [
          "#60A5FA",
          "#34D399",
          "#FBBF24",
          "#F87171",
          "#A78BFA",
        ],
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl text-slate-200 font-bold">Top Genres</h2>

      <div className="tabs tabs-boxed">
        <a
          className={`tab text-slate-200 text-lg ${
            tab === "short_term" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("short_term")}
        >
          Last 4 Weeks
        </a>
        <a
          className={`tab text-slate-200 text-lg ${
            tab === "medium_term" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("medium_term")}
        >
          Last 6 Months
        </a>
        <a
          className={`tab text-slate-200 text-lg ${
            tab === "long_term" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("long_term")}
        >
          Last Year
        </a>
      </div>

      <div className="w-96 h-96 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default GenreDonutChart;
