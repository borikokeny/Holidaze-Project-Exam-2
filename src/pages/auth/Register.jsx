import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { register } from "../../api/auth/register";
import { Link } from "react-router-dom";
import Santorini from "../../images/Santorini.png";

function RegisterForm() {
  const [customerAccount, setCustomerAccount] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    venueManager: false,
    _count: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { upgradeToManager } = useAuth();

  const registerFormListener = async (e) => {
    e.preventDefault();

    const preparedData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      venueManager: formData.venueManager,
      ...(formData.avatar.trim() && { avatar: { url: formData.avatar } }),
    };
    try {
      await register(preparedData);

      if (formData.venueManager) {
        upgradeToManager();
      }

      navigate("/auth/login");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="font-main w-full max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex justify-center md:w-1/2">
          <img
            src={Santorini}
            className="w-full max-w-lg h-auto rounded-none shadow-md"
            alt="Santorini"
          />
        </div>
        <form
          onSubmit={registerFormListener}
          className="bg-white border rounded-none shadow-lg p-6 w-full md:w-1/2"
        >
          <input
            type="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            pattern="^[\w\s]+$"
            title="Username can only contain upper and lower case letters, numbers, and underscores. Example: myUser_123"
            placeholder="Name"
            className="ps-2 mt-10 block w-full rounded-none mb-3 border border-gray-300 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:outline-none sm:text-sm"
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            pattern="^[\w\-.]+@stud\.?noroff\.no$"
            title="Only @stud.noroff.no domains are allowed"
            placeholder="Email"
            className="ps-2 block w-full rounded-none mb-3 border border-gray-300 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:outline-none sm:text-sm"
          />
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            placeholder="Password"
            className="ps-2 block w-full rounded-none mb-3 border border-gray-300 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:outline-none sm:text-sm"
          />
          <input
            type="url"
            value={formData.avatar}
            onChange={(e) =>
              setFormData({ ...formData, avatar: e.target.value })
            }
            placeholder="Avatar URL"
            className="ps-2 block w-full rounded-none mb-3 border border-gray-300 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:outline-none sm:text-sm"
          />
          <p className="text-gray-700 text-sm mb-3">
            For booking purposes only, please choose the "Customer" option. If
            you wish to add a venue, please select the "Manager" option.
          </p>
          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                setCustomerAccount(true);
                setFormData((prev) => ({
                  ...prev,
                  venueManager: false,
                }));
              }}
              className={`w-full rounded-none px-4 py-2 font-semibold text-white ${
                customerAccount
                  ? "bg-teal-800"
                  : "bg-teal-500 hover:bg-teal-800"
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => {
                setCustomerAccount(false);
                setFormData((prev) => ({
                  ...prev,
                  venueManager: true,
                }));
              }}
              className={`w-full rounded-none px-4 py-2 font-semibold text-white ${
                formData.venueManager
                  ? "bg-teal-800"
                  : "bg-teal-500 hover:bg-teal-800"
              }`}
            >
              Manager
            </button>
          </div>
          <button
            type="submit"
            className="w-full mt-6 rounded-none bg-gray-700 px-4 py-2 text-white font-semibold hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Sign in
          </button>
          <div className="mt-4 text-center">
            <p>Already have an account?</p>
            <Link
              to="/auth/Login"
              className="text-teal-600 hover:underline font-semibold"
            >
              Log in
            </Link>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
