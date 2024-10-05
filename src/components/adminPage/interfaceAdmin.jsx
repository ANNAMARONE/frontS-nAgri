/* eslint-disable no-unused-vars */
import React, { useState ,useEffect} from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import './interfaceAdmin.css';
import { useNavigate } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { PiShoppingCartBold } from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { FaForumbee } from "react-icons/fa";
import logo from '/src/assets/logo1.png';
import { IoCloseSharp } from "react-icons/io5";
import { ImMenu } from "react-icons/im";
import axios from 'axios';
import config from '/src/config';
import { BsChatLeftDots } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
const AdminInterface = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Supprimer le token d'authentification
    localStorage.removeItem('token');
    // Rediriger vers la page de connexion
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
          <button onClick={toggleSidebar} className="toggle-btn" aria-label={isSidebarOpen ? 'Fermer la sidebar' : 'Ouvrir la sidebar'}>
          {isSidebarOpen ? <IoCloseSharp size={50}color='black' />
             : <ImMenu size={50}color='black'  />}
          </button>
          <img src={logo} alt="Logo" />
        </div>
        <ul className="sidebar-menu">
          <li><NavLink to="/dashboard" activeClassName="active"><RxDashboard size={24}/>Tableau de bord</NavLink></li>
          <li><NavLink to="/ListeUtilisateur" activeClassName="active"><HiOutlineUserGroup size={24} />Gestion utilisateur</NavLink></li>
          <li><NavLink to="/evenements" activeClassName="active">Gestion événement</NavLink></li>
          <li><NavLink to="/articles" activeClassName="active">Gestion article</NavLink></li>
          <li><NavLink to="/listeressources" activeClassName="active">Gestion ressources</NavLink></li>
          <li><NavLink to="/categories" activeClassName="active">Gestion catégorie</NavLink></li>
          <li><NavLink to="/listeforums" activeClassName="active"><BsChatLeftDots size={24} />Gestion forum</NavLink></li>
          <button onClick={handleLogout} className="logout-btn"><HiOutlineLogout size={24}/>Déconnexion</button>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
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
            <Link to="/profileAdmin">
            <img src={`${config.imageProfil}/${profile.profile}`} alt={profile.name} />
            </Link>
           
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
