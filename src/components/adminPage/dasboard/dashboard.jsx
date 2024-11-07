/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css'; 
import config from '/src/config';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const Dashboard = () => {
  
const [statistiques,setStatistiques]=useState({
  utilistaurs:0,
  vente:0,
  producteurs:0,
})
useEffect(() => {
  const fetchStatistique = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${config.apiBaseUrl}/statistiquesAdmin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setStatistiques(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération', error);
    }
  };

  fetchStatistique();
}, []);

const data = [
  { name: 'Utilisateurs', value: statistiques.utilisateurs, fill: '#3498db' }, 
  { name: 'Ventes', value: statistiques.ventes, fill: '#e74c3c' }, 
  { name: 'Producteurs', value: statistiques.producteurs, fill: '#009444' },
];

  return (
    <div>

  
    <div className="statistiques">
  
      <>
      
        <div className="card">
          <i className="fas fa-users"></i>
          <div>
            <h3>Nombre d&apos;utilisateurs</h3>
            <p className='numberPage'>{statistiques.utilisateurs}</p>
          </div>
        </div>
        <div className="card">
          <i className="fas fa-shopping-cart"></i>
          <div>
            <h3>Nombre de ventes</h3>
            <p className='numberPage'>{statistiques.ventes}</p>
          </div>
        </div>
        <div className="card">
          <i className="fas fa-user-friends"></i>
          <div>
            <h3>Nombre de producteurs inscrits</h3>
            <p className='numberPage'>{statistiques.producteurs}</p>
          </div>
        </div>
      </>
 
  </div>
 <div className='gestionAction'>
 <div className="gestionAcee">
   <h1>Gestion des accès et des identités</h1>
   <p> La gestion des accès et des identités (IAM, pour Identity and Access Management) est un cadre de sécurité qui permet de garantir que les bonnes personnes ont le bon accès aux bonnes ressources, au bon moment. Cela inclut des processus et des technologies utilisés pour gérer les identités numériques des utilisateurs, contrôler l&apos;accès aux ressources d&apos;une organisation, et surveiller les activités des utilisateurs.</p>
<div className="actionUser">
 <div className='button1'><NavLink to="/ListeUtilisateur">
  Gestion des utilisateurs
  </NavLink>
  </div>
 <div className='button1'><NavLink to="/gestionRoles">Gestion des rôles</NavLink></div>
 <div className='button1'><NavLink to="/gestionPremission">Gestion des permissions</NavLink></div>
 
</div>

 </div>
 <div className="statistiques-chart">
            <h2>Statistiques de la Plateforme</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#3498db" />
                </BarChart>
            </ResponsiveContainer>
        </div>
 </div>
 </div>
  );
};

export default Dashboard;
