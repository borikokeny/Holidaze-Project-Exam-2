import React, { useState, useEffect } from "react";
import { viewProfile, updateProfile } from "../api/profile";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { MdOutlineModeEdit } from "react-icons/md";
import Modal from "../components/Modal";
import ManagerButton from "../components/ManagerButton";
import SomePage from "../components/Access";

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
    <div className="mb-11">
      <div className="flex flex-row items-center mb-12">
        <div className="w-60 place-items-center">
          <img
            src={profile.data.avatar.url}
            alt="Avatar"
            className="object-cover rounded-full mt-6 w-60 h-60"
          />
        </div>
        <div className="ms-6 mt-12">
          <SomePage />
          <h1 className="text-2xl font-bold">{profile.data.name}</h1>
          <p className="font-bold">{profile.data.email}</p>
          <div className="mt-3">
            <ManagerButton />
          </div>
          <p to="/MyBookings" className="mt-3 font-semibold">
            Bookings: {profile.data._count.bookings}
          </p>
          <p className="font-semibold">Venues: {profile.data._count.venues}</p>
          <button
            onClick={openForm}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <MdOutlineModeEdit />
          </button>

          {openModal && (
            <Modal onClose={closeForm}>
              <form
                onSubmit={updateProfileListener}
                className="flex justify-around"
              >
                <input
                  type="url"
                  placeholder="Add your new avatar url"
                  className="border p-2 me-3 w-2/4"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-2/5 mt-2 rounded-none bg-gray-700 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-60"
                >
                  Update your avatar
                </button>
              </form>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
