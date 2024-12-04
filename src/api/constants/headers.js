import { load } from "../../storage/index";
import { API_KEY } from ".";

export function headers() {
  const token = load("token");

  // Start with the base headers
  const baseHeaders = {
    "Content-Type": "application/json",
  };

  // Conditionally add Authorization header if token exists
  if (token) {
    baseHeaders.Authorization = `Bearer ${token}`;
  }

  // Conditionally add X-Noroff-API-Key if it exists
  if (API_KEY) {
    baseHeaders["X-Noroff-API-Key"] = API_KEY;
  }

  return baseHeaders;
}


// import { load } from "../../storage/index";
// import { API_KEY } from ".";

// export function headers() {
//   const token = load("token");

//   if (token) {
//     return {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     };
//   } else {
//     return {
//       "Content-Type": "application/json",
//     };
//   }

// }
