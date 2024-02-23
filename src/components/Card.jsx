// Card.js
import React from 'react';
import magneticStripeIcon from '../assets/magnetic-stripe.svg';
import './CardList.css';

function Card({ card, onClick, isActive, onRemove }) {
    console.log(card);
  if (!card) {
    return (
      <li className="inactive empty-card">
        <div className="card empty-card">
          <div className='row1'>
            <img src={magneticStripeIcon} alt="Magnetic Stripe Icon" className="magnetic-stripe-icon" />
            <div className="card-name">EMPTY CARD</div>
          </div>
        </div>
      </li>
    );
  }
  const formattedCardNumber = card.cardNumber
  .match(/.{1,4}/g) 
  .join(' ');

  const vendorName = card.vendor ? card.vendor : "Unknown Vendor";
  return (
    <li onClick={onClick} className={isActive ? "active" : "inactive"}>
      <div className={`card ${vendorName.toLowerCase().replace(/ /g, '-')}`}>
        <div className='row1'>
          <img src={magneticStripeIcon} alt="Magnetic Stripe Icon" className="magnetic-stripe-icon" />
          <div className="card-name">{vendorName}</div>
        </div>
        <div className="card-details">
          <div className="card-number">{formattedCardNumber}</div>
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
          {!isActive && <button className='removeBtn' onClick={(event) => onRemove(event)}>Remove Card</button>}
        </div>
      </div>
    </li>
  );
}

export default Card;
