import React from "react";

export default function SearchBar({ searchValue, setSearchValue }) {
  return (
    <input
      type="text"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Search venues"
      className="p-2 border rounded w-full"
    />
  );
}
