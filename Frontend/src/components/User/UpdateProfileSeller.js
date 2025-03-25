import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import {updateProfileSeller , clearSellerError} from "../../Actions/sellerActions"

export default function UpdateProfileSeller () {
    const {loading , error , seller , isUpdatedSeller} = useSelector(state => state.sellerState);
    const  [name , setName] = useState("");
    const  [email , setEmail] = useState("");
    const  [avatar , setAvatar] = useState("");
    const  [avatarPreview , setAvatarPreview] = useState("/default.png");

    const dispatch =  useDispatch();

    const onChangeAvatar = (e) => {
        const reader = new FileReader;
            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0])
                }
            }

            reader.readAsDataURL(e.target.files[0])
    }

    const submitHandler =(e) => {
                e.preventDefault();
                const formData = new FormData ();
                formData.append('name' , name)
                formData.append('email' , email)
                formData.append('avatar' , avatar)
                dispatch(updateProfileSeller(formData))
    }

    useEffect(() => {
        if(seller){
            setName(seller.name);
            setEmail(seller.email);
            if(seller.avatar){
                setAvatarPreview(seller.avatar)
            }

        }

        if(isUpdatedSeller){
            toast('Profile updated Successfully',{
                type: 'success',
                position : 'bottom-center'
            })
            return;
        }

        if(error) {
            toast(error,{
                position : 'bottom-center',
                type : 'error',
                // onOpen : ()=>{ dispatch (clearSellerError)}
            })
            return
                }
    },[seller , isUpdatedSeller,error])




return(

    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
    <div className="w-full max-w-7xl flex bg-white rounded-3xl shadow-lg overflow-hidden h-[90vh]">
       

        {/* Right Side: Update Profile Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            {/* Title */}
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Update Profile</h1>
            <p className="text-center text-gray-600 mb-6">Update your profile information</p>

            {/* Update Profile Form */}
            <form onSubmit={submitHandler} className="space-y-6" encType="multipart/form-data">
                {/* Name Field */}
                <div>
                    <label htmlFor="name_field" className="block text-sm font-medium text-brown-600 text-left">Name</label>
                    <input
                        type="text"
                        id="name_field"
                        name="name"
                        className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email_field" className="block text-sm font-medium text-brown-600 text-left">Email</label>
                    <input
                        type="email"
                        id="email_field"
                        name="email"
                        className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                {/* Avatar Upload Field */}
                <div>
                    <label htmlFor="avatar_upload" className="block text-sm font-medium text-brown-600 text-left">
                        Avatar
                    </label>
                    <div className="flex items-center">
                        {/* Avatar Preview */}
                        <div>
                            <figure className="avatar mr-3">
                                <img
                                    src={avatarPreview}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                                    alt="Avatar Preview"
                                />
                            </figure>
                        </div>
                        {/* File Input */}
                        <div className="custom-file">
                            <input
                                type="file"
                                name="avatar"
                                className="hidden"
                                id="customFile"
                                onChange={onChangeAvatar}
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

                {/* Update Button */}
                <button
                    type="submit"
                    className="w-full bg-brown-600 text-white py-2 rounded-lg hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500"
                >
                    UPDATE
                </button>
            </form>
        </div>
         {/* Left Side: Background Image */}
         <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/login.jpg')" }}></div>
    </div>
</div>
    
)
}