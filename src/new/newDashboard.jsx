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
  const [notifications, setNotifications] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
      };
      const [unreadCount, setUnreadCount] = useState(0);

      useEffect(() => {
        // Remplacez cette URL par l'URL de votre backend Laravel
        axios.get(`${config.apiBaseUrl}/notifications`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          },
        })
        .then(response => {
          setUnreadCount(response.data.unread_count);
        })
        .catch(error => console.error('Erreur lors de la récupération des notifications:', error));
      }, []);
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


  useEffect(() => {
    // Récupérer le nombre de notifications non lues
    axios.get(`${config.apiBaseUrl}/notifications/nonlut`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      setUnreadCount(response.data.unread_count);
    })
    .catch(error => console.error('Erreur lors de la récupération des notifications:', error));
    
    // Récupérer la liste des notifications
    axios.get(`${config.apiBaseUrl}/notifications`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      setNotifications(response.data.notifications);
    })
    .catch(error => console.error('Erreur lors de la récupération des notifications:', error));
  }, []);

  // Marquer une notification comme lue
  const markAsRead = (notificationId) => {
    axios.put(`${config.apiBaseUrl}/notifications/${notificationId}/marquerLut`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      setNotifications(notifications.map(notification => 
        notification.id === notificationId ? { ...notification, is_read: true } : notification
      ));
      setUnreadCount(unreadCount - 1);
    })
    .catch(error => console.error('Erreur lors de la mise à jour de la notification:', error));
  };
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

    <div className="notification-icon-container">
      <FontAwesomeIcon
        icon={faBell}
        className="navbar-icon"
        title="Notifications"
        onClick={() => setMenuOpen(!menuOpen)}  
      />
      {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}

      {menuOpen && (
        <div className="notification-menu">
          {notifications.length === 0 ? (
            <p>Aucune notification</p>
          ) : (
            notifications.map((notification) => (
              <div className="notification-item" key={notification.id}>
                <p>{notification.message}</p>
                {!notification.is_read && (
                  <button onClick={() => markAsRead(notification.id)}>
                    Marquer comme lue
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
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
                   
                    <ul className='sidebarnew'>
                        <li>
                        <FontAwesomeIcon icon={faChartLine} /> <NavLink to="/statistics" activeClassName="active">Tableau de Bord</NavLink>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faBox} /> Produits
                            <ul>
                                <li><NavLink to="/afficherProduit" activeClassName="active">Liste des Produits</NavLink></li>
                                <li><NavLink to="/ajoutProduit" activeClassName="active">Ajouter un Produit </NavLink></li>
                              
                                <li> <NavLink to="/gestionStock" activeClassName="active"> Gestion des Stocks </NavLink></li>
                            </ul>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faShoppingCart} /> Commandes
                            <ul>
                            
                                <li><NavLink to="/commandeProducteur" activeClassName="active">Commandes en Cours</NavLink></li>
                                <li><NavLink to="/historique" activeClassName="active">Historique des Commandes </NavLink></li>
                               
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
                            <FontAwesomeIcon icon={faCogs} /> Paramètres
                            <ul>
                                <li><Link to="/profile">Profil </Link></li>
                                <li>Sécurité</li>
                                <li>Préférences</li>
                            </ul>
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
