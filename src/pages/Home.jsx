import React, { useState, useEffect } from "react";
import { viewVenues } from "../api/venue";
import { useSearchParams } from "react-router-dom";
import VenueList from "../components/VenueList";

export default function Home() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const searchValue = searchParams.get("search") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await viewVenues();
        setVenues(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>Error loading venues: {error}</p>;

  const filteredVenues = venues.filter((venue) => {
    const venueName = venue.name.trim().toLowerCase();
    const searchValueLowerCase = searchValue.trim().toLowerCase();

    return venueName.includes(searchValueLowerCase) && searchValue !== "";
  });

  return (
    <div id="main-container">
      <main className="shadow-md p-4">
        {searchValue ? (
          <>
            <h2 className="text-xl font-bold mb-4">Search Results</h2>
            {filteredVenues.length > 0 ? (
              <VenueList venues={filteredVenues} />
            ) : (
              <p>No venues match your search.</p>
            )}
          </>
        ) : (
          <VenueList venues={venues} />
        )}
      </main>
    </div>
  );
}