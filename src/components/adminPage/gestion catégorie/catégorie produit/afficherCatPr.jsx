/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

const ListeCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/CatégorieProduit', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError('Erreur de chargement des catégories');
        }
      }
    };
    fetchCategories();
  }, []);

  // Fonction pour supprimer une catégorie
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/supprimer_categorieProduit/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      setError('Erreur lors de la suppression de la catégorie');
    }
  };

  return (
    <div>
      <h2>Liste des Catégories</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Bouton pour ajouter une nouvelle catégorie */}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/categories/ajouter">
          <button>
            <FontAwesomeIcon icon={faPlus} /> Ajouter une catégorie
          </button>
        </Link>
      </div>

      {categories.length > 0 ? (
        <ul>
          {categories.map((category) => (
            <li key={category.id} style={{ marginBottom: '20px' }}>
              <h3>{category.libelle}</h3>
              <div>
                {/* Bouton Modifier */}
                <Link to={`/categories/modifier/${category.id}`}>
                  <button style={{ marginRight: '10px' }}>
                    <FontAwesomeIcon icon={faEdit} /> Modifier
                  </button>
                </Link>

                {/* Bouton Supprimer */}
                <button onClick={() => handleDelete(category.id)} style={{ marginLeft: '10px', color: 'red' }}>
                  <FontAwesomeIcon icon={faTrash} /> Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>Aucune catégorie trouvée.</p>
      )}
    </div>
  );
};

export default ListeCategories;
