import { BOOKINGS_URL } from "../constants";
import { headers } from "../constants/headers";

export async function viewBookings() {
  try {
    const response = await fetch(`${BOOKINGS_URL}?_customer=true&_venue=true`, {
      headers: headers(),
      method: "GET",
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Action failed:", error);
    throw new Error("Cannot fetch data");
  }
}

export async function viewBooking(id) {
  if (!id) {
    throw new Error("Get needs a booking ID");
  }
  try {
    const response = await fetch(`${BOOKINGS_URL}?_customer=true&_venue=true`, {
      headers: headers(),
      method: "GET",
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Cannot fetch data");
    }
  } catch (error) {
    console.error("Action failed:", error);
    throw error;
  }
}

export async function addBooking(formData) {
  console.log(formData);
  try {
    const response = await fetch(`${BOOKINGS_URL}`, {
      headers: headers(),
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Your reservation is confirmed!");
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
