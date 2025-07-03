import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import DEFAULT_PROFILE from "../assets/profile-heart-black.svg";

const LogIn = ({ user, handleLogOut }) => {
  if (!user) {
    return (
      <a
        href="http://127.0.0.1:3000/login"
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-8 border-b-4 border-blue-700 hover:border-blue-500 rounded-3xl mt-2"
      >
        Log In
      </a>
    );
  }

  return (
    <DropdownMenu className="z-1000">
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 outline-none">
          <img
            src={DEFAULT_PROFILE}
            alt="Profile"
            className="w-12 h-12 mr-4"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-40 rounded-md border border-gray-200 bg-white p-2 shadow-md"
      >
        <DropdownMenuLabel className="px-2 py-1 text-gray-700 text-lg">Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogOut}
          className="text-red-600 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded text-lg"
        >
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LogIn;
