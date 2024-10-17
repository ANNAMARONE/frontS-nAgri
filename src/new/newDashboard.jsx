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

const NewDashboard = () => {
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
           <Link to="/profile">
           <img src={`${config.imageProfil}/${profile.profile}`} alt={profile.name} />
            </Link>
           </div>
           
        </div>
    </nav>
          
            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="sidebar">
                    <h2>Tableau de Bord</h2>
                    <ul>
                        <li>
                        <FontAwesomeIcon icon={faChartLine} /> <NavLink to="/statistics" activeClassName="active">Dashboard</NavLink>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faBox} /> Produits
                            <ul>
                                <li><NavLink to="/afficherProduit" activeClassName="active">Liste des Produits</NavLink></li>
                                <li><NavLink to="/ajoutProduit" activeClassName="active">Ajouter un Produit </NavLink></li>
                                <li>Catégories de Produits</li>
                                <li>Gestion des Stocks</li>
                            </ul>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faShoppingCart} /> Commandes
                            <ul>
                                <li>Commandes en Cours</li>
                                <li>Historique des Commandes</li>
                            </ul>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faHandshake} /> Collaborations
                            <ul>
                                <li><NavLink to="/producteurs" activeClassName="active">Partenaires </NavLink></li>
                                <li>Ajouter un Partenaire</li>
                                <li>Gestion des Collaborations</li>
                            </ul>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faUsers} /> Clients
                            <ul>
                                <li>Liste des Clients</li>
                                <li>Ajouter un Client</li>
                                <li>Avis et Retours</li>
                            </ul>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faChartPie} /> Rapports
                            <ul>
                                <li>Statistiques de Vente</li>
                                <li>Performance des Produits</li>
                                <li>Performance des Collaborations</li>
                            </ul>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faTags} /> Marketing
                            <ul>
                                <li>Promotions</li>
                                <li>Campagnes Marketing</li>
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
    );
};

export default NewDashboard;
