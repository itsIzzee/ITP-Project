// components/Profile.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteMyAccount } from "../../Actions/userActions"; // Import the delete action
import { toast } from "react-toastify";

export default function Profile() {
  const { user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Delete Account
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      dispatch(deleteMyAccount())
        .then(() => {
          toast.success("Account deleted successfully");
          navigate("/"); // Redirect to home page after deletion
        })
        .catch((error) => {
          toast.error(error || "Failed to delete account");
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
      <div className="w-full max-w-7xl flex bg-white rounded-3xl shadow-lg overflow-hidden h-[90vh]">
        {/* Left Side: Background Image */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/login.jpg')" }}
        ></div>

        {/* Right Side: Profile Content */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          {/* Profile Avatar and Edit Button */}
          <div className="flex flex-col items-center">
            <figure className="avatar avatar-profile">
              <img
                className="rounded-full w-32 h-32 object-cover border-2 border-gray-200"
                src={user.avatar}
                alt="Profile"
              />
            </figure>
          </div>

          {/* Profile Details */}
          <div className="mt-8">
            <h4 className="text-xl font-semibold text-gray-800">Full Name</h4>
            <p className="text-gray-600">{user.name}</p>

            <h4 className="text-xl font-semibold text-gray-800 mt-4">Email Address</h4>
            <p className="text-gray-600">{user.email}</p>

            <h4 className="text-xl font-semibold text-gray-800 mt-4">Joined Date</h4>
            <p className="text-gray-600">{String(user.createdAt).substring(0, 10)}</p>

            {/* Buttons */}
            <Link
              to="/myprofile/update"
              className="mt-5 w-full bg-yellow-600 text-white py-2 rounded-lg text-center block hover:bg-blue-700 transition duration-300"
            >
              Edit Profile
            </Link>
            <Link
              to="/myprofile/update/password"
              className="mt-3 w-full bg-brown-600 text-white py-2 rounded-lg text-center block hover:bg-blue-700 transition duration-300"
            >
              Change Password
            </Link>

            {/* User Info Button */}
            <Link
              to="/userInfoProfile"
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg text-center block hover:bg-blue-700 transition duration-300"
            >
              User Info
            </Link>

            {/* Delete Account Button */}
            <button
              onClick={handleDeleteAccount}
              className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg text-center block hover:bg-red-700 transition duration-300"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}