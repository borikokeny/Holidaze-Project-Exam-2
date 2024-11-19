import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth/register";
import { useForm } from "react-hook-form";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    banner: "",
    avatar: "",
    venueManager: "",
    _count: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerFormListener = (e) => {
    e.preventDefault();
    register(formData, setError, navigate);
  };

  return (
    <div>
      <p>hesnds</p>
 <form onSubmit={registerFormListener}>
      <input
        type="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
      />
      <input
        type="banner"
        value={formData.banner}
        onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
        placeholder="Banner url"
      />
      <input
        type="avatar"
        value={formData.avatar}
        onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
        placeholder="Avatar url"
      />
      <input
        type="checkbox"
        value={formData.venueManager}
        onChange={(e) => setFormData({ ...formData, venueManager: e.target.value })}
      /><label for="venueManager">I'm a venue manager YEAH</label>
    </form>
    </div>
   
  );
};

export default RegisterForm;
