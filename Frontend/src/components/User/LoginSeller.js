import { Fragment, useEffect, useState } from "react";
import MetaData from '../layouts/MetaData';
import { clearSellerError, loginSeller } from "../../Actions/sellerActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";


export default function LoginSeller(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch =  useDispatch();
    const navigate =  useNavigate();


    const { loading , error, isAuthenticatedSeller } = useSelector(state => state.sellerState)

    const submitHandler = (e)=> {
        e.preventDefault();
        dispatch(loginSeller(email,password))
    }

    useEffect(() => {
        if(isAuthenticatedSeller){
            navigate('/send2faSeller')   //navigate the buyers home page
        }

        if(error) {
            toast(error,{
                position : 'bottom-center',
                type : 'error',
                onOpen : ()=>{ dispatch (clearSellerError)}
            })
            return
        }
    },[error,isAuthenticatedSeller , dispatch])

   

    return (
        <Fragment>
    <MetaData title={`Login Seller`} />
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
        <div className="w-full max-w-7xl flex bg-white rounded-3xl shadow-lg overflow-hidden h-[90vh]"> {/* Adjusted height */}
            {/* Left Side: Background Image */}
           

            {/* Right Side: Login Form */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center"> {/* Centered form vertically */}
                <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Welcome back Seller!</h1>
                <p className="text-center text-gray-600 mb-6">Enter your Credentials to access your account</p>
                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label htmlFor="email_field" className="block text-sm font-medium text-brown-600 text-left">Email address</label>
                        <input
                            type="email"
                            id="email_field"
                            className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password_field" className="block text-sm font-medium text-brown-600 text-left">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center">
                        <Link to="/password/forgotSeller" className="text-blue-600 hover:text-blue-500 ml-auto text-sm">Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-brown-600 text-white py-2 rounded-lg hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <div className="text-center text-sm text-gray-600">
                        <p>Don't have an account? <Link to="/registerSeller" className="text-blue-600 hover:text-blue-500">Sign Up</Link></p>
                    </div>
                </form>
            </div>
            <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/login.jpg')" }}></div>
        </div>
    </div>
</Fragment>
    )
}