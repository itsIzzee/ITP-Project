import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, resetPassword } from "../../Actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword(){
    

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const {isAuthenticated , error} = useSelector(state => state.authState);
    const navigate = useNavigate();
    const { token }=useParams();

    const submitHandler = (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('password',password);
            formData.append('confirmPassword',confirmPassword);
            dispatch(resetPassword(formData,token))
    }

    useEffect(()=>{
        if(isAuthenticated) {
            toast('Password Reset Success',{
                type: 'success',
                position : 'bottom-center'
            })
            navigate('/home')
            return;
        }

         if(error) {
            toast(error,{
                position : 'bottom-center',
                type : 'error',
                onOpen : ()=>{ dispatch (clearAuthError)}
            })
            return
                }
    },[isAuthenticated,error,dispatch   ])


    return(
<div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
  <div className="w-full max-w-7xl flex bg-white rounded-3xl shadow-lg overflow-hidden h-[90vh]">
    {/* Left Side: Background Image */}
    <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/login.jpg')" }}></div>

    {/* Right Side: New Password Form */}
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">New Password</h1>
      <p className="text-center text-gray-600 mb-6">Set a new password for your account</p>

      <form onSubmit={submitHandler} className="space-y-6">
        {/* Password Field */}
        <div>
          <label htmlFor="password_field" className="block text-sm font-medium text-brown-600 text-left">
            Password
          </label>
          <input
            type="password"
            id="password_field"
            className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirm_password_field" className="block text-sm font-medium text-brown-600 text-left">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password_field"
            className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Set Password Button */}
        <button
          type="submit"
          className="w-full bg-brown-600 text-white py-2 rounded-lg hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500"
        >
          Set Password
        </button>
      </form>
    </div>
  </div>
</div>


    )
}