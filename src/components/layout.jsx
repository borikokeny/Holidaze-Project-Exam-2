import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div id="main-container" className="container mx-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;