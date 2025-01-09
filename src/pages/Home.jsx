import React from "react";
import useApi from "../hooks/api";
import { VENUES_URL } from "../api/constants";
import { useOutletContext } from "react-router-dom";
import VenueList from "../components/VenueList";

export default function Home() {
  const { searchValue } = useOutletContext();
  const url = `${VENUES_URL}?sort=created&sortOrder=desc`;
  const { data } = useApi(url);

  const filteredVenues = data?.filter((venue) => {
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
            {filteredVenues && filteredVenues.length > 0 ? (
              <VenueList venues={filteredVenues} />
            ) : (
              <p>No venues match your search.</p>
            )}
          </>
        ) : (
          <>
            <VenueList venues={data} />
          </>
        )}
      </main>
    </div>
  );
}