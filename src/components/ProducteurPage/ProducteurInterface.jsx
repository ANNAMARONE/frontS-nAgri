import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom'; // Utilisation de NavLink pour les liens actifs
import './ProducteurInterface.css';

const ProducteurInterface = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Gérer l'ouverture et la fermeture de la sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-interface">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Admin</h2>
          <button onClick={toggleSidebar} className="toggle-btn" aria-label={isSidebarOpen ? 'Fermer la sidebar' : 'Ouvrir la sidebar'}>
            {isSidebarOpen ? 'Fermer' : 'Ouvrir'}
          </button>
        </div>
        <ul className="sidebar-menu">
          <li><NavLink to="/dashboard" activeClassName="active">Tableau de bord</NavLink></li>
          <li><NavLink to="/ajoutProduit" activeClassName="active">Ajouter produit</NavLink></li>
          <li><NavLink to="/users" activeClassName="active">Utilisateurs</NavLink></li>
          <li><NavLink to="/AfficherProduit" activeClassName="active">Afficher produit</NavLink></li>
          <li><NavLink to="/settings" activeClassName="active">Paramètres</NavLink></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <div className="navbar">
          <h1>Interface Admin</h1>
          <div className="navbar-links">
            <Link to="/profile">Profil</Link>
            <Link to="/logout">Déconnexion</Link>
          </div>
        </div>

        {/* Page Content */}
        <div className="page-content">
          <Outlet/> {/* Outlet pour rendre les composants enfants */}
        </div>
      </div>
    </div>
  );
};

export default ProducteurInterface;
