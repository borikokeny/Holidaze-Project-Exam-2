import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth/register";
// import { useForm } from "react-hook-form";
import Santorini from "../../images/Santorini.png";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    banner: "",
    avatar: "",
    venueManager: false,
    _count: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerFormListener = async (e) => {
    e.preventDefault();

    const preparedData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      venueManager: formData.venueManager,
      ...(formData.banner.trim() && { banner: { url: formData.banner } }), 
      ...(formData.avatar.trim() && { avatar: { url: formData.avatar } }),
    };

    try {
      console.log("Payload:", preparedData);
      await register(preparedData);
      navigate("/auth/login");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center border-2 w-3/5">
      <div className="flex justify-around">
        <img src={Santorini} className="w-4/5 h-90 pb-3 mt-3" />
      </div>
      <form onSubmit={registerFormListener} className="flex mt-3 mb-3 pe-8">
        <div className="border rounded-md p-6 bg-gray-100">
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
            pattern="^[\w\-.]+@(stud\.)?noroff\.no$"
            title="Only @(stud).noroff.no domains are allowed"
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
            value={formData.banner}
            onChange={(e) =>
              setFormData({ ...formData, banner: e.target.value })
            }
            placeholder="Banner url"
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
          <input
            type="checkbox"
            value={formData.venueManager}
            onChange={(e) =>
              setFormData({ ...formData, venueManager: e.target.checked })
            }
          />
          <label className="text-gray-700"> I'm a venue manager YEAH</label>
          <div>
            <button
              type="submit"
              className="w-64 mt-2 rounded-none bg-sky-500 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-60"
            >
              Sign in
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
