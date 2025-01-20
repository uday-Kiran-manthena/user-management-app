import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const UserDetail = ({ isDarkMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loading) {
    return (
      <div
        className={`absolute inset-0 flex justify-center items-center ${
          isDarkMode ? "bg-gray-800 bg-opacity-75" : "bg-white bg-opacity-90"
        }`}
      >
        <ClipLoader
          color={isDarkMode ? "#00B5D6" : "#4A90E2"}
          loading={loading}
          size={70}
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <div className="text-xl font-semibold">User not found.</div>
      </div>
    );
  }

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`max-w-lg w-full ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-xl p-6`}
      >
        <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
        <div className="text-lg mb-4">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="text-lg mb-4">
          <strong>City:</strong> {user.address.city}
        </div>
        <div className="text-lg mb-4">
          <strong>Phone:</strong> {user.phone}
        </div>
        <div className="text-lg mb-4">
          <strong>Website:</strong> {user.website}
        </div>
        <div className="text-lg mb-4">
          <strong>Company:</strong> {user.company.name}
        </div>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 rounded-md mb-6 font-medium transition-colors duration-300 bg-teal-500 text-white hover:bg-teal-400"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UserDetail;
