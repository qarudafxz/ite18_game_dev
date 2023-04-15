import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Tile from './Tile';
import Cell from './Cell'
import GameOverlay from './GameOverlay';
import { Board } from '../helper/index.js';
import useEvent from '../hooks/useEvent.js';
import { getUserId } from '../helper/getUserId.js';
import { buildUrl } from '../utils/endpoint.js';

function BoardView() {
  const [ board, setBoard ] = useState(new Board());
  const [ lastScore , setLastScore ] = useState(0);
  const [ score, setScore ] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const userID = getUserId();

  const handleKeyDown = (e) => {
    if(board.hasWon()) {
      return;
    }

    if(e.keyCode >=37 && e.keyCode <= 40) {
      let direction = e.keyCode - 37;
      let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board)
      let newBoard = boardClone.move(direction);
      setBoard(newBoard);
    }
  }
  
  useEvent('keydown', handleKeyDown);

  const setScoreToDB = async () => {
    setScore(board.score);
    try {
      await axios.post(buildUrl(`/user/score/${userID}`),{
        score
      });
    } catch (e) {
      console.log("haha");
    }
  };

  async function getDisplayName() {
    try {
      const res = await axios.get(buildUrl(`/user/display-name/${userID}`));
      setDisplayName(res.data);
    } catch(e) {
      console.error(e);
    }
  }

  async function getScore() {
    try {
      const res = await axios.get(buildUrl(`/user/get-score/${userID}`), {
        score: board.score
      });
      setLastScore(res.data);
    } catch(e) {
      console.error(e);
    }
  }

  const cells = board.cells.map((row, rowIndex) => {
    return (
      <div key={rowIndex}>
        {row.map((col, colIndex) => {
          return <Cell key={rowIndex * board.size + colIndex}/>
        })}
      </div>
    )
  })

  const tiles = board.tiles.filter((tile) => tile.value !== 0).map((tile,index) => {
    return (
      <Tile tile={tile} key={index}/>
    )
  })

  const resetGame = () => {
    setBoard(new Board());
  }

  const logOut = () => {
    window.localStorage.removeItem("userID");
    window.location.href="/"
  }

  useEffect(() => {
    if(board.hasLost()) {
      setScoreToDB();
      getScore();
    }
  }, [board])

  useEffect(() => {
    getScore()
  }, [lastScore]);

  useEffect(() => {
    getDisplayName()
  },[])

  return (
    <div>
      <h1 className="text-center font-main font-bold relative top-24 text-white">Welcome to Garu48! <span className="bg-[#e33c71] py-2 px-4 rounded-md ml-4">{displayName}</span></h1>
      <div className="text-white font-main grid grid-cols-2 gap-5 relative top-32">
        <h1 className="resetButton" onClick={resetGame}>Reset Game</h1>
        <h1 className="resetButton" onClick={logOut}>Log out</h1>
        <div className="flex flex-col gap-2">
          <h2>Highest Score: {lastScore}</h2>
          <h2 className="bg-[#e33c71] font-bold px-3 rounded-sm">Current Score: {board.score}</h2>
        </div>
      </div>
        {cells}
      <div className="board">
        {tiles}
        <GameOverlay onRestart={resetGame} board={board}/>
      </div>
      {board.hasLost() && (
        <div>
          <h1 className="font-main text-white text-4xl font-bold relative -top-32 text-center bg-[#747474] py-2 rounded-md hover:bg-slate-900 duration-150 cursor-pointer" onClick={resetGame}>Try Again</h1>
        </div>
      )}
    </div>
  )
}



export default BoardView