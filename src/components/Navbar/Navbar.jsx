import React, { useState } from 'react';
import logo from '/src/assets/logo1.png';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <ul className={isOpen ? 'show' : ''}>
        <li>
          <NavLink to="/" activeClassName="active">Accueil</NavLink>
        </li>
        <li>
          <NavLink to="/evenement" activeClassName="active">Évenement</NavLink>
        </li>
        <li>
          <NavLink to="/produit" activeClassName="active">Produit</NavLink>
        </li>
        <li>
          <NavLink to="/article" activeClassName="active">Articles</NavLink>
        </li>
        <li>
          <NavLink to="/forum" activeClassName="active">Forum</NavLink>
        </li>
      </ul>

      <button className="button">
        <NavLink to="/login" className="connexion">Connexion</NavLink>
      </button>

      <div className={`burger ${isOpen ? 'toggle' : ''}`} onClick={handleToggle}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Navbar;
