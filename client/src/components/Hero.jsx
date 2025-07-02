import DJ_LOGO from "../assets/dj-logo.svg";
import SPOTIFY_LOGO from "../assets/spotify-logo.svg";

const Hero = ({ user }) => {
    return (
        <div className="hero bg-gray-50 w-2/3 pl-4 pr-4 pb-8 pt-8 mt-8 rounded-lg">
            <div className="hero-content flex-col lg:flex-row">
                <img src={DJ_LOGO} className="max-w-sm rounded-lg shadow-2xl mr-12" />
                <div>
                    <h1 className="text-5xl font-bold sour-gummy-title">Discover your music!</h1>
                    <p className="text-lg py-6 font-cherry-cream-soda-regular">
                        This AI-powered curator reveals your top tracks, artists, and genres. <br/>Dive into your listening trends and create playlists that truly reflect your taste.
                    </p>
                    {user === null && <a
                        href="http://127.0.0.1:3000/login"
                        className="flex items-center gap-2 bg-none w-1/2 hover:bg-green-300 text-neutral-950 font-bold py-3 px-6 rounded-full shadow transition"
                    >
                        <img src={SPOTIFY_LOGO} alt="Spotify Logo" className="w-12 h-12" />
                        Log in with Spotify
                    </a>}

                </div>
            </div>
        </div>
    );
};

export default Hero;
