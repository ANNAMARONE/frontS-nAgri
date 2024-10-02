/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom'; // Utilisation de NavLink pour les liens actifs
import './interfaceAdmin.css';
import { useNavigate } from 'react-router-dom'; // Pour la redirection après déconnexion

const AdminInterface = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Supprimer le token d'authentification
    localStorage.removeItem('token');
    // Rediriger vers la page de connexion
    navigate('/login');
  };

  return (
    <div className="admin-interface">
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Admin</h2>
          <button onClick={toggleSidebar} className="toggle-btn" aria-label={isSidebarOpen ? 'Fermer la sidebar' : 'Ouvrir la sidebar'}>
            {isSidebarOpen ? 'Fermer' : 'Ouvrir'}
          </button>
        </div>
        <ul className="sidebar-menu">
          <li><NavLink to="/dashboard" activeClassName="active">Tableau de bord</NavLink></li>
          <li><NavLink to="/ListeUtilisateur" activeClassName="active">Gestion utilisateur</NavLink></li>
          <li><NavLink to="/evenements" activeClassName="active">Gestion événement</NavLink></li>
          <li><NavLink to="/articles" activeClassName="active">Gestion article</NavLink></li>
          <li><NavLink to="/listeressources" activeClassName="active">Gestion ressources</NavLink></li>
          <li><NavLink to="/categories" activeClassName="active">Gestion catégorie</NavLink></li>
          <li><NavLink to="/listeforums" activeClassName="active">Gestion forum</NavLink></li>
          <li><NavLink to="/settings" activeClassName="active">Paramètres</NavLink></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <div className="navbar">
          <h1>Interface Admin</h1>
          <div className="navbar-links">
            <Link to="/profileAdmin">Profil</Link>
            {/* Utilisation d'un bouton pour la déconnexion */}
            <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
          </div>
        </div>

        {/* Page Content */}
        <div className="page-content">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default AdminInterface;
