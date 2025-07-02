import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ArtistCarousel from './components/ArtistCarousel';
import TrackCarousel from './components/TrackCarousel';
import GenreDonutChart from './components/GenreDonutChart';
import Hero from './components/Hero';
import { fetchTopArtists, fetchTopTracks, fetchUser } from './api.js';
import useTopFetch from './hooks/useTopFetch.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('home');

  const handleTabClick = (active) => {
    setTab(active);
  };

  useEffect(() => {
    const loadUser = async () => {
      const fetchedUser = await fetchUser();
      setUser(fetchedUser);
    };
    loadUser();
  }, []);
  const {
    top: topArtists,
    setTop: setTopArtists,
    timeRange: artistTimeRange,
    setTimeRange: setArtistTimeRange,
    limit: artistLimit,
    setLimit: setArtistLimit
  } = useTopFetch(fetchTopArtists, [], user, 5);

  const {
    top: tracks,
    setTop: setTracks,
    timeRange: trackTimeRange,
    setTimeRange: setTrackTimeRange,
    limit: trackLimit,
    setLimit: setTrackLimit
  } = useTopFetch(fetchTopTracks, [], user, 5);


  const handleLogOut = () => {
    window.location.href = 'http://127.0.0.1:3000/logout';
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-16 px-4 pt-16">
      <Navbar
        user={user}
        handleLogOut={handleLogOut}
        tabActive={tab}
        onTabClick={handleTabClick}
      />

      {tab === 'home' && <Hero user={user} />}

      {user && tab === 'stats' && (
        <div className="flex flex-wrap gap-4 w-full max-w-7xl justify-center">
          <div className="card bg-base-300 rounded-box grid grow place-items-center p-4">
            <ArtistCarousel
              topArtists={topArtists}
              onTimeRangeChange={setArtistTimeRange}
            />
          </div>

          <div className="card bg-base-300 rounded-box grid grow place-items-center p-4">
            <TrackCarousel
              topTracks={tracks}
              onTimeRangeChange={setTrackTimeRange}
            />
          </div>

          <div className="card bg-base-300 rounded-box grid grow place-items-center p-4">
            <GenreDonutChart topArtists={topArtists} timeRange={artistTimeRange} onTimeRangeChange={setArtistTimeRange} />
          </div>
        </div>
      )}
    </main>
  );
}
