/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import logo from '/src/assets/logo1.png';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';  
import './Navbar.css';
import { AuthContext } from '../pages/Auth/AuthContext';
import { CgProfile } from "react-icons/cg";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [panierCount, setPanierCount] = useState(0);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleToggle = () => {
    setIsOpen(!isOpen); 
  };

  // Récupérer le panier depuis le localStorage
  useEffect(() => {
    const panierFromLocalStorage = localStorage.getItem('panier');
    if (panierFromLocalStorage) {
      const panier = JSON.parse(panierFromLocalStorage);
      setPanierCount(panier.reduce((count, produit) => count + produit.quantite, 0));
    }
  }, []);

  return (
    <nav className='nav'>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Navigation des liens */}
      <ul className={isOpen ? 'show' : ''}>
        <li>
          <NavLink to="/" activeClassName="active">Accueil</NavLink>
        </li>
        <li>
          <NavLink to="/evenement" activeClassName="active">Événement</NavLink>
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
        <li>
          <NavLink to="/ressources" activeClassName="active">Ressources</NavLink>
        </li>
      </ul>

      {/* Boutons Connexion / Déconnexion */}
      <div className={`actionButtonLogin_Logout ${isOpen ? 'show' : ''}`}>
        <div className="cart">
          <NavLink to="/panier" className="panier-icon">
            <FaShoppingCart size={24} color="#009444" />
            {panierCount > 0 && <span className="panier-count">{panierCount}</span>}
          </NavLink>
        </div>
        {isLoggedIn ? (
          <div className="logged-in-options">
            <NavLink to="/profileUse" className="profil-link"> 
              <CgProfile size={30} color="#009444" />
            </NavLink>
            <button className="logout" onClick={logout}>Déconnexion</button>
          </div>
        ) : (
          <button className="button">
            <NavLink to="/login" className="connexion">Connexion</NavLink>
          </button>
        )}
      </div>

      {/* Burger Menu pour Mobile */}
      <div className={`burger ${isOpen ? 'toggle' : ''}`} onClick={handleToggle}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Navbar;
