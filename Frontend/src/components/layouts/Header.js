import React from "react";
import { FiSearch, FiShoppingCart, FiUser, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = ({ scrollToStories }) => {
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

        {/* Icons */}
        <div className="flex space-x-6">
          <FiSearch className="text-2xl text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300 cursor-pointer" />
          <FiShoppingCart className="text-2xl text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300 cursor-pointer" />
          <FiUser className="text-2xl text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300 cursor-pointer" />
        </div>

      </div>

    </nav>
  );
};

export default Header;