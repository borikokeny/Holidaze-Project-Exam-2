import { load } from "../storage";

export function headers() {
  const token = load("token");

  if (token) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
   
  } else {
    return {
      "Content-Type": "application/json",
    };
  }

}