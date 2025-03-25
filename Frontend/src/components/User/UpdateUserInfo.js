import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import {updateProfile , clearAuthError} from "../../Actions/userActions"
import { useNavigate } from "react-router-dom";

export default function UpdateUserInfo () {
    const navigate = useNavigate();
    const {loading , error , user , isUpdated} = useSelector(state => state.authState);
    const  [name , setName] = useState("");
    const  [email , setEmail] = useState("");
    const  [avatar , setAvatar] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [wishlist, setWishlist] = useState([]);
    const [notificationPreferences, setNotificationPreferences] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [productsInterested, setProductsInterested] = useState([]);
   

    const dispatch =  useDispatch();

   

    const submitHandler =(e) => {
                e.preventDefault();
                const formData = new FormData ();
                formData.append('name' , name)
                formData.append('email' , email)
                formData.append('avatar' , avatar)
                formData.append("shippingAddress", shippingAddress);
                formData.append("billingAddress", billingAddress);
                formData.append("wishlist", wishlist);
                formData.append("notificationPreferences", notificationPreferences);
                formData.append("feedbacks", feedbacks);
                formData.append("productsInterested", productsInterested);
                dispatch(updateProfile(formData))
    }

    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            setShippingAddress(user.shippingAddress || "");  // Default to empty string if not available
            setBillingAddress(user.billingAddress || "");  // Default to empty string if not available
            setWishlist(user.wishlist || []);  // Default to empty array if not available
            setNotificationPreferences(user.notificationPreferences || []);  // Default to empty array if not available
            setFeedbacks(user.feedbacks || []);  // Default to empty array if not available
            setProductsInterested(user.productsInterested || []);
            

        }

        if(isUpdated){
            toast('Profile updated Successfully',{
                type: 'success',
                position : 'bottom-center'
            })
            navigate('/userInfoProfile')
            return;
        }

        if(error) {
            toast(error,{
                position : 'bottom-center',
                type : 'error',
                // onOpen : ()=>{ dispatch (clearAuthError)}
            })
            return
                }
    },[user , isUpdated,error])




return(

    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
    <div className="w-full max-w-7xl flex bg-white rounded-3xl shadow-lg overflow-y-auto my-8">
        {/* Left Side: Background Image */}
        <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/login.jpg')" }}></div>

        {/* Right Side: Update Profile Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            {/* Title */}
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Update User Information</h1>
            <p className="text-center text-gray-600 mb-6">Update your user information</p>

            {/* Update Profile Form */}
            <form onSubmit={submitHandler} className="space-y-6" encType="multipart/form-data">
                {/* Name Field */}
                <div>
                    <label htmlFor="name_field" className="block text-sm font-medium text-brown-600 text-left">Name</label>
                   
                     <p className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-left">
                  {user.name|| "Empty"}
                </p>
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email_field" className="block text-sm font-medium text-brown-600 text-left">Email</label>
                    
                    <p className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-left">
                  {user.email|| "Empty"}
                </p>
                </div>
                      {/* Shipping Address */}
                      <div>
                            <label className="block text-sm font-medium text-brown-600 text-left">Shipping Address</label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={shippingAddress}
                                onChange={e => setShippingAddress(e.target.value)}
                            />
                        </div>

                        {/* Billing Address */}
                        <div>
                            <label className="block text-sm font-medium text-brown-600 text-left">Billing Address</label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={billingAddress}
                                onChange={e => setBillingAddress(e.target.value)}
                            />
                        </div>

                        {/* Wishlist */}
                        <div>
                            <label className="block text-sm font-medium text-brown-600 text-left">Wishlist</label>
                            <textarea
                                className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={wishlist}
                                onChange={e => setWishlist(e.target.value)}
                                placeholder="Enter items separated by commas"
                            />
                        </div>

                        {/* Notification Preferences */}
                        <div>
                                <label className="block text-sm font-medium text-brown-600 text-left">Notification Preferences</label>
                                <select
                                    className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={notificationPreferences}
                                    onChange={(e) =>
                                        setNotificationPreferences(e.target.value)
                                                                            }
                                            >
                                                <option value="none">None</option>
                                                <option value="email">Email</option>
                                                <option value="sms">SMS</option>
                                                <option value="both">Email & SMS</option>
                                            </select>
                                        </div>


                        {/* Feedbacks */}
                        <div>
                            <label className="block text-sm font-medium text-brown-600 text-left">Feedbacks</label>
                            <textarea
                                className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={feedbacks}
                                onChange={e => setFeedbacks(e.target.value)}
                                placeholder="Enter feedback separated by commas"
                            />
                        </div>

                        {/* Products Interested */}
                        <div>
                            <label className="block text-sm font-medium text-brown-600 text-left">Products Interested</label>
                            {/* <input
                                type="text"
                                className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={productsInterested}
                                onChange={e => setProductsInterested(e.target.value)}
                                placeholder="Enter products separated by commas"
                            /> */}

                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                name="productsInterested"
                                value={productsInterested}
                                onChange={e => setProductsInterested(e.target.value)}
                            >
                                <option value="">Select a product category</option>
                                <option value="Handicrafts & Art">Handicrafts & Art</option>
                                <option value="Ayurvedic & Herbal Products">
                                    Ayurvedic & Herbal Products
                                </option>
                                <option value="Jewelry & Accessories">Jewelry & Accessories</option>
                                <option value="Food & Spices">Food & Spices</option>
                                <option value="Home & Decor">Home & Decor</option>
                            </select>
                        </div>

                {/* Update Button */}
                <button
                    type="submit"
                    className="w-full bg-brown-600 text-white py-2 rounded-lg hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500"
                >
                    UPDATE
                </button>
            </form>
        </div>
    </div>
</div>
    
)
}