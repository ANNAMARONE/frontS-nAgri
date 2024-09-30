/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '/src/config';
import { NavLink } from 'react-router-dom';
const ListeUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/utilisateurs', {
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>profile</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map((utilisateur) => (
            <tr key={utilisateur.id}>
            <td>{utilisateur.id}
            <NavLink to={`/producteur/${utilisateur.id}`}>
            {utilisateur.name}
            </NavLink>
            </td>
            <img src={`${config.imageProfil}/${utilisateur.profile}`} alt={utilisateur.nam} />
              <td>{utilisateur.name}</td>
              <td>{utilisateur.email}</td>
              <td>{utilisateur.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeUtilisateurs;
