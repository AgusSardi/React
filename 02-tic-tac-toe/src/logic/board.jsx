import { WINNER_COMBOS } from "../constants"

export const checkWinner = (boardToCheck) => {
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
  export const checkEndGame = (newBoard)=> {
    return newBoard.every((square)=>square != null)
  }