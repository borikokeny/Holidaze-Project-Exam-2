import React from "react";
import useApi from "../hooks/api";
import { VENUES_URL } from "../constants";
import VenueList from "../components/venueList";

function Home() {
  const url = VENUES_URL;
  const { data } = useApi(url);
  const venues = data;
  
  return (
    <div id="main-container">
      <main className="bg-slate-200 shadow-md">
        <h1>xjvxjxklvxlkszovegszovegszoveg</h1>
        <VenueList venues={venues} />
      </main>
    </div>
  );
}

export default Home;
