import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Bg from '../assets/img/bg.png';
import { Link } from 'react-router-dom';
import { ReactComponent as Loading} from '../assets/img/loading.svg'
import { buildUrl } from '../utils/endpoint.js';

function Leaderboard() {
  const [ topScorers, getTopScorers ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  const getLeaderboard = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(buildUrl('/user/topScores'));
      getTopScorers(res.data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getLeaderboard();
  },[])

  return (
    <div>
      <Link to="/" className="cursor-pointer text-white font-main text-2xl bg-[#e33c71] py-2 px-4 rounded-md relative top-20 left-24">Back</Link>
      <img src={Bg} alt="" className="w-2/12 m-auto relative top-24"/>
      <div className="">
        <h1 className="text-center font-main font-bold relative top-24 text-white text-7xl animation m-auto">Top Garu48 Players!</h1>
        <div className="flex flex-col gap-4 place-content-center">
        <div className="m-auto">
          <div className="my-10 flex flex-row gap-20 place-content-center">
            <h1 className="text-center font-main font-bold relative top-24 text-white text-5xl" style={{width: "25%"}}>Rank</h1>
            <h1 className="text-center font-main font-bold relative top-24 text-white text-5xl" style={{width: "50%"}}>Name</h1>
            <h1 className="text-center font-main font-bold relative top-24 text-white text-5xl" style={{width: "25%"}}>Score</h1>
          </div>
          {isLoading ? <Loading className="m-auto relative top-32"/> : (
            <div className="flex flex-col gap-4 place-content-center">
              {topScorers.map((scores, index) => {
                return (
                <div key={index} className={`flex flex-row place-content-center gap-40 relative top-24 ${index + 1 === 1 ? "bg-[#747474]" : (index + 1 === 2 ? "bg-[#464646]" : (index + 1 === 3 ? "bg-[#242424]" : ""))} px-3 rounded-md`}>
                    <h1 className="text-center font-main font-bold text-white" style={{width: "10%"}}>{index + 1}</h1>
                    <h1 className="text-center font-main font-bold text-white" style={{width: "60%"}}>{scores.displayName}</h1>
                    <h1 className="text-center font-main font-bold text-white" style={{width: "30%"}}>{scores.score}</h1>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Leaderboard