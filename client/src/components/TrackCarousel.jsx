import { useState } from "react";

const TrackCarousel = ({ topTracks, onTimeRangeChange }) => {
    const [tab, setTab] = useState(0); 
    const handleTabClick = (range) => {
        setTab(range);
        onTimeRangeChange(range);
    }
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl text-slate-200 font-bold">Top Tracks</h2>
      <div className="tabs tabs-boxed">
        <input
          type="radio"
          name="track_tabs"
          className="tab text-slate-200 text-lg"
          aria-label="Last 4 Weeks"
          defaultChecked
          onClick={() => handleTabClick('short_term')}
        />
        <input
          type="radio"
          name="track_tabs"
          className="tab text-slate-200 text-lg"
          aria-label="Last 6 Months"
          onClick={() => handleTabClick('medium_term')}
        />
        <input
          type="radio"
          name="track_tabs"
          className="tab text-slate-200 text-lg"
          aria-label="Last Year"
          onClick={() => handleTabClick('long_term')}
        />
      </div>

      <div className="carousel carousel-vertical rounded-box h-128 w-128 border border-gray-200 shadow">
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

export default TrackCarousel;
