import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword , clearAuthError} from "../../Actions/userActions";
import { toast } from "react-toastify";

export default function ForgotPassword(){

    const [email , setEmail] = useState("");
    const dispatch= useDispatch();
    const {loading , error, user , message} = useSelector(state => state.authState)

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email',email);
        dispatch(forgotPassword(formData))
    }

    useEffect(()=>{
        if(message){
            toast(message,{
                type: 'success',
                position : 'bottom-center'
            })
            setEmail("");
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
    },[message,error,dispatch])


    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
  <div className="w-full max-w-7xl flex bg-white rounded-3xl shadow-lg overflow-hidden h-[90vh]">
    {/* Left Side: Background Image */}
    <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/login.jpg')" }}></div>

    {/* Right Side: Forgot Password Form */}
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Forgot Password</h1>
      <p className="text-center text-gray-600 mb-6">Enter your email to reset your password</p>

      <form onSubmit={submitHandler} className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email_field" className="block text-sm font-medium text-brown-600 text-left">
            Enter Email
          </label>
          <input
            type="email"
            id="email_field"
            className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
        </div>

        {/* Send Email Button */}
        <button
          type="submit"
          className="w-full bg-brown-600 text-white py-2 rounded-lg hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500"
        >
          Send Email
        </button>
      </form>
    </div>
  </div>
</div>
    )
}