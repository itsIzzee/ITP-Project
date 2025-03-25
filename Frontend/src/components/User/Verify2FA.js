import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verify2FA } from "../../Actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Verify2FA() {
    const [code, setCode] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { is2FAVerified, error } = useSelector((state) => state.authState);

    const handleVerify = (e) => {
        e.preventDefault();
        dispatch(verify2FA(code));
    };

    useEffect(() => {
        if (is2FAVerified) {
            toast.success("2FA Verification Successful!",{
              position : 'bottom-center'});
            navigate("/"); // Redirect to home after success
        }
        if (error) {
            toast(error,{
              position : 'bottom-center',
              type : 'error',
              // onOpen : ()=>{ dispatch (clearSellerError)}
          });
        }
    }, [is2FAVerified, error, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
        <div className="w-full max-w-7xl flex bg-white rounded-3xl shadow-lg overflow-hidden h-[90vh]">
          {/* Left Side: Background Image */}
          <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/login.jpg')" }}></div>
      
          {/* Right Side: Verification Code Form */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Enter Verification Code</h1>
            <p className="text-center text-gray-600 mb-6">Check your email for the 6-digit code</p>
      
            <form onSubmit={handleVerify} className="space-y-6">
              {/* Code Input Field */}
              <div>
                <label htmlFor="code_field" className="block text-sm font-medium text-gray-600 text-left">
                  Enter Code
                </label>
                <input
                  type="text"
                  id="code_field"
                  className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength="6"
                />
              </div>
      
              {/* Verify Button */}
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Verify Code
              </button>
            </form>
          </div>
        </div>
      </div>
      
    );
}
