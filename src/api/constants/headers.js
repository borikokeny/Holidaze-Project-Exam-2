import { load } from "../../storage/index";
import { API_KEY } from ".";

export function headers() {
  const token = load("token");

  const baseHeaders = {
    "Content-Type": "application/json",
  };

  if (token) {
    baseHeaders.Authorization = `Bearer ${token}`;
  }

  if (API_KEY) {
    baseHeaders["X-Noroff-API-Key"] = API_KEY;
  }

  return baseHeaders;
}
