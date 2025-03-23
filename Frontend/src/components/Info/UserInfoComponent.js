// components/User/UserInfoComponent.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  createUserInfo,
  getUserInfo,
  updateUserInfo,
} from "../../Actions/userInfoActions";

export default function UserInfoComponent() {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.userInfoState);
  const [formData, setFormData] = useState({
    shippingAddress: "",
    billingAddress: "",
    notificationPreferences: { email: true, sms: false },
  });

  // Fetch user info on component mount
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  // Populate form data if user info exists
  useEffect(() => {
    if (userInfo) {
      setFormData(userInfo);
    }
  }, [userInfo]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInfo) {
      dispatch(updateUserInfo(formData))
        .then(() => toast.success("User info updated successfully"))
        .catch(() => toast.error("Failed to update user info"));
    } else {
      dispatch(createUserInfo(formData))
        .then(() => toast.success("User info added successfully"))
        .catch(() => toast.error("Failed to add user info"));
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

        {/* Right Side: User Info Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">User Information</h2>
          <form onSubmit={handleSubmit}>
            {/* Shipping Address */}
            <div className="mb-4">
              <label className="block text-gray-700">Shipping Address</label>
              <input
                type="text"
                placeholder="Shipping Address"
                value={formData.shippingAddress}
                onChange={(e) =>
                  setFormData({ ...formData, shippingAddress: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            {/* Billing Address */}
            <div className="mb-4">
              <label className="block text-gray-700">Billing Address</label>
              <input
                type="text"
                placeholder="Billing Address"
                value={formData.billingAddress}
                onChange={(e) =>
                  setFormData({ ...formData, billingAddress: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            {/* Notification Preferences */}
            <div className="mb-4">
              <label className="block text-gray-700">Notification Preferences</label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.notificationPreferences.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notificationPreferences: {
                          ...formData.notificationPreferences,
                          email: e.target.checked,
                        },
                      })
                    }
                    className="form-checkbox"
                  />
                  <span className="ml-2">Email</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="checkbox"
                    checked={formData.notificationPreferences.sms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notificationPreferences: {
                          ...formData.notificationPreferences,
                          sms: e.target.checked,
                        },
                      })
                    }
                    className="form-checkbox"
                  />
                  <span className="ml-2">SMS</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {loading
                ? "Saving..."
                : userInfo
                ? "Update User Info"
                : "Add User Info"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}