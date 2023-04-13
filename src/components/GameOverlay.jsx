import React from 'react'

function GameOverlay({ board }) {
  if(board.hasWon()) {
    return <div className="tile2048"> </div>
  } else if(board.hasLost()) {
    return <div className="gameOver">

    </div>
  }
  return (
    null
  )
}

export default GameOverlay