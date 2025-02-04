import { REG_URL } from "../constants";
import { headers } from "../constants/headers";

export async function register(formData) {
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