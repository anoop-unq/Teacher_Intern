import { useState } from "react";
import Header from "../components/Layout/Header";
import TeacherForm from "../components/Teachers/TeacherForm";
import TeacherList from "../components/Teachers/TeacherList";

const TeachersPage = () => {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <Header />

      {/* Page Container */}
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl shadow bg-white p-1">
            <button
              className={`px-6 py-2 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 ${
                activeTab === "list"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
              onClick={() => setActiveTab("list")}
            >
              📋 View Teachers
            </button>
            <button
              className={`px-6 py-2 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 ${
                activeTab === "add"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
              onClick={() => setActiveTab("add")}
            >
              ➕ Add Teacher
            </button>
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10">
          {activeTab === "list" ? (
            <div className="animate-fadeIn">
              <TeacherList />
            </div>
          ) : (
            <div className="animate-fadeIn">
              <TeacherForm onTeacherAdded={() => setActiveTab("list")} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeachersPage;
