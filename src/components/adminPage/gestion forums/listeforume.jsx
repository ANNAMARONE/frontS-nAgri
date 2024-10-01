/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

const ListeForums = () => {
  const [forums, setForums] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/forums', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
      
        setForums(response.data);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error); 
        } else {
          setError('Erreur de chargement des forums');
        }
      }
    };
    fetchForums();
  }, []);

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/supprimer_forums/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
     
      setForums(forums.filter((forum) => forum.id !== id));
      setMessage('forum supprimer avec succès.');
    } catch (error) {
      setError('Erreur lors de la suppression du forum');
    }
  };

  return (
    <div>
      <h2>Liste des Forums</h2>
      {error && <p>{error}</p>}

      {/* Bouton pour ajouter un nouveau forum */}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/forums/ajouter">
          <button>
            <FontAwesomeIcon icon={faPlus} /> Ajouter un forum
          </button>
        </Link>
      </div>

      {forums.length > 0 ? (
        <ul>
          {forums.map((forum) => (
            <li key={forum.id} style={{ marginBottom: '20px' }}>
              <h3>{forum.title}</h3>
              <p>{forum.description}</p>
              <p><strong>Date de création :</strong> {new Date(forum.created_at).toLocaleDateString()}</p>
              <div>
                {/* Bouton Modifier */}
                <Link to={`/forumsdetail/${forum.id}`}>
                  <button style={{ marginRight: '10px' }}>
                    <FontAwesomeIcon icon={faEdit} /> détail
                  </button>
                </Link>

                {/* Bouton Supprimer */}
                <button onClick={() => handleDelete(forum.id)} style={{ marginLeft: '10px', color: 'red' }}>
                  <FontAwesomeIcon icon={faTrash} /> Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>Aucun forum trouvé.</p>
      )}
    </div>
  );
};

export default ListeForums;
