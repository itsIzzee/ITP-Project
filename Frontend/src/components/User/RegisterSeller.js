import { Fragment, useEffect, useState } from "react";
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from "react-redux";
import { registerSeller , clearSellerError } from "../../Actions/sellerActions";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


export default function RegisterSeller(){

    const [sellerData , setSellerData] = useState({
        name : "",
        email : "",
        password : "",
    });

    const [avatar , setAvatar] = useState();
    const [avatarPreview , setAvatarPreview] = useState("/default.png");
    const dispatch = useDispatch();
    const { loading , error , isAuthenticatedSeller } = useSelector (state => state.sellerState)
    const navigate = useNavigate();


    const onChange  = (e) => {
        if(e.target.name === 'avatar'){
            const reader = new FileReader;
            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0])
                }
            }

            reader.readAsDataURL(e.target.files[0])
        }

        else{
            setSellerData({...sellerData, [e.target.name] : e.target.value})
        }
    }


     const submitHandler = (e) => {
            e.preventDefault();
            const formData = new FormData ();
            formData.append('name' , sellerData.name)
            formData.append('email' , sellerData.email)
            formData.append('password' , sellerData.password)
            formData.append('avatar' , avatar)
            dispatch(registerSeller(formData))
        }

            useEffect(()=>{
                if(isAuthenticatedSeller){
                    navigate('/loginSeller');
                    return
                }
        
                if(error) {
                    toast(error,{
                        position : 'bottom-center',
                        type : 'error',
                        onOpen : ()=>{ dispatch (clearSellerError)}
                    })
                    return
                        }
        
            },[error , isAuthenticatedSeller])

  return(
        <Fragment>
            <MetaData title={`Register Seller`} />
        <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
            <div className="w-full max-w-7xl flex bg-white rounded-3xl shadow-lg overflow-hidden h-[90vh]">
           
            {/* Right Side: Registration Form */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Register as a Seller</h1>
                <p className="text-center text-gray-600 mb-6">Create your account to get started</p>

                <form onSubmit={submitHandler} className="space-y-6" encType="multipart/form-data">
                {/* Name Field */}
                <div>
                    <label htmlFor="name_field" className="block text-sm font-medium text-brown-600 text-left">Name</label>
                    <input
                    name="name"
                    onChange={onChange}
                    type="text"
                    id="name_field"
                    className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    />
                </div>
        
                {/* Email Field */}
                <div>
                    <label htmlFor="email_field" className="block text-sm font-medium text-brown-600 text-left">Email</label>
                    <input
                    name="email"
                    onChange={onChange}
                    type="email"
                    id="email_field"
                    className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    />
                </div>
        
                {/* Password Field */}
                <div>
                    <label htmlFor="password_field" className="block text-sm font-medium text-brown-600 text-left">Password</label>
                    <input
                    name="password"
                    onChange={onChange}
                    type="password"
                    id="password_field"
                    className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    />
                </div>
        
               {/* Avatar Upload Field */}
                <div>
                <label htmlFor="avatar_upload" className="block text-sm font-medium text-brown-600 text-left">
                    Avatar
                </label>
                <div className="flex items-center">
                    <div>
                    <figure className="avatar mr-3">
                        <img
                        src={avatarPreview}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                        alt="Avatar"
                        />
                    </figure>
                    </div>
                    <div className="custom-file">
                    <input
                        
                        type="file"
                        name="avatar"
                        onChange={onChange}
                        className="hidden"
                        id="customFile"
                    />
                    <label
                        htmlFor="customFile"
                        className="px-4 py-2 bg-white text-brown-600 rounded-lg border-2 border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        Choose Avatar
                    </label>
                    </div>
                </div>
                </div>
        
                {/* Register Button */}
                <button
                    type="submit"
                    className="w-full bg-brown-600 text-white py-2 rounded-lg hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500"
                    disabled = {loading}
                >
                    REGISTER
                </button>
        
                {/* Sign In Link */}
                <div className="text-center text-sm text-gray-600">
                    <p>Already have an account? <a href="#" className="text-blue-600 hover:text-blue-500">Sign In</a></p>
                </div>
                </form>
            </div>
            {/* Left Side: Background Image */}
            <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/login.jpg')" }}></div>
            </div>

            
        </div>
        </Fragment>
    )
}




