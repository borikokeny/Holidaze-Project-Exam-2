import { clear } from "../../storage";

export function logout() {
  clear();
  alert("You are logged out");
  window.location.assign("/");
}
