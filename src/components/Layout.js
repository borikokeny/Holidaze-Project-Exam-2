import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div id="main-container" className="min-h-screen flex flex-col">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4">
          <Outlet context={{ searchValue, setSearchValue }} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
