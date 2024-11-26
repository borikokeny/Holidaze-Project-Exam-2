import { LOG_URL } from "../constants";
import { save } from "../../storage";
import { headers } from "../constants/headers";

export async function login(email, password) {
  try {
    console.log("Attempting login with email:", email);

    const response = await fetch(`${LOG_URL}`, {
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
    console.log("Response data:", responseData);

    const { accessToken, ...profile } = responseData.data || responseData;

    if (!accessToken) {
      throw new Error("Login successful but token is missing");
    }

  
    save("token", accessToken);
    save("profile", profile);

    alert("You are now logged in");

    return profile;
  } catch (error) {
    console.error("Login process failed:", error.message);
    throw error;
  }
}
