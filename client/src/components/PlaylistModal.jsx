import { useRef, useImperativeHandle, forwardRef, useState } from "react";
import TrackListItem from "./TrackListItem";
const PlaylistModal = forwardRef(({ playlist, onClose }, ref) => {
    const dialogRef = useRef(null);
    const [tracks, setTracks] = useState([]);
    const [loadingTracks, setLoadingTracks] = useState(false);
    const getTracks = async () => {
        console.log("Playlist id: ", playlist.id)
        if (playlist?.id) {
            console.log(`Calling backend for playlist ID: ${playlist.id}`);
            setLoadingTracks(prev => !prev);
            try {
                const response = await fetch(`http://127.0.0.1:3000/api/playlist-items?id=${playlist.id}`, {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`Backend returned ${response.status}`);
                }

                const data = await response.json();
                console.log('API response:', data);
                setLoadingTracks(prev => !prev);
                console.log(data.tracks);
                return data.tracks;
            } catch (err) {
                console.error('Error fetching playlist items:', err);
            }
        }
    }
    useImperativeHandle(ref, () => ({
        open: async () => {
            dialogRef.current?.showModal();
            const returnedTracks = await getTracks();
            setTracks(returnedTracks || []);
        },

        close: async () => {
            dialogRef.current.close();
            setTracks([]);
        }
    }));

    const handleClose = () => {
        dialogRef.current?.close();
        onClose();
    };

    const handleBackdropClick = (e) => {
        if (e.target === dialogRef.current) {
            handleClose();
        }
    };

    return (
        <dialog
            ref={dialogRef}
            className="modal backdrop:bg-gray-50 backdrop:opacity-50"
            onClick={handleBackdropClick}
        >
            <div className="modal-box relative bg-white">
                <button
                    onClick={handleClose}
                    className="btn btn-sm btn-ghost absolute right-2 top-2 bg-white hover:bg-red-700"
                >
                    ✕
                </button>

                <div className="bg-gray-50">
                    {playlist && (
                        <>
                            <div className="flex-col items-center gap-4 mb-4">
                                <div className="">
                                    <div>
                                        <img
                                            src={playlist.images?.[0]?.url || '/placeholder-playlist.png'}
                                            alt={playlist.name}
                                            className="rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-2xl">{playlist.name}</h3>
                                        <p className="text-xl text-gray-600">
                                            {playlist.tracks?.total || 0} tracks
                                        </p>
                                    </div>
                                </div>
                                {loadingTracks && <div className="flex align-middle justify-center">
                                    <span className="loading loading-dots loading-xl"></span>
                                </div>
                                }
                                {!loadingTracks &&
                                    <div>
                                        <ul className="list bg-gray-100 rounded-box shadow-md">
                                            {!loadingTracks && tracks.map((item,index)=>{
                                               return <TrackListItem key={index} track = {item.track} id={index+1}/>
                                            })}
                                        </ul>
                                    </div>
                                }
                            </div>
                        </>
                    )}
                </div>
            </div>
        </dialog>
    );
});

PlaylistModal.displayName = 'PlaylistModal';


export default PlaylistModal;
