/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
const Users = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);
//fonctionnalité pour afficher la liste des utilisateur 
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      setMessage('Erreur lors de la récupération des utilisateurs.',error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        // Réactualiser la liste des utilisateurs
        fetchUsers(); 
        setMessage('Utilisateur supprimé avec succès.');
      } catch (error) {
        setMessage('Erreur lors de la suppression de l’utilisateur.',error);
      }
    }
  };
//fonctionnalité pour afficher la liste de tout les utilisateurs
  const handleActivate = async (id) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/utilisateurs/${id}/activate`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchUsers();
      setMessage('Utilisateur activé avec succès.');
    } catch (error) {
      setMessage('Erreur lors de l’activation de l’utilisateur.',error);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/utilisateurs/${id}/deactivate`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchUsers();
      setMessage('Utilisateur désactivé avec succès.');
    } catch (error) {
      setMessage('Erreur lors de la désactivation de l’utilisateur.',error);
    }
  };

  return (
    <div>
      <h2>Liste des Utilisateurs</h2>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
           
            <tr key={user.id}>
                 <td>{user.id}</td>
              <NavLink to={`/Utilisateur/${user.id}`}>
              <td>{user.name}</td>
             </NavLink>
            
              <td>{user.email}</td>
              <td>{user.statut ? 'Actif' : 'Inactif'}</td>
              <td>
                <button onClick={() => handleActivate(user.id)}>Activer</button>
                <button onClick={() => handleDeactivate(user.id)}>Désactiver</button>
                <button onClick={() => handleDelete(user.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
