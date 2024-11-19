import { REG_URL } from "../constants";
import { headers } from "../constants/headers";

export async function register(formData) {
  const response = await fetch(`${REG_URL}`, {
    headers: headers(),
    method: "POST",
    body: JSON.stringify({formData
    }),
  });

  if (response.ok) {
    alert("You are now registered");
    return await response.json();
  } else {
    alert(
      "Profile already exists! Log in with this one or register a new profile!"
    );
  }
  throw new Error("Cannot fetch data");
}

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
