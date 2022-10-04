import React from 'react'

const Card = ({pokemon}) => {
  return (
    <div className="card">
        <div className="cardImg">
            <img src={pokemon.sprites.front_default} alt=""/>
        </div>
    </div>
  )
}

export default Card;