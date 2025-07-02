export const fetchTopArtists = async (time_range = 'short_term', limit=5) => {
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

export const fetchTopTracks = async (time_range = 'short_term', limit=5) => {
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


export const fetchGenreArtists = async (time_range = 'short_term', limit=20) => {
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

export const fetchUser = async () => {
    const res = await fetch('http://127.0.0.1:3000/api/me', {
        credentials: 'include',
    });

    if(res.status === 200){
        const data = await res.json();
        return data.user;
    } else{
        console.log("Error fetching user.");
        return null;
    }
}