import { useSelector } from "react-redux"

export default function ProfileSeller () {

   const { seller } =  useSelector(State => State.sellerState);


    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
  <div className="w-full max-w-7xl flex bg-white rounded-3xl shadow-lg overflow-hidden h-[90vh]">
    {/* Left Side: Background Image */}
    <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/login.jpg')" }}></div>

    {/* Right Side: Profile Content */}
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
      {/* Profile Avatar and Edit Button */}
      <div className="flex flex-col items-center">
        <figure className="avatar avatar-profile">
          <img
            className="rounded-full w-32 h-32 object-cover border-2 border-gray-200"
            src={seller.avatar ?? './default.png'}
            alt="Profile"
          />    
        </figure>
        
      </div>

      {/* Profile Details */}
      <div className="mt-8">
        <h4 className="text-xl font-semibold text-gray-800">Full Name</h4>
        <p className="text-gray-600">{seller.name}</p>

        <h4 className="text-xl font-semibold text-gray-800 mt-4">Email Address</h4>
        <p className="text-gray-600">{seller.email}</p>

        <h4 className="text-xl font-semibold text-gray-800 mt-4">Joined Date</h4>
        <p className="text-gray-600">{String(seller.createdAt).substring(0,10)}</p>

        {/* Buttons */}
        <a
          href="#"
          className="mt-5 w-full bg-yellow-600 text-white py-2 rounded-lg text-center block hover:bg-blue-700 transition duration-300"
        >
          Edit Profile
        </a>
        <a
          href="#"
          className="mt-3 w-full bg-brown-600 text-white py-2 rounded-lg text-center block hover:bg-blue-700 transition duration-300"
        >
          Change Password
        </a>
      </div>
    </div>
  </div>
</div>
    )
}