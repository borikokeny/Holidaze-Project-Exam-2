// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { addVenue } from "../api/venue/addVenue";

// function VenueForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     media: [],
//     price: "",
//     maxGuests: "",
//     rating: "",
//     meta: {
//       wifi: false,
//       parking: false,
//       breakfast: false,
//       pets: false,
//     },
//     location: {
//       address: "",
//       city: "",
//       zip: "",
//       country: "",
//       continent: "",
//     },
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const venueFormListener = async (e) => {
//     e.preventDefault();

//     const preparedData = {
//       name: formData.name,
//       description: formData.description,
//       media: formData.media.length
//         ? formData.media.split(",").map((url) => url.trim())
//         : [],
//       price: parseFloat(formData.price) || 0,
//       maxGuests: parseInt(formData.maxGuests, 10) || 0,
//       rating: parseFloat(formData.rating) || 0,
//       meta: {
//         wifi: formData.meta.wifi,
//         parking: formData.meta.parking,
//         breakfast: formData.meta.breakfast,
//         pets: formData.meta.pets,
//       },
//       location: {
//         address: formData.location.address,
//         city: formData.location.city,
//         zip: formData.location.zip,
//         country: formData.location.country,
//         continent: formData.location.continent,
//       },
//     };

//     try {
//       console.log("Payload:", preparedData);
//       await addVenue(preparedData);
//       navigate("/auth/login");
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="flex justify-center border-2 w-3/5">
//       <form onSubmit={venueFormListener} className="flex mt-3 mb-3 pe-8">
//         <div className="border rounded-md p-6 bg-gray-100">
//           <h1>Add a Venue</h1>
//           <input
//             type="name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             placeholder="Name"
//             required
//             className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
//           />
//           <textarea
//             value={formData.description}
//             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//             placeholder="Description"
//             required
//             className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
//           />
//           <input
//             type="text"
//             value={formData.media}
//             onChange={(e) => setFormData({ ...formData, media: e.target.value})}
//             placeholder="Image URL"
//             className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
//           />
         
//           <div>
//             <button
//               type="submit"
//               className="w-64 mt-2 rounded-none bg-sky-500 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-60"
//             >
//               Publish Venue
//             </button>
//             {error && <p className="text-red-500">{error}</p>}
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default VenueForm;
