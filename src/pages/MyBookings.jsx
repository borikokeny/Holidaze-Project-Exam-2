import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { viewProfile } from "../api/profile";
import placeholderImage from "../images/Placeholder.jpg";

export default function MyBookings() {
  const { user } = useAuth(); 
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const profileData = await viewProfile(user.name);
        setBookings(profileData.data.bookings || []);
      } catch (err) {
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.name]);

  if (loading) {
    return <p>Loading your bookings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!bookings || bookings.length === 0) {
    return <p>You haven't booked any venues yet.</p>;
  }

  const handleNights = (startDate, endDate, price) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) {
      return { nights: 0, total: 0 };
    }

    const dayDifference = end.getTime() - start.getTime();
    const days = Math.ceil(dayDifference / (1000 * 60 * 60 * 24));
    const total = days * price;
    return { days, total };
  };

  const getPreparedData = (booking) => {
    const startDate = new Date(booking.dateFrom);
    const endDate = new Date(booking.dateTo);

    return {
      dateFrom: startDate.toLocaleDateString(),
      dateTo: endDate.toLocaleDateString(),
    };
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => {
          const preparedData = getPreparedData(booking);
          const { days, total } = handleNights(
            booking.dateFrom,
            booking.dateTo,
            booking.venue.price
          );

          return (
            <div
              key={booking.id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg"
            >
              <Link to={`/venuePage/${booking.venue.id}`}>
                <img
                  src={booking.venue.media?.[0]?.url || placeholderImage}
                  alt={booking.venue.media?.[0]?.alt || "Venue image"}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h2 className="text-lg font-bold">{booking.venue.name}</h2>
                <p className="text-sm text-gray-600">
                  Booked Guests: {booking.guests}
                </p>
                <p className="text-sm text-gray-600">
                  Dates: {preparedData.dateFrom} - {preparedData.dateTo}
                </p>
                <p className="text-sm text-gray-600">Booked Nights: {days}</p>
                <p className="text-sm text-gray-600">Total Price: {total} NOK</p>
                <p className="text-sm text-gray-600">
                  Location: {booking.venue.location.city},{" "}
                  {booking.venue.location.country}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
