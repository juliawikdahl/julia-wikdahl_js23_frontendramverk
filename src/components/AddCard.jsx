import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AddCard.css';

function AddCard({ onAddCard }) {
  const [vendor, setVendor] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardholder, setCardholder] = useState('');
  const [validThru, setValidThru] = useState('');
  const [ccv, setCcv] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleVendorChange = (event) => {
    setVendor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/^\d{16}$/.test(cardNumber)) {
      setErrorMessage('Card Number must be 16 digits.');
      return;
    }
    if (!/^[a-zA-Z ]+$/.test(cardholder)) {
      setErrorMessage('Card Holder may only contain letters and spaces.');
      return;
    }

  const currentYear = new Date().getFullYear() % 100;
  const [inputMonth, inputYear] = validThru.split('/');
  const inputMonthNumber = parseInt(inputMonth, 10);
  const inputYearNumber = parseInt(inputYear, 10);
  if (
    isNaN(inputMonthNumber) ||
    isNaN(inputYearNumber) ||
    inputMonthNumber < 1 || inputMonthNumber > 12 ||
    inputYearNumber < currentYear || inputYearNumber > currentYear + 20
  ) {
    setErrorMessage('Ogiltigt datumformat eller datumet är i det förflutna. Använd formatet MM/YY.');
    return;
  }

    if (!/^\d{3}$/.test(ccv)) {
        setErrorMessage('CCV must be 3 digits.');
        return;
    }
  
    const newCard = {
      vendor,
      cardNumber,
      cardholder,
      validThru,
      ccv
    };

    const existingCards = JSON.parse(localStorage.getItem('cards')) || [];
  localStorage.setItem('cards', JSON.stringify([...existingCards, newCard]));

    onAddCard(newCard);
    setVendor('');
    setCardNumber('');
    setCardholder('');
    setValidThru('');
    setCcv('');
    setErrorMessage('');
  };

  return (
    <div className="add-card-container">
      <h1>ADD A NEW BANK CARD</h1>
      <form onSubmit={handleSubmit}>
      
        <div>
          <label>Card Number:</label>
          <input type="text" placeholder='XXXXXXXXXXXXXXXX' value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="input-field" />
        </div>
        <div>
          <label>Cardholder:</label>
          <input type="text" placeholder='FIRSTNAME LASTNAME' value={cardholder} onChange={(e) => setCardholder(e.target.value)} className="input-field" />
        </div>
       

        <div className='bank-info'>
        <div className='expire'>
          <label>VALID THRU:</label>
          <input type="text" placeholder='MM/YY' value={validThru} onChange={(e) => setValidThru(e.target.value)} className="input-field" />
        </div>

        <div className='ccv'>
          <label>CCV:</label>
          <input type="text" placeholder='123' value={ccv} onChange={(e) => setCcv(e.target.value)} className="input-field" />
        </div>
        </div>

        <div>
          <label>Vendor:</label>
          <select value={vendor} onChange={handleVendorChange} className="vendor-select">
            <option value="">Select Vendor</option>
            <option value="Bitcoin Inc">Bitcoin Inc</option>
            <option value="Ninja Bank">Ninja Bank</option>
            <option value="Block Chain Inc">Block Chain Inc</option>
            <option value="Evil Corp">Evil Corp</option>
          </select>
        </div>
        <button type="submit" className="add-card">ADD CARD</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <Link to="/" className="go-back-link">Go Back</Link>
    </div>
  );
}

export default AddCard;
