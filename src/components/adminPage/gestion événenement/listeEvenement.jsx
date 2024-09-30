/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '/src/config';
import { useNavigate } from 'react-router-dom';
import { NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
const EventList = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  useEffect(() => {
    fetchEvents();
  }, []);
// afficher les Évenements
  const fetchEvents = async () => {
    try {
        const response = await axios.get(`${config.apiBaseUrl}/evenements`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          }
        });
        setEvents(response.data);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message || 'Erreur lors de la récupération des événements.');
        } else {
          setError("Erreur réseau.");
        }
      } finally {
        setLoading(false);
      }
  };
  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (event.length === 0) {
    return <div>Aucun événement trouvé.</div>;
  }

  // Supprimer un événement

const handleDeleteEvent = async (id) => {
  
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      try {
        const response = await axios.delete(`${config.apiBaseUrl}/supprimer_evenement/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
        });
        setMessage('Événement supprimé avec succès.');
        fetchEvents();
      } catch (error) {
        setMessage('Erreur lors de la suppression de l’événement.');
      }
    }
  };
  const handleEdit = (eventId) => {
    navigate(`/modifierEvent/${eventId}`);
  };
  
  return (
    <div>
      <h2>Liste des Événements</h2>
      {message && <p>{message}</p>}

      <h2>ajout événement</h2>
      <button 
        onClick={() => console.log("Rediriger vers la page d'ajout de produit")}
        style={{ marginBottom: '20px' }}
        
      >
        <NavLink to="/ajouteEvent" activeClassName="active"> <FontAwesomeIcon icon={faPlus} /> Ajouter un evenement</NavLink>
       
      </button>
      {/* Liste des événements */}
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.libelle}</td>

              <td>{event.description}</td>
              <td>{event.date}</td>
              <td>
                
                <button onClick={() => handleEdit(event.id)} style={{ marginLeft: '10px' }}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
                <button >voir détail</button>
                <button onClick={() => handleDeleteEvent(event.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default EventList;
