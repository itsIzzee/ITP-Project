// components/Profile.js
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ProfileUserInfo() {
  const { seller } = useSelector((state) => state.sellerState);


  return(

     <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden h-[90vh] flex">
        {/* Left Side: Seller Profile Content */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Seller Info</h2>
          <div className="space-y-6">
            {/* Business Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Business Details
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="block text-sm font-medium text-brown-600 text-left">
                    Business Address
                  </p>
                  <p className="mt-1 px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm">
                    {seller.businessAddress || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="block text-sm font-medium text-brown-600 text-left">
                    Store Location
                  </p>
                  <p className="mt-1 px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm">
                    {seller.storeLocation || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="block text-sm font-medium text-brown-600 text-left">
                    Business Registration No
                  </p>
                  <p className="mt-1 px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm">
                    {seller.businessRegistrationNo || "Not available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Business Operations Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brown-700 border-b pb-2">
                Business Operations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="block text-sm font-medium text-brown-600 text-left">
                    Accepted Payment Methods
                  </p>
                  <p className="mt-1 px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm">
                    {seller.acceptedPaymentMethods || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="block text-sm font-medium text-brown-600 text-left">
                    Commission Fees
                  </p>
                  <p className="mt-1 px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm">
                    {seller.commissionFees ? `${seller.commissionFees}%` : "Not set"}
                  </p>
                </div>
                <div>
                  <p className="block text-sm font-medium text-brown-600 text-left">
                    Product Types Selling
                  </p>
                  <p className="mt-1 px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm">
                    {seller.productTypesSelling || "Not mentioned"}
                  </p>
                </div>
                <div>
                  <p className="block text-sm font-medium text-brown-600 text-left">
                    Customer Reviews
                  </p>
                  <p className="mt-1 px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm">
                    {seller.customerReviews || "No reviews yet"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
                  {/* Action Button */}
                  <div className="mt-8">
                    <Link
                      to="/updateSellerInfo"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 text-center block"
                    >
                      Edit Seller Info
                    </Link>
                  </div>
        </div>

        {/* Right Side: Background Image */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/login.jpg')" }}
        ></div>
      </div>
    </div>

  )


}