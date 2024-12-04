import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Logo.jpg";
import SearchBar from "./searchbar";

export default function Header({ searchValue, setSearchValue }) {
  return (
    <header className="shadow-md">
      <div className="container flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-64" />
        </Link>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div></div>
    </header>
  );
}
