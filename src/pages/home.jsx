import React from "react";
import useApi from "../hooks/api";
import { VENUES_URL } from "../api/constants";
import VenueList from "../components/venueList";

function Home() {
  const url = `${VENUES_URL}?sort=created&sortOrder=desc`;
  const { data } = useApi(url);
  const venues = data;

  return (
    <div id="main-container">
      <main className="bg-slate-200 shadow-md">
        <VenueList venues={venues} />
      </main>
    </div>
  );
}

export default Home;
