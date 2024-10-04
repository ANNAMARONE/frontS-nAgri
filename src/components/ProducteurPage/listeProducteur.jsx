/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '/src/config';
import { NavLink } from 'react-router-dom';
import './listeproducteur.css'
const ListeUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/utilisateurs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setUtilisateurs(response.data);
      } catch (error) {
        setMessage('Erreur lors de la récupération des utilisateurs.',error);
      }
    };

    fetchUtilisateurs();
  }, []);

  return (
    <div>
      <h2>Liste des Utilisateurs Producteurs</h2>
      {message && <p>{message}</p>}
      <div className="container_listeProducteur">
  <ul className="cards">
    {utilisateurs.map((utilisateur) => (
      <li key={utilisateur.id}>
        <NavLink to={`/producteur/${utilisateur.id}`}>
        <img src={`${config.imageProfil}/${utilisateur.profile}`} alt={utilisateur.name} />
        </NavLink>
        <div className="details">
          <span className="name">{utilisateur.name}</span>
          <span className="title">{utilisateur.role}</span>
          {/* <a className="phone" href={`tel:${utilisateur.telephone}`}>{utilisateur.telephone}</a>
          <a className="email" href={`mailto:${utilisateur.email}`}>{utilisateur.email}</a> */}
        </div>
      </li>
    ))}
  </ul>
</div>



    </div>
  );
};

export default ListeUtilisateurs;
