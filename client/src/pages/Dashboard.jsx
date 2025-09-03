import { Link } from "react-router-dom";
import Header from "../components/Layout/Header";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <Header />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl p-10 flex items-center justify-center min-h-[24rem]">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-extrabold text-indigo-700 font-serif tracking-tight">
              Welcome to Teacher Management System 🎓
            </h3>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto font-sans">
              Use the navigation above to{" "}
              <span className="font-semibold text-indigo-600">
                manage teachers
              </span>{" "}
              or{" "}
              <span className="font-semibold text-purple-600">
                view your profile
              </span>
              . Start exploring the system and streamline your workflow!
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link to={"/teachers"} className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transform hover:scale-105 transition duration-300">
                Manage Teachers
              </Link>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
