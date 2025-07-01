import DJ_LOGO from "../assets/dj-logo.svg";

const Logo = () => {
  return (
    <div className="flex flex-row items-center gap-2 hover:shadow-md hover:shadow-gray-400 hover:cursor-pointer transition-shadow duration-200 p-2 rounded">
      <img src={DJ_LOGO} alt="DJ svg" className="w-16 h-16" />
      <p className="tilt-neon-title text-3xl">
        Curate.ai
      </p>
    </div>
  );
};

export default Logo;
