import PropTypes from 'prop-types';




export const Square = ({children, isSelected, updateBoard, index}) => {

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
  
Square.propTypes = {
    children: PropTypes.node.isRequired,           // Cualquier tipo de elemento React (string, number, JSX, etc.)
    isSelected: PropTypes.bool.isRequired,         // Debe ser un booleano
    updateBoard: PropTypes.func.isRequired,        // Debe ser una función
    index: PropTypes.number.isRequired             // Debe ser un número
}