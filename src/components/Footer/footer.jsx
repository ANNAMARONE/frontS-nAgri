/* eslint-disable no-unused-vars */
import React from 'react';
import './footer.css'; 
import logo from '/src/assets/images/Logo2.png';
const Footer = () => {
    return (
        <footer className="footer">
          <div className="footer-container">
             {/* À propos de nous */}
             <div className="footer-section1">
             <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
              <h4>À propos de nous</h4>
              <p>OmniFert est une entreprise ghanéenne entièrement indigène qui se concentre sur l&apos;amélioration de la production agricole en Afrique.</p>
            </div>
            {/* Liens rapides */}
            <div className="footer-section">
              <h4>Liens rapides</h4>
              <ul>
                <li><a href="#">Nos services</a></li>
                <li><a href="#">Forum</a></li>
                <li><a href="#">À propos de nous</a></li>
                <li><a href="#">Contactez-nous</a></li>
              </ul>
            </div>
            
            {/* Derniers articles */}
            <div className="footer-section">
              <h4>Derniers articles</h4>
              <div className="article">
                <p>Press Statement OmniFert</p>
                <span> September 23, 2023</span>
              </div>
              <div className="article">
                <p>Omnifert Press Release</p>
                <span> September 23, 2023</span>
              </div>
              <div className="article">
                <p>Agriculture and Government Policy</p>
                <span> September 23, 2023</span>
              </div>
            </div>
    
            {/* Newsletter */}
            <div className="footer-section">
              <h4>Newsletter</h4>
              <form className="newsletter-form">
                <input type="email" placeholder="Entrer votre email" />
                <button type="submit"></button>
              </form>
              <p>Abonnez-vous maintenant</p>
            </div>
            
           
            
          </div>
    
          {/* Bas de page */}
          <div className="footer-bottom">
            <p>Copyright © 2024 sénAgri. Tous droits réservés.</p>
          </div>
        </footer>
      );
    };

export default Footer;
