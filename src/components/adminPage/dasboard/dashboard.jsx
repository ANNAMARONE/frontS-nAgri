/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css'; 
import config from '/src/config';
import { Helmet } from 'react-helmet';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
  const [statistiques, setStatistiques] = useState({
    utilisateurs: 0,
    ventes: 0,
    producteurs: 0,
    total_revenue: 0
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fonction pour récupérer la liste des utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      setError('Erreur lors de la récupération des utilisateurs.');
    }
  };

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
        console.error('Erreur lors de la récupération des statistiques', error);
      }
    };

    fetchStatistique();
  }, []); // L'effet s'exécute uniquement une fois après le premier rendu

  // Utiliser les données une fois que statistiques sont mises à jour
  const data = [
    { name: 'Utilisateurs', value: statistiques.utilisateurs, fill: '#3498db' }, 
    { name: 'Ventes', value: statistiques.ventes, fill: '#e74c3c' }, 
    { name: 'Producteurs', value: statistiques.producteurs, fill: '#009444' },
  
  ];


  return (
    <div>
        <div  className="row g-6 mb-6">
                    <div  className="col-xl-3 col-sm-6 col-12">
                        <div  className="card shadow border-0">
                            <div  className="card-body">
                                <div  className="row">
                                    <div  className="col">
                                        <span  className="h6 font-semibold text-muted text-sm d-block mb-2">Nombre d&apos;utilisateurs</span>
                                        <span  className="h3 font-bold mb-0">{statistiques.utilisateurs}</span>
                                    </div>
                                    <div  className="col-auto">
                                        <div  className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                                        <i  className="fas fa-users"></i>
                                        </div>
                                    </div>
                                </div>
                                <div  className="mt-2 mb-0 text-sm">
                                    <span  className="badge badge-pill bg-soft-success text-success me-2">
                                    <i  className="fas fa-users"></i>
                                    </span>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div  className="col-xl-3 col-sm-6 col-12">
                        <div  className="card shadow border-0">
                            <div  className="card-body">
                                <div  className="row">
                                    <div  className="col">
                                        <span  className="h6 font-semibold text-muted text-sm d-block mb-2">Nombre de ventes</span>
                                        <span  className="h3 font-bold mb-0">{statistiques.ventes}</span>
                                    </div>
                                    <div  className="col-auto">
                                        <div  className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                                            
                                        </div>
                                    </div>
                                </div>
                                <div  className="mt-2 mb-0 text-sm">
                                    <span  className="badge badge-pill bg-soft-success text-success me-2">
                                    <i className="bi bi-people"></i>
                                    </span>
                                    <span  className="text-nowrap text-xs text-muted">Since last month</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div  className="col-xl-3 col-sm-6 col-12">
                        <div  className="card shadow border-0">
                            <div  className="card-body">
                                <div  className="row">
                                    <div  className="col">
                                        <span  className="h6 font-semibold text-muted text-sm d-block mb-2">Montant totale des commandes</span>
                                        <span  className="h3 font-bold mb-0">{statistiques.total_revenue}</span>
                                    </div>
                                    <div  className="col-auto">
                                        <div  className="icon icon-shape bg-info text-white text-lg rounded-circle">
                                        </div>
                                    </div>
                                </div>
                                <div  className="mt-2 mb-0 text-sm">
                                    <span  className="badge badge-pill bg-soft-danger text-danger me-2">
                                    <i className="fas fa-shopping-cart"></i>
                                    </span>
                                    <span  className="text-nowrap text-xs text-muted"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div  className="col-xl-3 col-sm-6 col-12">
                        <div  className="card shadow border-0">
                            <div  className="card-body">
                                <div  className="row">
                                    <div  className="col">
                                        <span  className="h6 font-semibold text-muted text-sm d-block mb-2">Nombre de producteurs inscrits</span>
                                        <span  className="h3 font-bold mb-0">{statistiques.producteurs}</span>
                                    </div>
                                    <div  className="col-auto">
                                        <div  className="icon icon-shape bg-warning text-white text-lg rounded-circle">
                                       
                                        </div>
                                    </div>
                                </div>
                                <div  className="mt-2 mb-0 text-sm">
                                    <span  className="badge badge-pill bg-soft-success text-success me-2">
                                    <i className="fas fa-user-friends"></i>
                                    </span>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

    {/* <div  className="statistiques">
  
      <>
      
        <div  className="card">
          <i  className="fas fa-users"></i>
          <div>
            <h3>Nombre d&apos;utilisateurs</h3>
            <p  className='numberPage'>{statistiques.utilisateurs}</p>
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
 
  </div> */}

                       
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
 <div className="row">
                            <div className="col-md-12">
                                <div className="main-card mb-3 card">
                                    <div className="card-header">Active Users
                                        <div className="btn-actions-pane-right">
                                            <div role="group" className="btn-group-sm btn-group">
                                                <button className="active btn btn-focus">Last Week</button>
                                                <button className="btn btn-focus">All Month</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                                            <thead>
                                            <tr>
                                                <th className="text-center">#</th>
                                                <th className="text-center">profile</th>
                                                <th>Name</th>
                                               
                                                <th className="text-center">City</th>
                                               
                                                <th className="text-center">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {users.map((user) => (
                                            <tr key={user.id}>
                                                <td className="text-center text-muted">#{user.id}</td>
                                                <td>
                                                <div className="widget-content-left">
                                                                    <img width="40" className="rounded-circle" src={`${config.imageProfil}/${user.profile}`}  alt=""/>
                                                                </div>
                                                </td>
                                                <td>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                               
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading"> {user.name}</div>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">{user.adresse}</td>
                                             
                                                <td className="text-center">
                                                    <button type="button" id="PopoverCustomT-1" className="btn btn-primary btn-sm">Details</button>
                                                </td>
                                            </tr>
                                               ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="d-block text-center card-footer">
                                        <button className="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i className="pe-7s-trash btn-icon-wrapper"> </i></button>
                                        <button className="btn-wide btn btn-success">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
 </div>
  );
};

export default Dashboard;
