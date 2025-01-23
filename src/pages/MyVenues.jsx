import React, { useEffect, useState } from "react";
import { viewVenues } from "../api/venue";
import { Link } from "react-router-dom";
import placeholderImage from "../images/Placeholder.jpg";
import { useAuth } from "../context/AuthContext";
import { getCountries, getAddress } from "../components/Countries";

const getLocation = (location) => {
  const randomAddress = getAddress();
  const randomCountry = getCountries();

  return {
    city: location?.city || randomAddress.city,
    country: location?.country || randomCountry,
  };
};

function MyVenues() {
  const { user } = useAuth(); 
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const randomLocation = getLocation(location);
  
  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        const data = await viewVenues();
        const userVenues = data.filter((venue) => venue.owner.email === user.email);
        setVenues(userVenues);
      } catch (error) {
        setError("Failed to fetch venues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [user.email]);

  if (loading) {
    return <p>Loading your venues...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!venues || venues.length === 0) {
    return <p>You haven't created any venues yet.</p>;
  }

  const getPreparedData = (booking) => {
    const startDate = new Date(booking.dateFrom);
    const endDate = new Date(booking.dateTo);

    return {
      dateFrom: startDate.toLocaleDateString(),
      dateTo: endDate.toLocaleDateString(),
    };
  };

  return (
    <div className="container mx-auto p-4 font-main">
      <h1 className="text-2xl font-bold mb-4">My Venues</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {venues.map((venue) => (
          <div key={venue.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg">
            <Link to={`/venuePage/${venue.id}`}>
              <img
                src={venue.media?.[0]?.url || placeholderImage}
                alt={venue.media?.[0]?.alt || "Venue image"}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h2 className="text-lg font-bold">{venue.name}</h2>
              <p className="text-sm text-gray-600">{venue.description}</p>  <p className="text-sm text-gray-600 mt-2">Price: {venue.price} NOK / night</p>
              <p className="text-sm text-gray-600">
                Location: {venue.location.city || randomLocation.city}, {venue.location.country || randomLocation.country}
              </p>

              {venue.bookings?.length > 0 ? (
            <div className="mt-4">
              <h3 className="text-sm font-semibold">Bookings:</h3>
              <ul className="text-sm text-gray-600">
                {venue.bookings.map((booking) => {
                   const preparedData = getPreparedData(booking);
                   return (
                    <li key={booking.id}>
                    <span>Booked by: {booking.customer.name}</span> – From: {preparedData.dateFrom} to {preparedData.dateTo} (
                    {booking.guests} guests)
                  </li>
                   )
                })}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-gray-600 mt-2">No bookings yet.</p>
          )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyVenues;
