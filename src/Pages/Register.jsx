import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/img/bg.png';
import { buildUrl } from '../utils/endpoint.js';

function Register() {
  const [ displayName, setDisplayName ] = useState('');
  const [ username, setUserName ] = useState('');
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(buildUrl('/auth/register'), {
        displayName,
        username,
        password
    })

    console.log("Register successful!");
    navigate('/login');

    } catch(error) {
      console.log(error);
    }
  }
  return (
    <div>
        <div>
        <Link to="/"><img src={Logo} className="w-2/12 mt-10 m-auto" /></Link>
        <form onSubmit={handleSubmit} className="bg-[#747474] flex flex-col gap-4 font-main px-12 py-4 mt-20 rounded-md w-4/12 m-auto">
          <h1 className="font-bold text-4xl text-center text-white mb-6">Register</h1>
          <h1 className="text-sm text-[#41c9b8]">Enter Display Name</h1>
          <input type="text" placeholder="Input Username" className="py-2 pl-4 rounded-md bg-slate-400 text-white" required autoComplete="off" onChange={(e) => setDisplayName(e.target.value)}/>
          <h1 className="text-sm text-[#41c9b8]">Enter Username</h1>
          <input type="text" placeholder="Input Username" className="py-2 pl-4 rounded-md bg-slate-400 text-white" required autoComplete="off" onChange={(e) => setUserName(e.target.value)}/>
          <h1 className="text-sm text-[#e33c71]">Enter Password</h1>
          <input type="password" placeholder="Password" className="py-2 pl-4 rounded-md bg-slate-400 text-white" required autoComplete="off" onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" className="bg-[#41c9b8] py-2 rounded-md text-white mt-14">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register