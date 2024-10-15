import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const artists = [
  { artist_name: 'Umek', artist_uuid: 'c803da56-c6bd-4c61-addb-f1063544a1a2' },
  { artist_name: 'Taylor Swift', artist_uuid: 'fb092561-f572-49ed-b75e-b4853f65aa09' },
  { artist_name: 'Ariana Grande', artist_uuid: '594937dc-5c57-44cd-9a38-8c27656846e7' }
];

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">Artists Analytics</NavLink>
      <ul className="nav-links">
        {artists.map((artist) => (
          <li key={artist.artist_uuid}>
            <NavLink 
              to={`/${artist.artist_uuid}`} 
              className={({ isActive }) => isActive ? 'active' : undefined}
            >
              {artist.artist_name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
