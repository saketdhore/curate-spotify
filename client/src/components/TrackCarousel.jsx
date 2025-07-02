import { useState, memo } from "react";

const TrackCarousel = ({ topTracks, onTimeRangeChange }) => {
  const [tab, setTab] = useState('short_term');
  
  const handleTabClick = (range) => {
    setTab(range);
    onTimeRangeChange(range);
  }
  
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl text-black font-bold">Top Tracks</h2>
      
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

      <div className="carousel carousel-vertical rounded-box h-96 w-96 border border-gray-200 shadow">
        {topTracks.map((track, index) => (
          <div
            key={track.id}
            className="carousel-item h-full relative group cursor-pointer"
          >
            <img
              src={track.album?.images?.[0]?.url}
              alt={track.name}
              className="object-cover w-full h-full"
            />

            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <div className="text-4xl font-bold mb-2">#{index + 1}</div>
                <div className="text-2xl font-semibold mb-1">{track.name}</div>
                <div className="text-lg font-normal">
                  {track.artists?.map((artist) => artist.name).join(', ')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(TrackCarousel);