import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav className="navbar">
        <Link to="/">
          <p className="relative inline-block text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent overflow-hidden
          before:content-[''] before:absolute before:top-0 before:left-[-75%] before:h-full before:w-3/4
          before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent
          before:animate-[shine_1s_infinite]">
            RESUMATE
          </p>
        </Link>

        <Link to="/upload" className="ml-auto">
          <button className="px-6 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 
          text-white font-medium rounded-full shadow-md 
          hover:from-fuchsia-700 hover:to-purple-700 
          transition-all duration-300 transform hover:scale-105 
          focus:outline-none focus:ring-2 focus:ring-fuchsia-400">
          🚀 Upload Resume
          </button>
        </Link>


    </nav>
  )
}

export default Navbar