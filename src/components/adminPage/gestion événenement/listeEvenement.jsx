/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '/src/config';
import { useNavigate } from 'react-router-dom';
import { NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './listeEvenement.css';
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
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
    return 
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
    <div className='EvenementListeAdmin'>
   <div className='EvenementListeHeader'>
   <h2>Liste des Événements</h2>
    {message && <p>{message}</p>}
  
   
    <NavLink to="/ajouteEvent" activeClassName="active" style={{ marginBottom: '20px', display: 'inline-block' }}>
      <button>
        <FontAwesomeIcon icon={faPlus} /> Ajouter un Événement
      </button>
    </NavLink>
   </div>
  
    {/* Liste des événements */}
    <table className='Evenement_listeAdmin'>
      <thead>
        <tr>
          <th>Image</th>
          <th>Titre</th>
          <th>Description</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.length > 0 ? (
          events.map((event) => (
            <tr key={event.id}>
              <td>
                <img src={`${config.imageBaseUrl}/${event.image}`} alt={`Image de l'événement: ${event.libelle}`} style={{ width: '50px', height: '50px' }} />
              </td>
              <td>{event.libelle}</td>
              <td>{event.description}</td>
              <td>{new Date(event.created_at).toLocaleDateString()}</td>
              <td className='ActionÉvenet'>
                <button onClick={() => handleEdit(event.id)} style={{ marginLeft: '10px' }}>
                <FaEdit size={24} color='green'/>
                </button>
                <button ><GrView size={24} color='blue'/></button>
                <button onClick={() => handleDeleteEvent(event.id)}><MdDelete size={24} color='red' /></button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: 'center' }}>Aucun événement trouvé.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  
  );
};

export default EventList;
