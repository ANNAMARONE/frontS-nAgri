/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'; 

const ProducteurInterface = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate(); 

  // Fonction pour basculer l'état de la sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    
    localStorage.removeItem('token');
    
    // Rediriger vers la page de connexion
    navigate('/login');
  };

  return (
    <div className="admin-interface">
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Producteur</h2>
          <button 
            onClick={toggleSidebar} 
            className="toggle-btn" 
            aria-label={isSidebarOpen ? 'Fermer la sidebar' : 'Ouvrir la sidebar'}
          >
            {isSidebarOpen ? 'Fermer' : 'Ouvrir'}
          </button>
        </div>
        <ul className="sidebar-menu">
          <li><NavLink to="/dashboard" activeClassName="active">Tableau de bord</NavLink></li>
          <li><NavLink to="/ajoutProduit" activeClassName="active">Ajouter produit</NavLink></li>
          <li><NavLink to="/producteurs" activeClassName="active">Autre producteurs</NavLink></li>
          <li><NavLink to="/AfficherProduit" activeClassName="active">Afficher produit</NavLink></li>
          <li><NavLink to="/commandes" activeClassName="active">Commandes</NavLink></li>
          <li><NavLink to="/settings" activeClassName="active">Paramètres</NavLink></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <div className="navbar">
          <h1>Interface Producteur</h1>
          <div className="navbar-links">
            <Link to="/profile">Profil</Link>
            {/* Appeler la fonction handleLogout lors du clic sur Déconnexion */}
            <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
          </div>
        </div>

        {/* Page Content */}
        <div className="page-content">
          <Outlet/> 
        </div>
      </div>
    </div>
  );
};

export default ProducteurInterface;
