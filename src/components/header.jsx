import { Link } from "react-router-dom";
import Logo from "../images/Logo.jpg";

export default function Header() {
  return (
    <header className="shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/"><img src={Logo} alt="Logo" className="w-64" /></Link>
      <nav className="space-x-4">
        <a href="" className="">
          my bookings
        </a>
        <a href="" className="">
          my venues
        </a>
        <Link to="/profilePage">Profile</Link>
      </nav>
    </div>
  </header>
  )
}