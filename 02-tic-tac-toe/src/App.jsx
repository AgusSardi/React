import { useState, useEffect } from 'react'
import './App.css'

import { Square } from './components/Square.jsx'
import { TURNS, WINNER_COMBOS } from './constants.jsx'
import { checkWinner } from './logic/board.jsx'
import { WinnerModal } from './components/WinnerModal.jsx'
import { checkEndGame } from './logic/board.jsx'
import { resetGameStorage, saveGameToStorage } from './logic/storage.jsx'

import confetti from 'canvas-confetti'



function App() {

  // Pizarra
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  // Turnos
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? turnFromStorage : TURNS.X
  })

  // Ganador (Null para sin ganador, false para empate)
  const [winner, setWinner] = useState(null)

  
  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }
  



  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameToStorage({board: newBoard, turn: newTurn})

    const newWinner = checkWinner(newBoard) // newBoard y no Board ya que board se actualiza de forma As[incrona]
    if (newWinner){
      confetti()
      setWinner(newWinner) // Actualizacion del estado es ASINCRONO
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  useEffect(()=>{
    console.log('UseEffect')
  }, [winner == TURNS.X])

  return(
    <main className='board'>
      <h1>Tic Tac Toe</h1>

      <button onClick={resetGame}>Reset del Juego</button>

      <section className='game'>
        {board.map((_, index) => {
          return(
            <div className='cell' key={index}> 
                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                >
                  {board[index]}
                </Square>
            </div>
          )
        })}
      </section>


      <section className='turn'>
        <Square isSelected={turn==TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn==TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
