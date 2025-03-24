// components/Profile.js
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ProfileUserInfo() {
  const { user } = useSelector((state) => state.authState);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
  <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="flex flex-col md:flex-row">
      {/* Left Side: Background Image */}
      <div 
        className="hidden md:block w-full md:w-1/3 bg-cover bg-center min-h-[300px]"
        style={{ backgroundImage: "url('/login.jpg')" }}
      ></div>

      {/* Right Side: Profile Content */}
      <div className="w-full md:w-2/3 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">User Info </h2>

        {/* Profile Sections */}
        <div className="space-y-6">
          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Address Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="block text-sm font-medium text-brown-600 text-left">Shipping Address</p>
                <p className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {user.shippingAddress || "Not provided"}
                </p>
              </div>
              <div>
                <p className="block text-sm font-medium text-brown-600 text-left">Billing Address</p>
                <p className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {user.billingAddress || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Preferences</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="block text-sm font-medium text-brown-600 text-left">Products Interested</p>
                <p className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {user.productsInterested || "None specified"}
                </p>
              </div>
              <div>
                <p className="block text-sm font-medium text-brown-600 text-left">Wishlist</p>
                <p className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {user.wishlist || "Empty"}
                </p>
              </div>
              <div>
                <p className="block text-sm font-medium text-brown-600 text-left">Feedbacks</p>
                <p className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {user.feedbacks || "None"}
                </p>
              </div>
              <div>
                <p className="block text-sm font-medium text-brown-600 text-left">Notifications</p>
                <p className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {user.notificationPreferences || "Default"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <Link
            to="/updateUserInfo"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 text-center block"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}