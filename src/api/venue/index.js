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

export async function updateVenue(venueId, formData) {
  try {
    const response = await fetch(`${VENUES_URL}/${venueId}`, {
      headers: headers(true),
      method: "PUT",
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Your venue got updated!");
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

export async function removeVenue(venueId) {
  console.log("Deleting venue with ID:", venueId);
  try {
    const response = await fetch(`${VENUES_URL}/${venueId}`, {
      headers: headers(),
      method: "DELETE",
    });

    if (response.ok) {
      alert("The venue has been successfully deleted.");
      return true; 
    } else {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to delete the venue. Please try again."
      );
    }
  } catch (error) {
    console.error("Deletion failed:", error);
    throw error;
  }
}
