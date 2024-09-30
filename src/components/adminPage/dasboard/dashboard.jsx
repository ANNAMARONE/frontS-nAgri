/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './dashboard.css'; 

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h2>Tableau de Bord Admin</h2>
        <ul>
          <li>
            <NavLink to="/dashboard/utilisateurs" activeClassName="active">Utilisateurs</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/produits" activeClassName="active">Produits</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/statistiques" activeClassName="active">Statistiques</NavLink>
          </li>
          {/* Ajoutez d'autres liens selon vos besoins */}
        </ul>
      </nav>
      <main className="dashboard-content">
        <Outlet /> {/* Pour afficher le contenu des routes imbriquées */}
      </main>
    </div>
  );
};

export default Dashboard;
