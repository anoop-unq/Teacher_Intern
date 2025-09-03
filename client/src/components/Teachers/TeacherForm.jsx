import { useState } from "react";
import api from "../../services/api";

const TeacherForm = ({ onTeacherAdded }) => {
  const [teacherData, setTeacherData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    university_name: "",
    gender: "",
    year_joined: "",
    department: "",
    specialization: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTeacherData({
      ...teacherData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      await api.post("/api/teachers/register", teacherData);
      setSuccess("🎉 Teacher added successfully!");
      setTeacherData({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        university_name: "",
        gender: "",
        year_joined: "",
        department: "",
        specialization: "",
      });

      if (onTeacherAdded) {
        onTeacherAdded();
      }
    } catch (err) {
      setError(err.response?.data?.message || "❌ Failed to add teacher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg rounded-2xl p-8 mt-10">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 font-serif">
        Add New Teacher
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm font-medium animate-pulse">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-4 text-sm font-medium animate-pulse">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              required
              value={teacherData.first_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-sans"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Last Name
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              required
              value={teacherData.last_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-sans"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={teacherData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-sans"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={teacherData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-sans"
            />
          </div>

          {/* University */}
          <div>
            <label
              htmlFor="university_name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              University
            </label>
            <input
              id="university_name"
              name="university_name"
              type="text"
              required
              value={teacherData.university_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-sans"
            />
          </div>

          {/* Department */}
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Department
            </label>
            <input
              id="department"
              name="department"
              type="text"
              required
              value={teacherData.department}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-sans"
            />
          </div>

          {/* Specialization */}
          <div>
            <label
              htmlFor="specialization"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Specialization
            </label>
            <input
              id="specialization"
              name="specialization"
              type="text"
              required
              value={teacherData.specialization}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-sans"
            />
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              required
              value={teacherData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-sans"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Year Joined */}
          <div>
            <label
              htmlFor="year_joined"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Year Joined
            </label>
            <input
              id="year_joined"
              name="year_joined"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              required
              value={teacherData.year_joined}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-sans"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transform transition duration-300 hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Adding Teacher..." : "Add Teacher"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherForm;
