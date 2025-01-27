import React, { useState, useEffect } from "react";
import { viewProfile, updateProfile } from "../api/profile";
import { useAuth } from "../context/AuthContext";
import { FiCamera } from "react-icons/fi";
import Modal from "../components/Modal";
import ManagerButton from "../components/ManagerButton";
import { logout } from "../api/auth/logout";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (!user?.name) {
      setLoading(false);
      return;
    }
    const fetchProfile = async () => {
      try {
        const profileData = await viewProfile(user.name);

        if (!profileData || !profileData.data || !profileData.data.name) {
          throw new Error("Profile data is invalid or missing the name field");
        }

        setProfile(profileData);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const openForm = () => {
    setOpenModal(true);
  };

  const closeForm = () => {
    setOpenModal(false);
    setAvatarUrl("");
  };

  const updateProfileListener = async (e) => {
    e.preventDefault();

    try {
      if (!avatarUrl) {
        throw new Error("Avatar URL is required");
      }

      const profileName = profile.data.name;
      if (!profileName) {
        throw new Error("Profile name is missing");
      }

      const updatedProfile = await updateProfile({
        name: profileName,
        avatar: { url: avatarUrl },
      });

      setProfile((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          avatar: updatedProfile.data.avatar,
        },
      }));

      closeForm();

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert(error.message || "An error occurred while updating the profile.");
    }
  };

  if (loading) {
    return <div>Loading</div>;
  }

  if (!profile) {
    return <div>You need to log in to get access to this page!</div>;
  }

  return (
    <div className="mb-11 border rounded-md w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
      <div className="grid justify-items-center mb-12 p-4 sm:p-6">
        <div className="w-40 sm:w-52 md:w-60 place-items-center relative">
          <img
            src={profile.data.avatar.url}
            alt="Avatar"
            className="object-cover rounded-full mt-6 w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60"
          />
          <button
            onClick={openForm}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 absolute bottom-2 right-2"
          >
            <FiCamera />
          </button>
        </div>
        <div className="mt-5 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            {profile.data.name}
          </h1>
          <div className="mt-2">
            <ManagerButton />
          </div>
          {openModal && (
            <Modal onClose={closeForm}>
              <form onSubmit={updateProfileListener} className="grid gap-4 p-4">
                <input
                  type="url"
                  placeholder="Add your new avatar URL"
                  className="border p-2 rounded w-full"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="rounded bg-gray-700 px-3 py-2 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-60"
                >
                  Update your avatar
                </button>
              </form>
            </Modal>
          )}
        </div>
        <div className="w-full mt-4 space-y-3">
          <p className="font-bold border p-3 text-center sm:text-left">
            {profile.data.email}
          </p>
          <p className="font-semibold border p-3 text-center sm:text-left">
            Bookings: {profile.data._count.bookings}
          </p>
          <p className="font-semibold border p-3 text-center sm:text-left">
            Venues: {profile.data._count.venues}
          </p>
          {user && (
            <button
              onClick={logout}
              id="logOut"
              className="flex justify-center mt-5 w-full p-2 bg-gray-700 text-white rounded hover:bg-gray-900"
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
