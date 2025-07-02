import useTopFetch from '../hooks/useTopFetch.jsx'
import ArtistCarousel from './ArtistCarousel';
import TrackCarousel from './TrackCarousel';
import GenreDonutChart from './GenreDonutChart';
import { fetchTopArtists, fetchTopTracks, fetchGenreArtists } from '../api.js';
import { useCallback } from 'react';
const TopStats = ({ user }) => {
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

    const {
        top: topGenreArtists,
        setTop: setTopGenre,
        timeRange: genreTimeRange,
        setTimeRange: setGenreTimeRange,
        limit: genreLimit,
        setLimit: setGenreLimit
    } = useTopFetch(fetchGenreArtists, [], user, 20);

    const handleArtistTimeRangeChange = useCallback((range) => {
        setArtistTimeRange(range);
    }, [setArtistTimeRange]);
    const handleTrackTimeRangeChange = useCallback((range) => {
        setTrackTimeRange(range);
    }, [setTrackTimeRange]);
    const handleGenreTimeRangeChange = useCallback((range) => {
        setGenreTimeRange(range);
    },[setGenreTimeRange]);
    return (
        <div className="flex flex-wrap gap-4 mt-8 w-full max-w-7xl justify-center">
            <div className="card bg-gray-50 shadow-2xl rounded-box grid grow place-items-center p-4">
                <ArtistCarousel
                    topArtists={topArtists}
                    onTimeRangeChange={handleArtistTimeRangeChange}
                />
            </div>

            <div className="card bg-gray-50 shadow-2xl rounded-box grid grow place-items-center p-4">
                <TrackCarousel
                    topTracks={tracks}
                    onTimeRangeChange={handleTrackTimeRangeChange}
                />
            </div>

            <div className="card bg-gray-50 shadow-2xl rounded-box grid grow place-items-center p-4">
                <GenreDonutChart topGenreArtists={topGenreArtists} timeRange={genreTimeRange} onTimeRangeChange={handleGenreTimeRangeChange} />
            </div>
        </div>
    )
}

export default TopStats;