import { VENUES_URL } from "../constants";
import { headers } from "../constants/headers";

export async function addVenue(formData) {
  console.log("Sending data:", formData);
  try {
    const response = await fetch(`${VENUES_URL}`, {
      headers: headers(),
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Congratulations! Your venue got published!");
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Unknown error. Try to fill the form again!"
      );
    }
  } catch (error) {
    console.error("Action failed:", error);
    throw error;
  }
}
