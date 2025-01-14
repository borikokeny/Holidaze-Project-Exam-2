import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VENUES_URL } from "../api/constants";
import VenueCard from "../components/VenueCard";

function Venue() {
  const { venueId } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch(`${VENUES_URL}/${venueId}?_owner=true`);
        const jsonData = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        setVenue(jsonData.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
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
