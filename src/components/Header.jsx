import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Logo.jpg";
import SearchBar from "./Searchbar";
import { useAuth } from "../context/AuthContext";
import { viewProfile } from "../api/profile";
import AddAVenueButton from "./AddAVennueButton";

export default function Header({ searchValue, setSearchValue }) {
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
    <header className="shadow-md bg-white sticky top-0 z-50 font-nav">
      <div className="container  px-4 flex flex-col md:flex-row items-center justify-between py-4 gap-4">
        <Link to="/" className="flex-shrink-0">
          <img src={Logo} alt="Logo" className="w-96 sm:w-56 md:w-64" />
        </Link>

        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <nav className="block md:hidden container mx-auto px-4 py-2">
        <ul className="grid grid-cols-2 gap-x-8 gap-y-4 mb-3 text-center">
          <li className="border rounded-none p-3">
            <Link
              to="/ProfilePage"
              className="p-2 text-gray-700 hover:bg-gray-200"
            >
              My Profile
            </Link>
          </li>
          <li className="border rounded-none p-3">
            <Link
              to="/MyBookings"
              className="p-2 text-gray-700 hover:bg-gray-200"
            >
              My Bookings
            </Link>
          </li>
          <li className="border rounded-none p-3">
            {user ? (
              profile?.data && (
                <Link
                  to="/MyVenues"
                  className="p-2 text-gray-700 rounded-none hover:bg-gray-200"
                >
                  My Venues
                </Link>
              )
            ) : (
              <Link
                to="/auth/Login"
                className="text-gray-700 rounded-none hover:bg-gray-200"
              >
                Log In
              </Link>
            )}
          </li>
          <li className="border rounded-none p-1 pe-8">
            <AddAVenueButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
