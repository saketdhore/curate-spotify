import NOARTIST from "../assets/no-artist.svg"
const TrackListItem = ({ id, track }) => {

  // Truncate name if it exists and is meaningful
  const rawName = track.name?.trim();
  const hasName = rawName && rawName.length > 0;

  const truncatedName =
    hasName && rawName.length > 30
      ? `${rawName.slice(0, 27)}...`
      : rawName;

  return (
    <li className="list-row flex items-center gap-4 p-2 hover:bg-blue-300 hover:cursor-pointer">
      {/* Cover Image */}
      <div>
        <img
          className="size-15 rounded-box"
          src={track.album?.images?.[0]?.url || NOARTIST}
          alt={hasName ? rawName : "Track Cover"}
        />
      </div>

      {/* Track Info */}
      <div className="list-col-grow flex flex-col overflow-hidden">
        {hasName && (
          <div className="font-medium truncate max-w-xs">
            {truncatedName}
          </div>
        )}
        <div className="text-xs uppercase font-semibold opacity-60 truncate max-w-xs">
          {track.artists?.map(item => item.name).join(", ") || "Unknown Artist"}
        </div>
      </div>

      {/* Action Button */}
      <button className="btn btn-square btn-ghost ml-auto">
        <svg
          className="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <path d="M6 3L20 12 6 21 6 3z"></path>
          </g>
        </svg>
      </button>
    </li>
  );
};

export default TrackListItem;
