// src/pages/Profile.js

const Profile = () => {
  const { user, loading } = useAuth

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-500 text-lg">Not authenticated</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h2>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">ID:</span> {user._id}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">First Name:</span> {user.first_name}
          </p>
          <p>
            <span className="font-semibold">Last Name:</span> {user.last_name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
