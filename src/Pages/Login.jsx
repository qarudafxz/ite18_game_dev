import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../assets/img/bg.png';
import axios from 'axios';
import { useCallback } from "react";
import Particles from "react-particles";

function Login() {
  const [ username, setUserName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isPassIncorrect, setIsPassIncorrect ] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/auth/login', {
        username,
        password
    })
    
    window.localStorage.setItem('userID', res.data.userID);
    navigate('/game');
    }catch(err) {
      setIsPassIncorrect(true);
      return;
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setIsPassIncorrect(false);
    }, 1500);
  },[isPassIncorrect]);
  
  return (
    <div>
      <Link to="/"><img src={Logo} className="w-2/12 mt-10 m-auto" /></Link>
      <form onSubmit={handleSubmit} className="bg-[#747474] flex flex-col gap-4 font-main px-12 py-4 mt-20 rounded-md w-4/12 m-auto">
        <h1 className="font-bold text-4xl text-center text-white">Login</h1>
        <h1 className="text-sm text-[#41c9b8]">Enter Username</h1>
        <input type="text" placeholder="Input Username" className="py-2 pl-4 rounded-md bg-slate-400 text-white" required autoComplete="off" onChange={(e) => setUserName(e.target.value)}/>
        <h1 className="text-sm text-[#e33c71]">Enter Password</h1>
        <input type="password" placeholder="Password" className="py-2 pl-4 rounded-md bg-slate-400 text-white" required autoComplete="off" onChange={(e) => setPassword(e.target.value)}/>
        {isPassIncorrect && <p className="text-white text-sm">Incorrect username or password</p>}
        <button type="submit" className="bg-[#41c9b8] py-2 rounded-md text-white mt-14">Login</button>
      </form>
    </div>
  )
}

export default Login