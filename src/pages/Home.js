import React, { useState, useEffect } from "react";
import { fetchUsers } from "../services/api";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import { ClipLoader } from "react-spinners";

const Home = ({ isDarkMode }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6; // Define how many users to display per page

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers(); // Fetch data
        setUsers(data); // Update users state
        setLoading(false); // Set loading to false
      } catch (err) {
        setError("Failed to fetch users."); // Handle errors
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div
      className={`${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen p-8`}
    >
      <h1 className="text-4xl font-extrabold text-center mb-8">
        User Directory
      </h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <button
        className="bg-teal-600 text-white px-4 py-2 rounded-full mb-4"
        onClick={handleSort}
      >
        Sort by Name: {sortOrder === "asc" ? "A-Z" : "Z-A"}
      </button>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentUsers.map((user) => (
          <UserCard key={user.id} user={user} isDarkMode={isDarkMode} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-2 rounded-md ${
            isDarkMode
              ? "bg-gray-600 text-white disabled:opacity-50"
              : "bg-gray-300 text-black disabled:opacity-50"
          }`}
        >
          Prev
        </button>
        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-2 rounded-md ${
              currentPage === index + 1
                ? isDarkMode
                  ? "bg-teal-600 text-white"
                  : "bg-teal-500 text-white"
                : isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-2 rounded-md ${
            isDarkMode
              ? "bg-gray-600 text-white disabled:opacity-50"
              : "bg-gray-300 text-black disabled:opacity-50"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
