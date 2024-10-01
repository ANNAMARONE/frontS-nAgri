/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom'; // Utilisation de NavLink pour les liens actifs
import './interfaceAdmin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AdminInterface = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/auth/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                },
            });

            localStorage.removeItem('token');

            navigate('/login');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
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
          <li><NavLink to="/ListeUtilisateur" activeClassName="active">gestion utilisateur</NavLink></li>
          <li><NavLink to="/evenements" activeClassName="active">gestion événement</NavLink></li>
          <li><NavLink to="/articles" activeClassName="active">gestion article</NavLink></li>
          <li><NavLink to="/listeressources" activeClassName="active">gestion ressources</NavLink></li>
          <li><NavLink to="/categories" activeClassName="active">gestion catégorie</NavLink></li>
          <li><NavLink to="/listeforums" activeClassName="active">gestion forum</NavLink></li>
          <li><NavLink to="/settings" activeClassName="active">Paramètres</NavLink></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <div className="navbar">
          <h1>Interface Produicteur</h1>
          <div className="navbar-links">
            <Link to="/profileAdmin">Profil</Link>
            <Link onClick={handleLogout}>Déconnexion</Link>
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

export default AdminInterface;
