import React from "react";
import { Link } from "react-router-dom";

function ProfilePage() {
  return (
    <div className="mb-11">
      <div className="mb-11">mdsfjs</div>
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
      {/* ide egy modal kell az add a venue-hoz */}
      <Link
        to="/"
        className="p-9 border rounded-md shadow-lg shadow-cyan-500/50"
      >
        Add a Venue
      </Link>
    </div>
  );
}

export default ProfilePage;
