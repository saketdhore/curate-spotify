require('dotenv').config();
const express = require('express');
const axios = require('axios');
const qs = require('qs');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());

app.use(cors({
  origin: 'http://127.0.0.1:5173',  // Vite dev server default
  credentials: true
}));

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

let access_token = ''; // TEMP: store in memory for now

app.get('/login', (req, res) => {
  const scope = 'user-read-recently-played user-top-read';
  const authURL = `https://accounts.spotify.com/authorize?` +
    `response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scope)}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

  res.redirect(authURL);
});


app.get('/callback', async (req, res) => {
  const code = req.query.code;

  const response = await axios.post('https://accounts.spotify.com/api/token',
    qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  const token = response.data.access_token;

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 3600 * 1000
  });

  // Redirect user back to frontend
  res.redirect('http://127.0.0.1:5173/');
});

app.get('/api/me', async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ user: null });
  }

  try {
    const response = await axios.get(
      'https://api.spotify.com/v1/me',
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.json({ user: response.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(401).json({ user: null });
  }
});

app.get('/logout', (req, res) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
  });
  res.redirect('http://127.0.0.1:5173/');
});

app.get('/api/top-tracks', async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).send('Not authenticated');
  }

  const time_range = req.query.time_range || 'short_term';
  const limit = req.query.limit || 5;

  try {
    const response = await axios.get(
      'https://api.spotify.com/v1/me/top/tracks',
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          time_range,
          limit
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('Error fetching top tracks.');
  }
});

app.get('/api/top-artists', async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).send('Not authenticated');
  }

  const time_range = req.query.time_range || 'short_term';
  const limit = req.query.limit || 5;

  try {
    const response = await axios.get(
      'https://api.spotify.com/v1/me/top/artists',
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          time_range,
          limit
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('Error fetching top artists.');
  }
});



app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));
