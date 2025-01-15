import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { viewVenue } from "../api/venue";
import VenueCard from "../components/VenueCard";

function Venue() {
  const { venueId } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const data = await viewVenue(venueId);
        setVenue(data);
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    };

    fetchVenue();
  }, [venueId]);

  return (
    <div>
      {venue ? <VenueCard venue={venue} /> : <p>Loading venue details...</p>}
    </div>
  );
}

export default Venue;

