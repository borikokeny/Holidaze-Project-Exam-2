import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Logo.jpg";
import SearchBar from "./Searchbar";
import { useAuth } from "../context/AuthContext";
import { viewProfile } from "../api/profile";
import AddAVenueButton from "./AddAVennueButton";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";

export default function Header({ searchValue, setSearchValue }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const profileData = await viewProfile(user.name);
          setProfile(profileData);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#menu-button") && !event.target.closest("#menu-content")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="shadow-md bg-white sticky top-0 z-50 font-nav header-top">
      <div className="container px-4 flex flex-col md:flex-row items-center justify-between py-4 gap-4"> 
        <div className="flex items-center gap-4">
        <Link to="/" className="flex-shrink-0">
          <img src={Logo} alt="Logo" className="w-96 sm:w-56 md:w-64" />
        </Link>
        <button
          id="menu-button"
          className="md:hidden p-2 rounded focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <MdClose size={28} /> : <RxHamburgerMenu size={28} />}
        </button>
      </div>
      <div className=""></div>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />

      </div>
      <nav
        id="menu-content"
        className={`md:hidden container mx-auto px-4 py-2 transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <ul className="grid grid-cols-2 gap-x-8 gap-y-4 mb-3 text-center bg-white shadow-md p-4 rounded-md">
          <li className="border rounded-none p-3">
            <Link to="/ProfilePage" className="p-2 text-gray-700 hover:bg-gray-200">
              My Profile
            </Link>
          </li>
          <li className="border rounded-none p-3">
            <Link to="/MyBookings" className="p-2 text-gray-700 hover:bg-gray-200">
              My Bookings
            </Link>
          </li>
          <li className="border rounded-none p-3">
            {user ? (
              profile?.data && (
                <Link to="/MyVenues" className="p-2 text-gray-700 hover:bg-gray-200">
                  My Venues
                </Link>
              )
            ) : (
              <Link to="/auth/Login" className="text-gray-700 hover:bg-gray-200">Log In</Link>
            )}
          </li>
          <li className="border rounded-none p-1 pe-8">
            <AddAVenueButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Logo from "../images/Logo.jpg";
// import SearchBar from "./Searchbar";
// import { useAuth } from "../context/AuthContext";
// import { viewProfile } from "../api/profile";
// import AddAVenueButton from "./AddAVennueButton";

// export default function Header({ searchValue, setSearchValue }) {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (user) {
//         try {
//           const profileData = await viewProfile(user.name);
//           setProfile(profileData);
//         } catch (error) {
//           console.error("Failed to fetch profile:", error);
//         }
//       }
//     };

//     fetchProfile();
//   }, [user]);

//   return (
//     <header className="shadow-md bg-white sticky top-0 z-50 font-nav">
//       <div className="container  px-4 flex flex-col md:flex-row items-center justify-between py-4 gap-4">
//         <Link to="/" className="flex-shrink-0">
//           <img src={Logo} alt="Logo" className="w-96 sm:w-56 md:w-64" />
//         </Link>

//         <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
//       </div>
//       <nav className="block md:hidden container mx-auto px-4 py-2">
//         <ul className="grid grid-cols-2 gap-x-8 gap-y-4 mb-3 text-center">
//           <li className="border rounded-none p-3">
//             <Link
//               to="/ProfilePage"
//               className="p-2 text-gray-700 hover:bg-gray-200"
//             >
//               My Profile
//             </Link>
//           </li>
//           <li className="border rounded-none p-3">
//             <Link
//               to="/MyBookings"
//               className="p-2 text-gray-700 hover:bg-gray-200"
//             >
//               My Bookings
//             </Link>
//           </li>
//           <li className="border rounded-none p-3">
//             {user ? (
//               profile?.data && (
//                 <Link
//                   to="/MyVenues"
//                   className="p-2 text-gray-700 rounded-none hover:bg-gray-200"
//                 >
//                   My Venues
//                 </Link>
//               )
//             ) : (
//               <Link
//                 to="/auth/Login"
//                 className="text-gray-700 rounded-none hover:bg-gray-200"
//               >
//                 Log In
//               </Link>
//             )}
//           </li>
//           <li className="border rounded-none p-1 pe-8">
//             <AddAVenueButton />
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// }
