import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout } from "../api/auth/logout";
import { useAuth } from "../context/AuthContext";
import { viewProfile } from "../api/profile";
import AddAVenueButton from "./AddAVennueButton";

function Sidebar() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const profileData = await viewProfile(user.name);
          setProfile(profileData);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <div className="flex min-h-screen">
    <aside className="hidden shadow-md md:flex flex-col flex-shrink-0 p-4 w-48 bg-white sticky top-28 h-[calc(100vh-7rem)]">
      <ul className="flex font-nav flex-col flex-grow space-y-2">
        <li>
          <div className="mt-auto ms-8">
            <div
              href="#"
              className="flex items-center p-2 ps-7 text-gray-900 no-underline hover:bg-gray-200 rounded-md"
            >
            </div>
          </div>
          <Link
            to="/ProfilePage"
            className="flex items-center p-2 ps-10 rounded-md text-gray-700 hover:bg-gray-200"
          >
            My Profile
          </Link>
        </li>
        <li>
          <Link
            to="/MyBookings"
            className="flex items-center p-2 ps-10 text-gray-700 rounded-md hover:bg-gray-200"
          >
            My Bookings
          </Link>
        </li>
        <li>
          {profile && profile.data && (
            <Link
              to="/MyVenues"
              className="flex items-center p-2 ps-10 text-gray-700 rounded-md hover:bg-gray-200"
            >
              My Venues
            </Link>
          )}
        </li>
        <li className="-ms-5">
          <AddAVenueButton />
        </li>
        <li>
          {!user && (
            <Link
              to="/auth/Register"
              className="flex items-center p-2 ps-10 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Sign up
            </Link>
          )}
        </li>
        <li>
          {!user && (
            <Link
              to="/auth/Login"
              className="flex items-center p-2 ps-10 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Log in
            </Link>
          )}
        </li>
        <li className="mt-auto">
          {user && (
            <Link
              onClick={logout}
              id="logOut"
              className="flex items-center p-2 ps-10 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Log out
            </Link>
          )}
        </li>
      </ul>
    </aside>
    </div>
   
  );
}

export default Sidebar;
