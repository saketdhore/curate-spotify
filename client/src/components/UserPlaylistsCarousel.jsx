import { useState, memo, useRef} from 'react';
import PLUS from '../assets/plus-square.svg';
import PlaylistModal from './PlaylistModal';
const UserPlaylistsCarousel = () => {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const modalRef = useRef();
    const handlePlaylistClick = (playlist) => {
        setSelectedPlaylist(playlist);
        modalRef.current?.open();
    };

    const handleCloseModal = () => {
        setSelectedPlaylist(null);
    };
    const handleImportPlaylists = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:3000/api/import-all-playlists', {
                credentials: 'include'
            });
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            if (response.status === 403) {
                window.location.href = 'http://127.0.0.1:3000/login/playlists';
                return;
            }

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            // Check content type before parsing JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const responseText = await response.text();
                console.error('Non-JSON response:', responseText);
                throw new Error('Server returned non-JSON response');
            }

            const data = await response.json();
            setPlaylists(data.playlists);
        } catch (err) {
            setError(err.message);
            console.error('Error importing playlists:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="carousel rounded-box mt-8 w-2/3 shadow-2xl">
            {/* Import Playlists Card - Always first item */}
            {playlists.length === 0 && (
                <div className="carousel-item">
                    <div
                        onClick={handleImportPlaylists}
                        className="w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center cursor-pointer hover:from-gray-200 hover:to-gray-300 transition-all duration-300 rounded-lg border-2 border-dashed border-gray-400 hover:border-gray-500"
                    >
                        {loading ? (
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
                                <p className="mt-4 text-gray-600 font-medium">Loading...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <img
                                    src={PLUS}
                                    alt="Import playlists"
                                    className="w-16 h-16 mb-4 opacity-70 hover:opacity-100 transition-opacity"
                                />
                                <p className="text-gray-700 font-semibold text-center px-4">
                                    Import your playlists
                                </p>
                                {error && (
                                    <p className="text-red-500 text-sm mt-2 text-center px-2">
                                        {error}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {playlists.map((playlist) => (
                <div key={playlist.id} className="carousel-item relative group">
                    <img
                        src={playlist.images?.[0]?.url || '/placeholder-playlist.png'}
                        alt={playlist.name}
                        className="w-64 h-64 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        title={playlist.name}
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-75 transition-opacity duration-300 flex items-center justify-center hover:cursor-pointer" onClick={()=>handlePlaylistClick(playlist)}>
                        <div className="text-center text-white px-4">
                            <div className="text-xl font-semibold">{playlist.name}</div>
                            <div className="text-sm mt-2 opacity-90 ">
                                {playlist.tracks.total} tracks
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <PlaylistModal ref={modalRef} playlist={selectedPlaylist} onClose={handleCloseModal}/>
        </div>
    );
};

export default memo(UserPlaylistsCarousel);