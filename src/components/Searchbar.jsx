import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${query.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full searchbar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search venues"
        className="p-2 font-nav border rounded-none w-full text-sm sm:text-base"
      />
    </form>
  );
}

