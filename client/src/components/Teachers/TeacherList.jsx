import { useState, useEffect } from "react";
import api from "../../services/api";
import TeacherTable from "./TeacherTable";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/api/teachers");
      setTeachers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch teachers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-2xl shadow-lg"
          role="alert"
        >
          <div className="flex items-center mb-2">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="font-semibold text-lg">Error</span>
          </div>
          <p className="text-sm">{error}</p>
          <button
            onClick={fetchTeachers}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 font-['Poppins']">
              Faculty Directory
            </h2>
            <p className="text-gray-600 mt-2 font-['Open_Sans']">
              {teachers.length}{" "}
              {teachers.length === 1 ? "teacher" : "teachers"} registered
            </p>
          </div>
          <button
            onClick={fetchTeachers}
            disabled={loading}
            className="mt-4 md:mt-0 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg text-base font-medium font-['Poppins'] transition duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className={`w-5 h-5 mr-2 ${loading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            {loading ? "Refreshing..." : "Refresh List"}
          </button>
        </div>

        <TeacherTable teachers={teachers} loading={loading} />
      </div>

      {/* Decorative blurred background circles */}
      <div className="absolute top-0 left-0 -z-10">
        <div className="w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      </div>
      <div className="absolute top-0 right-0 -z-10">
        <div className="w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default TeacherList;
