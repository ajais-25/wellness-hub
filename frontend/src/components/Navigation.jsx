import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import api from "../api";

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-emerald-600 flex-shrink-0"
            >
              WellnessHub
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                to="/dashboard"
                className={`transition duration-200 text-sm lg:text-base ${
                  isActive("/dashboard")
                    ? "text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-1"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/my-sessions"
                className={`transition duration-200 text-sm lg:text-base ${
                  isActive("/my-sessions")
                    ? "text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-1"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                My Sessions
              </Link>
              <Link
                to="/session-editor"
                className={`transition duration-200 text-sm lg:text-base ${
                  isActive("/session-editor")
                    ? "text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-1"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                Create Session
              </Link>
            </div>
          </div>

          {/* Desktop User Info and Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 lg:px-4 py-2 rounded-lg transition duration-200 cursor-pointer text-sm lg:text-base"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-emerald-600 transition duration-200 p-2"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/dashboard"
                onClick={closeMobileMenu}
                className={`transition duration-200 px-2 py-1 rounded ${
                  isActive("/dashboard")
                    ? "text-emerald-600 font-semibold bg-emerald-50"
                    : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/my-sessions"
                onClick={closeMobileMenu}
                className={`transition duration-200 px-2 py-1 rounded ${
                  isActive("/my-sessions")
                    ? "text-emerald-600 font-semibold bg-emerald-50"
                    : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                }`}
              >
                My Sessions
              </Link>
              <Link
                to="/session-editor"
                onClick={closeMobileMenu}
                className={`transition duration-200 px-2 py-1 rounded ${
                  isActive("/session-editor")
                    ? "text-emerald-600 font-semibold bg-emerald-50"
                    : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                }`}
              >
                Create Session
              </Link>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 cursor-pointer text-sm w-full"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
