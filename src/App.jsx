import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import CardList from './components/CardList';
import AddCard from './components/AddCard';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);

  const handleAddCard = (newCard) => {
    setCards([...cards, newCard]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CardList cards={cards} />} />
          <Route path="/addcard" element={<AddCard onAddCard={handleAddCard} />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
