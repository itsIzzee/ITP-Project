import { useEffect, useState } from "react"
import { toast } from "react-toastify";

import { updatePasswordSeller as updatePasswordSellerAction ,clearSellerError} from "../../Actions/sellerActions";


import { useDispatch, useSelector } from "react-redux";

export default function UpdatePasswordSeller () {

    const [password,setPassword]=useState("");
    const [oldpassword,setOldPassword]=useState("");
    const dispatch = useDispatch();
    const {isUpdatedSeller , error} = useSelector(state => state.sellerState)
    
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('oldPassword',oldpassword)
        formData.append('password',password)
        dispatch(updatePasswordSellerAction(formData))
    }

    useEffect(() =>{
        if(isUpdatedSeller){
                toast('Password updated Successfully',{
                    type: 'success',
                    position : 'bottom-center'
                })

                setOldPassword("");
                setPassword("")
                return;
            }

               
            if(error) {
                toast(error,{
                    position : 'bottom-center',
                    type : 'error',
                    onOpen : ()=>{ dispatch (clearSellerError)}
                })
                return
                    }

    },[isUpdatedSeller, error ,dispatch])


    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
  <div className="w-full max-w-7xl flex bg-white rounded-3xl shadow-lg overflow-hidden h-[90vh]">
   

    {/* Right Side: Update Password Form */}
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Update Password</h1>
      <p className="text-center text-gray-600 mb-6">Change your password securely</p>

      <form onSubmit={submitHandler} className="space-y-6">
        {/* Old Password Field */}
        <div>
          <label htmlFor="old_password_field" className="block text-sm font-medium text-brown-600 text-left">
            Old Password
          </label>
          <input
            type="password"
            id="old_password_field"
            className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={oldpassword}
            onChange={e=>setOldPassword(e.target.value)}
          />
        </div>

        {/* New Password Field */}
        <div>
          <label htmlFor="new_password_field" className="block text-sm font-medium text-brown-600 text-left">
            New Password
          </label>
          <input
            type="password"
            id="new_password_field"
            className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="w-full bg-brown-600 text-white py-2 rounded-lg hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500"
        >
          Update Password
        </button>
      </form>
    </div>
     {/* Left Side: Background Image */}
     <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/login.jpg')" }}></div>
  </div>
</div>
    )
}