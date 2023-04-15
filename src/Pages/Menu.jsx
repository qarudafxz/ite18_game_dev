import React from 'react'
import { Link } from 'react-router-dom';
import Bg from '../assets/img/bg.png';

function Menu() {
  return (
    <div>
      <img src={Bg} alt="Garu48" className="w-9/12 m-auto relative top-10"/>
      <div className="flex flex-row gap-10 mt-16 place-content-center">
        <Link to="/login" className="text-white font-main text-2xl font-bold bg-[#e33c71] px-6 py-4 rounded-md hover:bg-[#ad2853] duration-150">Login</Link>
        <Link to="/register" className="text-white font-main text-2xl font-bold bg-[#41c9b8] px-6 py-4 rounded-md hover:bg-[#288a7e] duration-150">Register</Link>
        <Link to="/leaderboards" className="text-white font-main text-2xl font-bold bg-[#41c9b8] px-6 py-4 rounded-md hover:bg-[#288a7e] duration-150">Leaderboards</Link>
      </div>
      <h1 className="font-main text-white text-md text-center mt-24">Made with ♡ by <span className="animation font-bold">Francis Tin-ao</span> | A completion for ITE18 Game Development</h1>
    </div>
  )
}

export default Menu