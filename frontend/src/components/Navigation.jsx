import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api";

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await api.post("/users/logout");
      logout(); // Clear user state in AuthContext
      // Optionally redirect to home or login page after logout
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-emerald-600">
              WellnessHub
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                to="/dashboard"
                className={`transition duration-200 ${
                  isActive("/dashboard")
                    ? "text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-1"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/my-sessions"
                className={`transition duration-200 ${
                  isActive("/my-sessions")
                    ? "text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-1"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                My Sessions
              </Link>
              <Link
                to="/session-editor"
                className={`transition duration-200 ${
                  isActive("/session-editor")
                    ? "text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-1"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                Create Session
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
