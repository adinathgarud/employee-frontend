import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

//const API_BASE_URL = process.env.REACT_APP_API_URL; // Use environment variable

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [setting, setSetting] = useState({
    userId: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // Ensure user ID is set when user is loaded
  useEffect(() => {
    if (user) {
      setSetting((prev) => ({ ...prev, userId: user._id }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (setting.newPassword !== setting.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await axios.put(
        "https://employee-server-five.vercel.app/api/setting/change-password",
        setting,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setError(""); // Clear errors before navigating
        navigate("/login"); // Fixed typo
      }
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong.");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-gray-700">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Enter old password"
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Setting;
