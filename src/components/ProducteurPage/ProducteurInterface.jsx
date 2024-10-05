/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'; 
import { RxDashboard } from "react-icons/rx";
import { PiShoppingCartBold } from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import logo from '/src/assets/logo1.png';
import './ProducteurInterface.css';
import { IoCloseSharp } from "react-icons/io5";
import { ImMenu } from "react-icons/im";
import axios from 'axios';
import config from '/src/config';
import { FaForumbee } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";

const ProducteurInterface = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate(); 
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
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
    <div className="admin-interface">
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
       
          <button 
            onClick={toggleSidebar} 
            className="toggle-btn" 
            aria-label={isSidebarOpen ? 'Fermer la sidebar' : 'Ouvrir la sidebar'}
             >
            {isSidebarOpen ? <IoCloseSharp size={50}color='black' />
             : <ImMenu size={50}color='black'  />}
          </button>
          <img src={logo} alt="Logo" />
        </div>
        <ul className="sidebar-menu">
          <li><NavLink to="/dashboardProducteur" activeClassName="active"><RxDashboard size={24}/>Tableau de bord</NavLink></li>
          <li><NavLink to="/ajoutProduit" activeClassName="active"><PiShoppingCartBold size={24}/>Ajouter produit</NavLink></li>
          <li><NavLink to="/producteurs" activeClassName="active"><HiOutlineUserGroup size={24} />Autre producteurs</NavLink></li>
          <li><NavLink to="/AfficherProduit" activeClassName="active"> <FaRegUser size={24}/>Afficher produit</NavLink></li>
          <li><NavLink to="/commandes" activeClassName="active">Commandes</NavLink></li>
          <button onClick={handleLogout} className="logout-btn"><HiOutlineLogout size={24}/>Déconnexion</button>
        </ul>
      </div>
      <div className="main-content">
        <div className="navbar">
        <div>
        <h1>Bienvenue sur <span>SénAgri</span></h1>
        <p> Bonjour {profile.name}, bienvenue !</p>

        </div>
          <div className="navbar-links">
            <Link to='/forump'>
            <p><FaForumbee  size={30}/></p>
            </Link>
            
            <IoNotificationsOutline  size={30}/>
            <Link to="/profile">
           <img src={`${config.imageProfil}/${profile.profile}`} alt={profile.name} />
            </Link>
           
          
          </div>
        </div>


        <div className="page-content">
          <Outlet/> 
        </div>
      </div>
    </div>
  );
};

export default ProducteurInterface;
