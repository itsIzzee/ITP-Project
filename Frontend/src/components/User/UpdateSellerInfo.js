import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfileSeller, clearSellerError } from "../../Actions/sellerActions";

export default function UpdateSellerInfo() {
    const { loading, error, seller, isUpdatedSeller } = useSelector(state => state.sellerState);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [businessAddress, setBusinessAddress] = useState("");
    const [storeLocation, setStoreLocation] = useState("");
    const [businessRegistrationNo, setBusinessRegistrationNo] = useState("");
    const [acceptedPaymentMethods, setAcceptedPaymentMethods] = useState("");
    const [customerReviews, setCustomerReviews] = useState("");
    const [commissionFees, setCommissionFees] = useState("");
    const [productTypesSelling, setProductTypesSelling] = useState("");

    const dispatch = useDispatch();

 
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('businessName', businessName);
        formData.append('businessAddress', businessAddress);
        formData.append('storeLocation', storeLocation);
        formData.append('businessRegistrationNo', businessRegistrationNo);
        formData.append('acceptedPaymentMethods', acceptedPaymentMethods);
        formData.append('customerReviews', customerReviews);
        formData.append('commissionFees', commissionFees);
        formData.append('productTypesSelling', productTypesSelling);
        
        dispatch(updateProfileSeller(formData));
    };

    useEffect(() => {
        if (seller) {
            setName(seller.name || "");
            setEmail(seller.email || "");
            setBusinessName(seller.businessName || "");
            setBusinessAddress(seller.businessAddress || "");
            setStoreLocation(seller.storeLocation || "");
            setBusinessRegistrationNo(seller.businessRegistrationNo || "");
            setAcceptedPaymentMethods(seller.acceptedPaymentMethods || "");
            setCustomerReviews(seller.customerReviews || "");
            setCommissionFees(seller.commissionFees || "");
            setProductTypesSelling(seller.productTypesSelling || "");
        }

        if (isUpdatedSeller) {
            toast('Seller information updated successfully', {
                type: 'success',
                position: 'bottom-center'
            });
            return;
        }

        if (error) {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                // onOpen: () => { dispatch(clearSellerError) }
            });
            return;
        }
    }, [seller, isUpdatedSeller, error, dispatch]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
            <div className="w-full max-w-7xl flex bg-white rounded-3xl shadow-lg overflow-hidden h-[90vh]">
                {/* Right Side: Update Seller Info Form */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center overflow-y-auto">
                    {/* Title */}
                    <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Update Seller Information</h1>
                    <p className="text-center text-gray-600 mb-6">Update your profile and business details</p>

                    {/* Update Seller Info Form */}
                    <form onSubmit={submitHandler} className="space-y-6" encType="multipart/form-data">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name_field" className="block text-sm font-medium text-brown-600 text-left">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={name}
                                // onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email_field" className="block text-sm font-medium text-brown-600 text-left">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        

                        {/* Business Name */}
                        <div>
                            <label htmlFor="businessName" className="block text-sm font-medium text-brown-600 text-left">
                                Business Name
                            </label>
                            <input
                                type="text"
                                id="businessName"
                                className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                            />
                        </div>

                        {/* Business Address */}
                        <div>
                            <label htmlFor="businessAddress" className="block text-sm font-medium text-brown-600 text-left">
                                Business Address
                            </label>
                            <input
                                type="text"
                                id="businessAddress"
                                className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={businessAddress}
                                onChange={(e) => setBusinessAddress(e.target.value)}
                            />
                        </div>

                        {/* Store Location */}
                        <div>
                            <label htmlFor="storeLocation" className="block text-sm font-medium text-brown-600 text-left">
                                Store Location
                            </label>
                            <input
                                type="text"
                                id="storeLocation"
                                className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={storeLocation}
                                onChange={(e) => setStoreLocation(e.target.value)}
                            />
                        </div>

                        {/* Business Registration No */}
                        <div>
                            <label htmlFor="businessRegistrationNo" className="block text-sm font-medium text-brown-600 text-left">
                                Business Registration No
                            </label>
                            <input
                                type="text"
                                id="businessRegistrationNo"
                                className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={businessRegistrationNo}
                                onChange={(e) => setBusinessRegistrationNo(e.target.value)}
                            />
                        </div>

                        {/* Accepted Payment Methods */}
                        <div>
                            <label htmlFor="acceptedPaymentMethods" className="block text-sm font-medium text-brown-600 text-left">
                                Accepted Payment Methods
                            </label>
                            <select
                                id="acceptedPaymentMethods"
                                className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={acceptedPaymentMethods}
                                onChange={(e) => setAcceptedPaymentMethods(e.target.value)}
                            >
                                <option value="">Select Payment Method</option>
                                <option value="Cash">Cash</option>
                                <option value="Card">Card</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                                <option value="Cryptocurrency">Cryptocurrency</option>
                            </select>
                        </div>

                        {/* Commission Fees */}
                        <div>
                            <label htmlFor="commissionFees" className="block text-sm font-medium text-brown-600 text-left">
                                Commission Fees (%)
                            </label>
                            <input
                                type="number"
                                id="commissionFees"
                                className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={commissionFees}
                                onChange={(e) => setCommissionFees(e.target.value)}
                                min="0"
                                step="0.01"
                            />
                        </div>

                        {/* Product Types Selling */}
                        <div>
                            <label htmlFor="productTypesSelling" className="block text-sm font-medium text-brown-600 text-left">
                                Product Types Selling
                            </label>
                            <input
                                type="text"
                                id="productTypesSelling"
                                className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={productTypesSelling}
                                onChange={(e) => setProductTypesSelling(e.target.value)}
                                placeholder="e.g., Handmade, Electronics, Clothing"
                            />
                        </div>

                        {/* Update Button */}
                        <button
                            type="submit"
                            className="w-full bg-brown-600 text-white py-2 rounded-lg hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "UPDATE PROFILE"}
                        </button>
                    </form>
                </div>

                {/* Left Side: Background Image */}
                <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/login.jpg')" }}></div>
            </div>
        </div>
    );
}