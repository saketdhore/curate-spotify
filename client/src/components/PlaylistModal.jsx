import { useRef, useImperativeHandle, forwardRef } from "react";

const PlaylistModal = forwardRef(({ playlist, onClose }, ref) => {
  const dialogRef = useRef(null);
  useImperativeHandle(ref, () => ({
    open: async () => {
      dialogRef.current?.showModal();
      console.log("Playlist id: ", playlist.id)
      if (playlist?.id) {
        console.log(`Calling backend for playlist ID: ${playlist.id}`);
        try {
          const response = await fetch(`http://127.0.0.1:3000/api/playlist-items?id=${playlist.id}`, {
            credentials: 'include'
          });

          if (!response.ok) {
            throw new Error(`Backend returned ${response.status}`);
          }

          const data = await response.json();
          console.log('API response:', data);
        } catch (err) {
          console.error('Error fetching playlist items:', err);
        }
      }
    },
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
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <img
                    src={playlist.images?.[0]?.url || '/placeholder-playlist.png'}
                    alt={playlist.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-2xl">{playlist.name}</h3>
                  <p className="text-xl text-gray-600">
                    {playlist.tracks?.total || 0} tracks
                  </p>
                </div>
              </div>

              <div className="modal-action">
                <button className="btn btn-primary">Play Playlist</button>
                <button onClick={handleClose} className="btn">Close</button>
              </div>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
});


export default PlaylistModal;
