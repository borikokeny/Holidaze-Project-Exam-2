import React, { useState, useEffect } from "react";
import { viewProfile, updateProfile } from "../api/profile";
import { load } from "../storage";
import { Link } from "react-router-dom";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineModeEdit,
} from "react-icons/md";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { name } = load("profile");
        if (!name) {
          throw new Error("No name found in loaded profile");
        }

        const profileData = await viewProfile(name);
        if (!profileData || !profileData.data || !profileData.data.name) {
          throw new Error("Profile data is invalid or missing the name field");
        }

        setProfile(profileData);
        // console.log("Fetched profile:", profileData); // Debugging log
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  if (!profile) {
    return <div>Failed to load profile. Please try again later.</div>;
  }

  const openForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  // Render profile page
  return (
    <div className="mb-11">
      <div className="flex flex-row items-center mb-12">
        <div className="w-60 place-items-center">
          <img
            src={profile.data.avatar.url}
            className="object-cover rounded-full mt-6 w-60 h-60"
          />
        </div>
        <div className="ms-6 mt-12">
          <h1 className="text-2xl font-bold">{profile.data.name}</h1>
          <p className="font-bold">{profile.data.email}</p>
          <div className="flex">
            <p className="mt-3">Venue manager</p>
            <div className="flex mt-4 ms-2">
              <MdOutlineCheckBox />
              <MdOutlineCheckBoxOutlineBlank />
            </div>
          </div>
          <p className="mt-3 font-semibold">
            Bookings: {profile.data._count.bookings}
          </p>
          <p className="font-semibold">Venues: {profile.data._count.venues}</p>
          <button
            onClick={openForm}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <MdOutlineModeEdit />
          </button>
          {isFormVisible && (
            <div>
              <form action="">
                <input
                  type="url"
                  placeholder="Add your new avatar url"
                  className="border p-2 me-3"
                  required
                />
                <button
                  type="submit"
                  className="w-64 mt-2 rounded-none bg-sky-500 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-60"
                >
                  Update your avatar
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Link
        to="/myVenues"
        className="p-9 border rounded-md shadow-lg shadow-cyan-500/50"
      >
        My Venues
      </Link>
      <Link
        to="/myBookings"
        className="p-9 border rounded-md shadow-lg shadow-cyan-500/50"
      >
        My Bookings
      </Link>
      <Link
        to="/"
        className="p-9 border rounded-md shadow-lg shadow-cyan-500/50"
      >
        Add a Venue
      </Link>
    </div>
  );
}

// function ProfilePage() {
//   return (
//     <div className="mb-11">
//       <div className="mb-11">mdsfjs</div>
//       <Link
//         to="/myVenues"
//         className="p-9 border rounded-md shadow-lg shadow-cyan-500/50"
//       >
//         My Venues
//       </Link>
//       <Link
//         to="/myBookings"
//         className="p-9 border rounded-md shadow-lg shadow-cyan-500/50"
//       >
//         My Bookings
//       </Link>
//       {/* ide egy modal kell az add a venue-hoz */}
//       <Link
//         to="/"
//         className="p-9 border rounded-md shadow-lg shadow-cyan-500/50"
//       >
//         Add a Venue
//       </Link>
//     </div>
//   );
// }

// export default ProfilePage;
