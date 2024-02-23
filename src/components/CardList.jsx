import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card.jsx';
import './CardList.css';

function CardList({ cards }) {
  const [activeCard, setActiveCard] = useState(null);
  const [cardList, setCardList] = useState(cards);

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cardList));
  }, [cardList]);

  const handleSetActiveCard = (card) => {
    if (activeCard) {
      setCardList(prevList => [...prevList, activeCard]);
    }
    setActiveCard(card);
    setCardList(prevList => prevList.filter(c => c !== card));
  };

  const handleRemoveCard = (event, index) => {
    event.stopPropagation(); 
    const updatedCardList = [...cardList];
    updatedCardList.splice(index, 1);
    setCardList(updatedCardList);

    localStorage.setItem('cards', JSON.stringify(updatedCardList));
  };

  return (
    <div className="wallet-container">
      <h1 className='wallet-title'>E-WALLET</h1>

      {activeCard && (
        <div className="active-card-container active">
          <p className='active-title'>ACTIVE CARD</p>
          <Card card={activeCard} isActive={true} onRemove={() => handleRemoveCard()} />
        </div>
      )}

      <ul className="card-list">
        {cardList.map((card, index) => (
          <Card key={index} card={card} onClick={() => handleSetActiveCard(card)} isActive={card === activeCard} onRemove={(event) => handleRemoveCard(event, index)} />
        ))}
      </ul>   
      <Link to="/addcard" className="add-card-button">ADD A NEW CARD</Link>
    </div>
  );
}

export default CardList;
