import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ArtistCarousel from './components/ArtistCarousel';
import TrackCarousel from './components/TrackCarousel';

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [user, setUser] = useState(null);
  const [topArtists, setTopArtists] = useState([]);

  const [artistTimeRange, setArtistTimeRange] = useState('short_term');
  const [trackTimeRange, setTrackTimeRange] = useState('short_term');

  // ✅ Fetch user on mount
  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch('http://127.0.0.1:3000/api/me', {
        credentials: 'include',
      });

      if (res.status === 200) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    };

    checkUser();
  }, []);

  // ✅ Refetch artists when user or artistTimeRange changes
  useEffect(() => {
    const loadTopArtists = async () => {
      const artists = await fetchTopArtists(artistTimeRange);
      setTopArtists(artists);
    };

    if (user) {
      loadTopArtists();
    }
  }, [artistTimeRange, user]);

  // ✅ Refetch tracks when user or trackTimeRange changes
  useEffect(() => {
    const loadTopTracks = async () => {
      const tracks = await fetchTopTracks(trackTimeRange);
      setTracks(tracks);
    };

    if (user) {
      loadTopTracks();
    }
  }, [trackTimeRange, user]);

  // ✅ Logout
  const handleLogOut = () => {
    window.location.href = 'http://127.0.0.1:3000/logout';
  };

  // ✅ Reusable fetchers
  const fetchTopTracks = async (time_range = 'short_term', limit = 5) => {
    const res = await fetch(
      `http://127.0.0.1:3000/api/top-tracks?time_range=${time_range}&limit=${limit}`,
      {
        credentials: 'include',
      }
    );

    if (res.status === 200) {
      const data = await res.json();
      return data.items || [];
    } else {
      console.log('Error fetching tracks.');
      return [];
    }
  };

  const fetchTopArtists = async (time_range = 'short_term', limit = 5) => {
    const res = await fetch(
      `http://127.0.0.1:3000/api/top-artists?time_range=${time_range}&limit=${limit}`,
      {
        credentials: 'include',
      }
    );

    if (res.status === 200) {
      const data = await res.json();
      return data.items || [];
    } else {
      console.log('Error fetching artists.');
      return [];
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-16 px-4 pt-48">
      <Navbar user={user} handleLogOut={handleLogOut} />
      {user && (
        <div className="flex w-full max-w-5xl items-center justify-center">
          <div className="card bg-base-300 rounded-box grid grow place-items-center p-4">
            <ArtistCarousel
              topArtists={topArtists}
              onTimeRangeChange={setArtistTimeRange}
            />
          </div>

          <div className="divider divider-horizontal bg-slate-800"></div>

          <div className="card bg-base-300 rounded-box grid grow place-items-center p-4">
            <TrackCarousel
              topTracks={tracks}
              onTimeRangeChange={setTrackTimeRange}
            />
          </div>
        </div>
      )}
    </main>
  );
}
