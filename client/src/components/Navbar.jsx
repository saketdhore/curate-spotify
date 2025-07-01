import Logo from "./Logo";
import LogIn from "./LogIn";

const Navbar = ({ user, handleLogOut, tabActive, onTabClick }) => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-2/3 rounded-lg shadow-md shadow-gray-300 bg-white flex justify-between items-center p-4">
      <Logo onTabClick={onTabClick}/>

      <div className="flex justify-center items-center gap-8">
        {/* Stats tab */}
        <div onClick={()=>onTabClick('stats')}
          className={`p-3 rounded-4xl tilt-neon-title w-32 text-black text-2xl text-center border-neutral-950 border-2 hover:cursor-pointer ${
            tabActive === "stats" ? "bg-black text-white" : ""
          }`}
        >
          <p>Stats</p>
        </div>

        {/* Playlist tab */}
        <div onClick={()=>onTabClick('playlist')}
          className={`p-3 rounded-4xl tilt-neon-title w-32 text-center text-black text-2xl border-neutral-950 border-2 hover:cursor-pointer ${
            tabActive === "playlist" ? "bg-black text-white" : ""
          }`}
        >
          <p>Playlist</p>
        </div>

        <LogIn user={user} handleLogOut={handleLogOut} />
      </div>
    </nav>
  );
};

export default Navbar;
