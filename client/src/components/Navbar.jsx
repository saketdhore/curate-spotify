import Logo from "./Logo";
import LogIn from "./LogIn";

const Navbar = ({ user, handleLogOut }) => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-2/3 rounded-lg shadow-md shadow-gray-300 bg-white flex justify-between items-center p-4">
      <Logo />
      <LogIn user={user} handleLogOut={handleLogOut} />
    </nav>
  );
};

export default Navbar;
