import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Navbar() {

    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
            <div>
                <h1 className="text-white text-xl font-bold">
                    DeviceLab Portal
                </h1>
            </div>

            <div className="flex items-center gap-6">
                <Link
                    to="/"
                    className="text-zinc-300 hover:text-white transition"
                >
                    Dashboard
                </Link>

                <Link
                    to="/projects"
                    className="text-zinc-300 hover:text-white transition"
                >
                    Projects
                </Link>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );


}