import React, { useState } from "react";
import { login } from "../../api/auth/login";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Mountains from "../../images/Mountains.png";

const LoginForm = ({ redirect = true, onLoginSuccess }) => {
  const { login: setUser } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const loginFormListener = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { profile } = await login(formData.email, formData.password);

      const updatedProfile = {
        ...profile,
        venueManager: profile.venueManager || false,
      };

      setUser(updatedProfile);
      localStorage.setItem("profile", JSON.stringify(updatedProfile));

      if (redirect) {
        location.assign("/");
      }
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="font-main w-full max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex justify-center md:w-1/2">
          <img
            src={Mountains}
            className="w-full max-w-lg h-auto rounded-none shadow-md"
            alt="Mountains"
          />
        </div>
        <form
          onSubmit={loginFormListener}
          className="bg-white border rounded-none shadow-lg p-6 w-full md:w-1/2"
        >
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
            required
            className="ps-2 block w-full rounded-none mt-10 mb-3 border border-gray-300 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:outline-none sm:text-sm"
          />
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Password"
            required
            className="ps-2 block w-full rounded-none mb-3 border border-gray-300 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:outline-none sm:text-sm"
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full rounded-none bg-gray-700 px-4 py-2 text-white font-semibold hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Log in
            </button>
          </div>
          <div className="mt-4 text-center">
            <p>Create an Account</p>
            <Link
              to="/auth/Register"
              className="text-teal-600 hover:underline font-semibold"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
