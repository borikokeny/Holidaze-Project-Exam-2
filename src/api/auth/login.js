import { LOG_URL } from "../constants";
import { save } from "../../storage";
import { headers } from "../constants/headers";

export async function login(email, password) {
  try {
    const response = await fetch(`${LOG_URL}`, {
      headers: headers(),
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { accessToken, ...profile } = await response.json();
      save("token", accessToken);
      save("profile", profile);

      alert("You are now logged in");

      return profile;
    }
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}
