import { Link } from "react-router-dom";
import React from "react";
import Notification from "./Notification";
import Toggable from "./Toggable";
import LoginForm from "./LoginForm";
import { useNotification } from "../contexts/notificationContext";

const Header = ({ user, logout }) => {
  const [_, dispatchNotification] = useNotification();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-900">Blog App</h1>
            <nav className="space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Blogs
              </Link>
              <Link to="/users" className="text-gray-600 hover:text-gray-900">
                Users
              </Link>
            </nav>
          </div>

          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user.name} logged in
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <Notification />
      </div>
    </header>
  );
};

export default Header;
