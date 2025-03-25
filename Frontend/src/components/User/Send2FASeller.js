import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initiate2FASeller } from "../../Actions/sellerActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Send2FASeller() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { seller, message, error } = useSelector((state) => state.sellerState);

    const handleSend2FA = () => {
        dispatch(initiate2FASeller());
    };

    useEffect(() => {
        if (message) {
            toast.success(message,{
              position : 'bottom-center'
          });
            navigate("/verify2faSeller"); // Redirect to verification page
        }
        if (error) {
            toast(error,{
              position : 'bottom-center',
              type : 'error',
              // onOpen : ()=>{ dispatch (clearSellerError)}
          });
        }
    }, [message, error, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
        <div className="w-full max-w-7xl flex bg-white rounded-3xl shadow-lg overflow-hidden h-[90vh]">
         
      
          {/* Right Side: 2FA Request Section */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Two-Factor Authentication</h1>
            <p className="text-center text-gray-600 mb-6">
              Your email: <span className="font-semibold">{seller?.email}</span>
            </p>
      
            <button
              onClick={handleSend2FA}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Send 2FA Code
            </button>
          </div>
           {/* Left Side: Background Image */}
           <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/login.jpg')" }}></div>
        </div>
      </div>
      
    );
}
