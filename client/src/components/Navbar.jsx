// client/src/components/Navbar.jsx
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = (isActive) =>
    isActive ? "text-sky-600 font-medium" : "text-gray-700 hover:text-purple-600 transition";

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SkillBridge
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" end className={({ isActive }) => linkClass(isActive)}>Home</NavLink>

            {user && (
              <NavLink to="/dashboard" className={({ isActive }) => linkClass(isActive)}>Dashboard</NavLink>
            )}

            <NavLink to="/jobs" className={({ isActive }) => linkClass(isActive)}>Jobs</NavLink>
            <NavLink to="/resources" className={({ isActive }) => linkClass(isActive)}>Resources</NavLink>

            {/* Resume & Interview — match your App routes */}
            {user ? (
              <>
                <NavLink to="/resume" className={({ isActive }) => linkClass(isActive)}>Resume</NavLink>
                <NavLink to="/interview" className={({ isActive }) => linkClass(isActive)}>Interview</NavLink>
                <NavLink to="/profile" className={({ isActive }) => linkClass(isActive)}>Profile</NavLink>
              </>
            ) : (
              <>
                {/* If you want resume/interview public, you can show links even when not logged in */}
                {/* <NavLink to="/resume" className={({ isActive }) => linkClass(isActive)}>Resume</NavLink>
                <NavLink to="/interview" className={({ isActive }) => linkClass(isActive)}>Interview</NavLink> */}
              </>
            )}

            <NavLink to="/ai-lab" className={({ isActive }) => linkClass(isActive)}>AI Lab</NavLink>
            <NavLink to="/contact" className={({ isActive }) => linkClass(isActive)}>Contact</NavLink>
          </nav>

          {/* Right side auth buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-700 hover:text-purple-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-purple-600 transition">Login</Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
