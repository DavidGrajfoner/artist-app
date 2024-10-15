import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ArtistCard from './components/ArtistCard/ArtistCard';
import './App.css';
import Home from './components/Home/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/:artist_uuid" element={ <ArtistCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
