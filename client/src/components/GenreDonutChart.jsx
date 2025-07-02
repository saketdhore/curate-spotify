import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, memo } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const GenreDonutChart = ({ topGenreArtists, timeRange, onTimeRangeChange }) => {
  const [tab, setTab] = useState(timeRange);

  const handleTabClick = (range) => {
    setTab(range);
    onTimeRangeChange(range);
  };

  // Count all genres
  const genreCounts = {};
  topGenreArtists.forEach((artist) => {
    artist.genres.forEach((genre) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });

  // Sort descending by count
  const sortedGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);
  console.log(sortedGenres);

  // Take top 4 genres
  const topN = 4;
  const topGenres = sortedGenres.slice(0, topN);
  
  // Calculate "Others" average count
  const remainingGenres = sortedGenres.slice(topN);
  const remainingTotalCount = remainingGenres.reduce((sum, [_, count]) => sum + count, 0);
  const othersAverageCount = remainingGenres.length > 0 ? remainingTotalCount / remainingGenres.length : 0;

  const labels = topGenres.map(([genre]) => genre);
  const weights = topGenres.map(([_, count]) => count);

  if (othersAverageCount > 0) {
    labels.push("Others");
    weights.push(othersAverageCount);
  }

  // Calculate total weight and convert to percentages
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  const percentages = weights.map(weight => 
    ((weight / totalWeight) * 100).toFixed(1)
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Genre Distribution",
        data: percentages,
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

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            const index = context.dataIndex;
            const weight = weights[index];
            const displayCount = index < topGenres.length ? Math.round(weight) : `avg ${weight.toFixed(1)}`;
            return `${value}%`;
          },
        },
      },
      legend: {
        labels: {
          color: 'black',
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl text-black font-bold">Top Genres</h2>

      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          className={`px-4 py-2 rounded-md text-black font-medium transition-colors ${
            tab === 'short_term' ? 'bg-gray-300' : 'hover:bg-gray-200'
          }`}
          onClick={() => handleTabClick('short_term')}
        >
          Last 4 Weeks
        </button>
        <button
          className={`px-4 py-2 rounded-md text-black font-medium transition-colors ${
            tab === 'medium_term' ? 'bg-gray-300' : 'hover:bg-gray-200'
          }`}
          onClick={() => handleTabClick('medium_term')}
        >
          Last 6 Months
        </button>
        <button
          className={`px-4 py-2 rounded-md text-black font-medium transition-colors ${
            tab === 'long_term' ? 'bg-gray-300' : 'hover:bg-gray-200'
          }`}
          onClick={() => handleTabClick('long_term')}
        >
          Last Year
        </button>
      </div>

      <div className="w-96 h-96 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default memo(GenreDonutChart);