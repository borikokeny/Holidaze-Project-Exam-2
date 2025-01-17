import { PROFILES_URL } from "../constants";
import { headers } from "../constants/headers";

export async function viewProfiles() {
  const response = await fetch(`${PROFILES_URL}?_bookings=true&_venues=true`, {
    method: "GET",
    headers: headers(),
  });

  return await response.json();
}

export async function viewProfile(name) {
  if (!name) {
    throw new Error("Get needs a profile name");
  }
  const response = await fetch(`${PROFILES_URL}/${name}?_bookings=true&_venues=true`, {
    method: "GET",
    headers: headers(),
  });

  return await response.json();
}

export async function updateProfile(profileData) {
  if (!profileData.name) {
    throw new Error("Update needs a profile name")
  }
  const response = await fetch(`${PROFILES_URL}/${profileData.name}`, {
    method: "PUT",
    headers: headers(true),
    body: JSON.stringify(profileData)
  })

  return await response.json()
}
