import React from "react";
import { FiSearch, FiShoppingCart, FiUser, FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {DropdownButton , Dropdown , Image }  from 'react-bootstrap'
import { logout } from "../../Actions/userActions";
import { logoutSeller } from "../../Actions/sellerActions";

const Header = ({ scrollToStories }) => {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { isAuthenticatedSeller, seller } = useSelector((state) => state.sellerState);
const dispatch = useDispatch();
const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout)
     navigate('/home')
  }
  const logoutSellerHandler = () => {
    dispatch(logoutSeller)
     navigate('/home')
  }

  


  return (
    <nav className="relative bg-[#704214] shadow-md py-4">
      {/* Navbar Container */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-10">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-[#F5E1C9] tracking-wide">
          Rootsly
        </h1>

        {/* Navigation Links */}
        <div className="flex space-x-8 text-lg font-medium">
          {/* Product Dropdown */}
          <div className="relative group">
            <button className="flex items-center text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300">
              Product <FiChevronDown className="ml-2 text-sm" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute left-0 mt-2 w-44 bg-[#5A3821] shadow-lg rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition duration-300">
              <Link to="#" className="block px-4 py-2 text-[#F5E1C9] hover:bg-[#8C6B52] transition">
                Tea Collection
              </Link>
              <Link to="#" className="block px-4 py-2 text-[#F5E1C9] hover:bg-[#8C6B52] transition">
                Spices
              </Link>
              <Link to="#" className="block px-4 py-2 text-[#F5E1C9] hover:bg-[#8C6B52] transition">
                Handmade Goods
              </Link>
            </div>
          </div>

          <Link to="/about" className="text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300">
            About
          </Link>
          <button onClick={scrollToStories} className="text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300">
            Our Stories
          </button>
          <Link to="/contact" className="text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300">
            Contact Us
          </Link>
        </div>

        {/* Icons and Additional Links */}
        <div className="flex space-x-6 items-center">
          {/* Search Icon */}
          <FiSearch className="text-2xl text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300 cursor-pointer" />

          {/* Cart Icon */}
          <FiShoppingCart className="text-2xl text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300 cursor-pointer" />

          {/* Conditional Rendering for Buyer/Seller Dropdowns */}
          {isAuthenticated || isAuthenticatedSeller ? (
            // If authenticated (either as buyer or seller), show the logged-in message
            <div className="flex items-center space-x-4">
              <span className="text-[#F5E1C9]">
                {isAuthenticated ? 
                  (
                    <Dropdown className='dropdown-container d-inline'>
                      <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                        <figure className='avatar avatar-nav'>
                          <Image width="50px" src={user?.avatar} />
                        </figure>
                        <span>{user?.name}</span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                          <Dropdown.Item onClick={() => {navigate('/myprofile')}} className="text">Profile</Dropdown.Item>
                          <Dropdown.Item onClick={logoutHandler} className="text-danger">Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

               

      )
                
                
                :  (
                  <Dropdown className='dropdown-container d-inline'>
                    <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                      <figure className='avatar avatar-nav'>
                        <Image width="50px" src={seller?.avatar} />
                      </figure>
                      <span>{seller?.name}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {navigate('/profileseller')}} className="text">Profile</Dropdown.Item>
                      <Dropdown.Item onClick={logoutSellerHandler} className="text-danger">Logout</Dropdown.Item>

                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </span>
              <FiUser className="text-2xl text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300 cursor-pointer" />
            </div>
          ) : (
            // If not authenticated, show the Buyer and Seller dropdowns
            <>
              {/* Buyer Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300">
                  Buyer <FiChevronDown className="ml-2 text-sm" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-44 bg-[#5A3821] shadow-lg rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition duration-300">
                  <Link to="/login" className="block px-4 py-2 text-[#F5E1C9] hover:bg-[#8C6B52] transition">
                    Login
                  </Link>
                  <Link to="/register" className="block px-4 py-2 text-[#F5E1C9] hover:bg-[#8C6B52] transition">
                    Register
                  </Link>
                </div>
              </div>
              <p>  </p>
              {/* Seller Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300">
                  Seller <FiChevronDown className="ml-2 text-sm" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-44 bg-[#5A3821] shadow-lg rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition duration-300">
                  <Link to="/loginseller" className="block px-4 py-2 text-[#F5E1C9] hover:bg-[#8C6B52] transition">
                    Login
                  </Link>
                  <Link to="/registerseller" className="block px-4 py-2 text-[#F5E1C9] hover:bg-[#8C6B52] transition">
                    Register
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;