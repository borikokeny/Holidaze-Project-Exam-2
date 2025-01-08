import { LOG_URL } from "../constants";
import { save } from "../../storage";
import { headers } from "../constants/headers";

export async function login(email, password) {
  try {
    console.log("Attempting login with email:", email);

    const response = await fetch(`${LOG_URL}?_holidaze=true`, {
      headers: headers(true),
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      throw new Error(errorData.errors?.[0]?.message || "Login failed");
    }

    const responseData = await response.json();
    console.log("Full response data:", responseData);

    const { accessToken, venueManager, ...profile } =
      responseData.data || responseData;

    if (!accessToken) {
      throw new Error("Login successful but token is missing");
    }

    save("token", accessToken);

    const updatedProfile = {
      ...profile,
      venueManager: venueManager ?? false,
    };

    save("profile", updatedProfile);

    console.log("Saved profile:", updatedProfile);
    console.log("Saved venueManager:", updatedProfile.venueManager);

    alert("You are now logged in");

    return { profile: updatedProfile };
  } catch (error) {
    console.error("Login process failed:", error.message);
    throw error;
  }
}
