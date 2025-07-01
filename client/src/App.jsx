import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch('http://127.0.0.1:3000/api/me', {
        credentials: 'include'
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
  const handleLogOut = () => {
  window.location.href = 'http://127.0.0.1:3000/logout';
};


  const getTopTracks = async () => {
    const res = await fetch('http://127.0.0.1:3000/api/top-tracks', {
      credentials: 'include'
    });
    const data = await res.json();
    setTracks(data.items || []);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 pt-48">
      <Navbar user={user} handleLogOut={handleLogOut} />
    </main>
  );
}
