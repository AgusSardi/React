import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const TURNS = {
  X: 'x',
  O: 'o'
}


const Square = ({children, isSelected, updateBoard, index}) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

// Combinaciones Ganadoras
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]




function App() {

  // Pizarra
  const [board, setBoard] = useState(Array(9).fill(null))

  // Turnos
  const [turn, setTurn] = useState(TURNS.X)

  // Ganador (Null para sin ganador, false para empate)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if (boardToCheck[a] &&
          boardToCheck[a] == boardToCheck[b] &&
          boardToCheck[a] == boardToCheck[c]
      ) {
        return boardToCheck[a] // X u O
      }
    }
    return null // Si no hay ganador
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard) // newBoard y no Board ya que board se actualiza de forma As[incrona]
    if (newWinner){
      alert(`El ganador es ${newWinner}`)
      setWinner(newWinner) // Actualizacion del estado es ASINCRONO
    }
  }

  return(
    <main className='board'>
      <h1>Tic Tac Toe</h1>

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
    </main>
  )
}

export default App
