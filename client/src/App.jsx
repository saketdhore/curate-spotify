import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TopStats from './components/TopStats.jsx';
import UserPlaylistsCarousel from './components/UserPlaylistsCarousel.jsx';
import { fetchUser } from './api.js';

export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('home');

  const handleTabClick = (active) => {
    if (active !== tab) {
      setTab(active);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const fetchedUser = await fetchUser();
      setUser(fetchedUser);
      if (fetchedUser) {
        console.log('User logged in:', fetchedUser);
      }
    };
    loadUser();
  }, []);

  

  const handleLogOut = () => {
    setUser(null);
    window.location.href = 'http://127.0.0.1:3000/logout';
  };

  return (
    <>
      <Navbar
        user={user}
        handleLogOut={handleLogOut}
        tabActive={tab}
        onTabClick={handleTabClick}
      />

      <main className="min-h-screen bg-gray-50 flex flex-col items-center gap-16 px-4 pt-32 md:pt-28">
        {tab === 'home' && <Hero user={user} />}
        {user && tab === 'stats' && <TopStats user={user} />}
        {user && tab === 'playlists' && <UserPlaylistsCarousel />}
      </main>
    </>
  );
}