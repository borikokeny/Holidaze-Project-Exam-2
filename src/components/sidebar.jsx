import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../api/auth/logout";

function Sidebar() {
  return (
    <aside className="flex flex-col flex-shrink-0 p-4 h-screen w-48">
      <ul className="flex flex-col space-y-2">
        <li>
          <div className="mt-auto ms-8">
            <div
              href="#"
              className="flex items-center p-2 ps-7 text-gray-900 no-underline hover:bg-gray-200 rounded-md"
            >
              <img
                src="https://github.com/mdo.png"
                alt="User avatar"
                className="w-8 h-8 rounded-full mr-3"
              />
            </div>
          </div>
          <Link
            to="/profilePage"
            className="flex items-center p-2 ps-10 rounded-md text-gray-700 hover:bg-gray-200"
          >
            My Profile
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="flex items-center p-2 ps-10 text-gray-700 rounded-md hover:bg-gray-200"
          >
            My bookings
          </Link>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center p-2 ps-10 text-gray-700 rounded-md hover:bg-gray-200"
          >
            My venues
          </a>
        </li>
        <li>
          <Link
            href="#"
            className="flex items-center p-2 ps-10 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Add a venue
          </Link>
        </li>
        <li>
          <Link
            to="/auth/register"
            className="flex items-center p-2 ps-10 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Sign up
          </Link>
          <Link
            to="/auth/login"
            className="flex items-center p-2 ps-10 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Log in
          </Link>
          <Link
            onClick={logout}
            id="logOut"
            className="flex items-center p-2 ps-10 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Log out
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
