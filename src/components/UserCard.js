import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user, isDarkMode }) => {
  return (
    <div
      className={`${
        isDarkMode
          ? "bg-gray-800 text-white border-gray-600"
          : "bg-white text-black border-gray-200"
      } p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out border hover:shadow-2xl`}
    >
      <Link to={`/user/${user.id}`} className="block">
        <div className="flex items-center justify-between space-x-4">
          <div className="text-lg font-bold">{user.name}</div>
          <div className="text-sm">{user.address.city}</div>
        </div>
        <div className="mt-3 text-sm">{user.email}</div>
        <div className="mt-4">
          <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors duration-300">
            View Details
          </button>
        </div>
      </Link>
    </div>
  );
};

export default UserCard;
