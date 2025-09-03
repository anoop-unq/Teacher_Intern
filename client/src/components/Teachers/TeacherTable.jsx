import React from "react";

const TeacherTable = ({ teachers, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-600 font-['Open_Sans']">Loading teacher data...</p>
      </div>
    );
  }

  if (teachers.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col items-center justify-center h-96">
        <svg
          className="w-20 h-20 text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
        <h3 className="text-xl font-semibold text-gray-700 font-['Poppins'] mb-2">
          No Teachers Found
        </h3>
        <p className="text-gray-500 text-center font-['Open_Sans'] max-w-md">
          There are currently no teachers in the system. Teachers will appear
          here once they've been added.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Poppins']">
                Teacher
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Poppins']">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Poppins']">
                University
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Poppins']">
                Gender
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Poppins']">
                Experience
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr
                key={teacher._id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-semibold font-['Poppins']">
                        {teacher.user_id.first_name.charAt(0)}
                        {teacher.user_id.last_name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 font-['Poppins']">
                        {teacher.user_id.first_name} {teacher.user_id.last_name}
                      </div>
                      <div className="text-xs text-gray-500 font-['Open_Sans']">
                        ID: {teacher.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-['Open_Sans']">
                    {teacher.user_id.email}
                  </div>
                  <div className="text-xs text-gray-500 font-['Open_Sans']">
                    {teacher.phone_number || "No phone number"}
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-['Open_Sans']">
                    {teacher.university_name}
                  </div>
                  <div className="text-xs text-gray-500 font-['Open_Sans']">
                    {teacher.department || "General Department"}
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize font-['Poppins'] ${
                      teacher.gender === "male"
                        ? "bg-blue-100 text-blue-800"
                        : teacher.gender === "female"
                        ? "bg-pink-100 text-pink-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {teacher.gender}
                  </span>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-['Open_Sans']">
                    Since {teacher.year_joined}
                  </div>
                  <div className="text-xs text-gray-500 font-['Open_Sans']">
                    {new Date().getFullYear() - teacher.year_joined} years
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <p className="text-xs text-gray-600 font-['Open_Sans']">
          Showing <span className="font-semibold">{teachers.length}</span> of{" "}
          <span className="font-semibold">{teachers.length}</span> teachers
        </p>
      </div>
    </div>
  );
};

export default TeacherTable;
