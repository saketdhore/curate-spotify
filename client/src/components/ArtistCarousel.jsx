import { useState } from "react";
const ArtistCarousel = ({ topArtists, onTimeRangeChange }) => {
  const [tab, setTab] = useState(0);
  const handleTabClick = (range) => {
    setTab(range);
    onTimeRangeChange(range);
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl text-slate-200 font-bold">Top Artists</h2>
      <div className="tabs tabs-boxed">
        <input
          type="radio"
          name="artist_tabs"
          className="tab text-slate-200 text-lg"
          aria-label="Last 4 Weeks"
          defaultChecked
          onClick={() => handleTabClick('short_term')}
        />
        <input
          type="radio"
          name="artist_tabs"
          className="tab text-slate-200 text-lg"
          aria-label="Last 6 Months"
          onClick={() => handleTabClick('medium_term')}
        />
        <input
          type="radio"
          name="artist_tabs"
          className="tab text-slate-200 text-lg"
          aria-label="Last Year"
          onClick={() => handleTabClick('long_term')}
        />
      </div>

      <div className="carousel carousel-vertical rounded-box h-128 w-128 border border-gray-200 shadow">
        {topArtists.map((artist, index) => (
          <div
            key={artist.id}
            className="carousel-item h-full relative group cursor-pointer"
          >
            <img
              src={artist.images?.[0]?.url}
              alt={artist.name}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2">#{index + 1}</div>
                <div className="text-4xl font-medium px-4">{artist.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistCarousel;
