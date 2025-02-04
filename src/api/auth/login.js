import { LOG_URL } from "../constants";
import { save } from "../../storage";
import { headers } from "../constants/headers";

export async function login(email, password) {
  try {
    const response = await fetch(`${LOG_URL}?_holidaze=true`, {
      headers: headers(true),
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      throw new Error(errorData.errors?.[0]?.message || "Login failed");
    }

    const responseData = await response.json();

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

    alert("You are now logged in");

    return { profile: updatedProfile };
  } catch (error) {
    console.error("Login process failed:", error.message);
    throw error;
  }
}
