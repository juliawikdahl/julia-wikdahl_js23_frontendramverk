import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import magneticStripeIcon from '../assets/magnetic-stripe.svg';
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
          <div className={`card ${activeCard.vendor.toLowerCase().replace(/ /g, '-')}`}>
          <div className='row1'>
                <img src={magneticStripeIcon} alt="Magnetic Stripe Icon" className="magnetic-stripe-icon" />
                <div className="card-name">{activeCard.vendor}</div>
              </div>
            <div className="card-details">
              <div className="card-number">{activeCard.cardNumber}</div>
              <div className="card-info">
              <div className='name'>
                    <p>CARDHOLDER NAME</p>
                    <div className="card-holder">{activeCard.cardholder.toUpperCase()}</div>
                  </div>
                  <div className='valid'>
                    <p>VALID THRU</p>
                    <div className="valid-thru">{activeCard.validThru}</div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ul className="card-list">
        {cardList.map((card, index) => (
          <li key={index} onClick={() => handleSetActiveCard(card)} className="inactive">
            <div className={`card ${card.vendor.toLowerCase().replace(/ /g, '-')}`}>
            <div className='row1'>
                <img src={magneticStripeIcon} alt="Magnetic Stripe Icon" className="magnetic-stripe-icon" />
                <div className="card-name">{card.vendor}</div>
              </div>
              <div className="card-details">
                <div className="card-number">{card.cardNumber}</div>
                <div className="card-info">
                <div className='name'>
                    <p>CARDHOLDER NAME</p>
                    <div className="card-holder">{card.cardholder.toUpperCase()}</div>
                  </div>
                  <div className='valid'>
                    <p>VALID THRU</p>
                    <div className="valid-thru">{card.validThru}{card.expireYear}</div>
                  </div>
                 
                </div>
                <button className='removeBtn' onClick={(event) => handleRemoveCard(event, index)}>Remove Card</button>
              </div>
             
            </div> 
          </li>
        ))}
      </ul>   
        <Link to="/addcard" className="add-card-button">ADD A NEW CARD</Link>
    </div>
    
  );
}

export default CardList;
