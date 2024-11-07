/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '/src/components/pages/Auth/AuthContext'; // Assurez-vous que ce chemin est correct
import logo from '/src/assets/logo1.png';
import { FaShoppingCart } from 'react-icons/fa';  
import { CgProfile } from "react-icons/cg";
import './Navbar.css';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [panierCount, setPanierCount] = useState(0);
  
  const { isLoggedIn, logout } = useAuth(); // Utilisation de isLoggedIn ici

  const handleToggle = () => {
    setIsOpen(!isOpen); 
  };

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
      <ul className={isOpen ? 'show' : ''}>
        <li><NavLink to="/">Accueil</NavLink></li>
        <li><NavLink to="/evenement">Événements</NavLink></li>
        <li><NavLink to="/produit">Produits</NavLink></li>
        <li><NavLink to="/article">Articles</NavLink></li>
        <li><NavLink to="/forum">Forum</NavLink></li>
        <li><NavLink to="/ressources">Ressources</NavLink></li>
      </ul>
      <div className={`actionButtonLogin_Logout ${isOpen ? 'show' : ''}`}>
        <div className="cart">
          <NavLink to="/panier" className="panier-icon">
            <FaShoppingCart size={24} color="#009444" />
            {panierCount > 0 && <span className="panier-count">{panierCount}</span>}
          </NavLink>
        </div>
        {isLoggedIn ? (  // Changement ici
          <div className="logged-in-options">
            <NavLink to="/profileUse" className="profil-link">
              <CgProfile size={30} color="#009444" />
            </NavLink>
            <button className="logout" onClick={logout}>Déconnexion</button>
          </div>
        ) : (
          <NavLink to="/login" className="button">Connexion</NavLink>
        )}
      </div>
      <div className={`burger ${isOpen ? 'toggle' : ''}`} onClick={handleToggle}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Navbar;
