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
    console.log("Payload sent to backend:", preparedData);
    try {
      console.log("Payload:", preparedData);
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
    <div className="flex justify-center w-3/5 font-main">
      <div className="flex justify-around">
        <img src={Santorini} className="w-4/5 h-90 pb-3 mt-3" />
      </div>
      <form onSubmit={registerFormListener} className="flex mt-3 mb-3 pe-8">
        <div className="border p-6">
          <input
            type="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            pattern="^[\w\s]+$"
            title="Username can only contain upper and lower case letters, numbers and underscore. Example: myUser_123"
            placeholder="Name"
            className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
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
            className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
          />
          <input
            type="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            placeholder="Password"
            className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
          />
          <input
            type="url"
            value={formData.avatar}
            onChange={(e) =>
              setFormData({ ...formData, avatar: e.target.value })
            }
            placeholder="Avatar url"
            className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
          />
          <p className="text-gray-700 text-wrap w-96">
            For booking purposes only, please choose the 'Customer' option. If
            you wish to add a Venue, please select the 'Manager' option.
          </p>
          <div className="flex justify-around mt-3">
            <button
              type="button"
              onClick={() => {
                setCustomerAccount(true);
                setFormData((prev) => ({
                  ...prev,
                  venueManager: false,
                }));
              }}
              className={`w-32 mt-2 rounded-none px-3 py-2 text-base font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                customerAccount
                  ? "bg-teal-800 text-white"
                  : "bg-teal-500 text-white hover:bg-teal-800"
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
              className={`w-32 mt-2 rounded-none px-3 py-2 text-base font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                formData.venueManager
                  ? "bg-teal-800 text-white"
                  : "bg-teal-500 text-white hover:bg-teal-800"
              }`}
            > Manager
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="w-full mt-6 rounded-none bg-gray-700 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-60"
            >
              Sign in
            </button>
          </div>
          <div className="mt-3">
            <p>Already Have an Account?</p>
            <strong><Link to="/auth/Login">Log in</Link></strong>
          
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
