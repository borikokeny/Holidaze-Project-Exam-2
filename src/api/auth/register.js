import { REG_URL } from "../constants";
import { headers } from "../constants/headers";

export async function register(formData) {
    console.log("Sending data:", formData);
  try {
      const response = await fetch(`${REG_URL}`, {
          headers: headers(),
          method: "POST",
          body: JSON.stringify(formData),
      });

      if (response.ok) {
          alert("You are now registered");
          return await response.json();
      } else {
          const errorData = await response.json(); 
          throw new Error(errorData.message || "Profile already exists!");
      }
  } catch (error) {
      console.error("Registration failed:", error);
      throw error; 
  }
}


// export async function register(formData) {
 
//   const response = await fetch(`${REG_URL}`, {
//     headers: headers(),
//     method: "POST",
//     body: JSON.stringify(formData),
//   });

//   if (response.ok) {
//     alert("You are now registered");
//     return await response.json();
//   } else {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Profile already exists!");
//   } 
// }




// export async function register(
//   name,
//   email,
//   password,
//   banner,
//   avatar,
//   venueManager,
//   _count
// ) {
//   const response = await fetch(`${REG_URL}`, {
//     headers: headers(),
//     method: "POST",
//     body: JSON.stringify({
//       name,
//       email,
//       password,
//       banner,
//       avatar,
//       venueManager,
//       _count,
//     }),
//   });

//   if (response.ok) {
//     alert("You are now registered");
//     return await response.json();
//   } else {
//     alert(
//       "Profile already exists! Log in with this one or register a new profile!"
//     );
//   }
//   throw new Error("Cannot fetch data");
// }
