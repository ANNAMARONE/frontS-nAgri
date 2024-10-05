/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './listeUtilisateur.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fonction pour récupérer la liste des utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      setError('Erreur lors de la récupération des utilisateurs.');
    }
  };

  // Fonction pour supprimer un utilisateur
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        fetchUsers();
        setMessage('Utilisateur supprimé avec succès.');
      } catch (error) {
        setError('Erreur lors de la suppression de l’utilisateur.');
      }
    }
  };

  // Fonction pour activer un utilisateur
  const handleActivate = async (id) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/users/${id}/activate`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchUsers();
      setMessage('Utilisateur activé avec succès.');
    } catch (error) {
      setError('Erreur lors de l’activation de l’utilisateur.');
    }
  };

  // Fonction pour désactiver un utilisateur
  const handleDeactivate = async (id) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/users/${id}/deactivate`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchUsers();
      setMessage('Utilisateur désactivé avec succès.');
    } catch (error) {
      setError('Erreur lors de la désactivation de l’utilisateur.');
    }
  };
//fonction pour modifier le role d'un utilisateur
  return (
    <div className="table-container">
      <h2>Liste des Utilisateurs</h2>
      {message && <p className="message success">{message}</p>}
      {error && <p className="message error">{error}</p>}
      {users.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <table className="styled-table">
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
                <td>
                  <NavLink to={`/Utilisateur/${user.id}`} className="user-link">
                    {user.name}
                  </NavLink>
                </td>
                <td>{user.email}</td>
                <td className={user.statut ? 'active-status' : 'inactive-status'}>
                  {user.statut ? 'Actif' : 'Inactif'}
                </td>
                <td>
                  <button className="action-button activate" onClick={() => handleActivate(user.id)}>
                    Activer
                  </button>
                  <button className="action-button deactivate" onClick={() => handleDeactivate(user.id)}>
                    Désactiver
                  </button>
                  <button className="action-button delete" onClick={() => handleDelete(user.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
