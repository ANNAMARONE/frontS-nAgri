/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'; 
import './newdashboard.css';
import logo from '/src/assets/logo1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import config from '/src/config';
import { 
    faBell, faUserCircle, faBox, faChartLine, faUsers, faHandshake, faCogs, faShoppingCart, 
    faTags, faFileAlt, faChartPie, faEnvelope, faSignOutAlt, faComments, faBars, faTimes 
} from '@fortawesome/free-solid-svg-icons';

import "./newdashboardAdmin.css"
const NewdashboardAdmin = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate(); 
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
      };

      useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${config.apiBaseUrl}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            setProfile(response.data);
        })
        .catch(error => {
            setError(error.response ? error.response.data : "Erreur de connexion");
        });
    }, []);
    if (error) {
      return <div>Erreur: {error}</div>;
    }
    
    if (!profile) {
      return <div>Chargement</div>;
    }
  return (
    <div className="dashboard-layout">
    {/* Navbar */}
<nav className="navbar">
<div className="navbar-brand">
<img src={logo} alt="Logo" />
<FontAwesomeIcon 
    icon={isSidebarOpen ? faTimes : faBars} 
    className="navbar-icon" 
    title={isSidebarOpen ? "Fermer la Sidebar" : "Ouvrir la Sidebar"} 
    onClick={toggleSidebar} 
/>

</div>
<div className='navbartexte1'>
<h2 className='textebien'>Bienvenue sur <span>SénAgri</span></h2>
<p> Bonjour {profile.name}, bienvenue !</p>

</div>
<div className="navbar-right">
<Link to='/forump'>
<FontAwesomeIcon icon={faComments} className="navbar-icon" title="Forum de Discussion" />
</Link>
<FontAwesomeIcon icon={faBell} className="navbar-icon" title="Notifications" />
<div className='profileProducteur'>
<Link to="/profileAdmin">
<img src={`${config.imageProfil}/${profile.profile}`} alt={profile.name} />
</Link>
</div>

</div>
</nav>

{/* Sidebar */}
{isSidebarOpen && (
    <div className="sidebar">
        <ul>
            <li>
            <FontAwesomeIcon icon={faChartLine} /> <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
            </li>
            <li>
                <FontAwesomeIcon icon={faBox} /> gestion produits
                <ul>
                
                <li><NavLink to="/categories" activeClassName="active">Gestion catégorie</NavLink></li>
                </ul>
            </li>
            <li>
                <FontAwesomeIcon icon={faShoppingCart} /> <NavLink to="/evolutionCommande">Commandes</NavLink>
            </li>
            <li>
                <FontAwesomeIcon icon={faHandshake} /> Gestion des Pages
                <ul>
                <li><NavLink to="/evenements" activeClassName="active">Gestion événement</NavLink></li>
                    <li><NavLink to="/articles" activeClassName="active">Gestion article</NavLink></li>
                    <li><NavLink to="/listeressources" activeClassName="active">Gestion ressources</NavLink></li>
                    <li><NavLink to="/listeforums" activeClassName="active">Gestion forum</NavLink></li>
                </ul>
            </li>
            <li>
                <FontAwesomeIcon icon={faUsers} /> gestion utilisateurs
                <ul>
                    <li><NavLink to="ListeUtilisateur">Liste des Utilisateurs</NavLink></li>
                  
                </ul>
            </li>
            <li>
                <FontAwesomeIcon icon={faCogs} /> Paramètres
                <ul>
                    <li><Link to="/profile">Profil </Link></li>
                    <li>Sécurité</li>
                    <li>Préférences</li>
                </ul>
            </li>
            <li>
                <FontAwesomeIcon icon={faEnvelope} /> Support
            </li>
            <li onClick={handleLogout} >
            <FontAwesomeIcon icon={faSignOutAlt} />deconnexion
            </li>
        </ul>
    </div>
)}

{/* Main Content */}
<div className="content">
    
<Outlet/> 
</div>
</div>
  )
}

export default NewdashboardAdmin
