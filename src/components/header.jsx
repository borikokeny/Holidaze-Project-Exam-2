import { Link } from "react-router-dom";
import Logo from "../images/Logo.jpg";

export default function Header() {
  return (
    <header className="shadow-md">
    <div className="container flex justify-between items-center">
      <Link to="/"><img src={Logo} alt="Logo" className="w-64" /></Link>
      {/* <nav className="space-x-4">
        <a href="" className="">
          my bookings
        </a>
        <a href="" className="">
          my venues
        </a>
        <Link to="/profilePage">Profile</Link>
      </nav> */}
      <input    type="search"
          name="search"
          placeholder="Search..."
          className="ps-2 ms-4 h-10 rounded-xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
    </div>
    <div></div>
  </header>
  )
}