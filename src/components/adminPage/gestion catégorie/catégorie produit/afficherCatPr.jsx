/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import config from '/src/config';
const ListeCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/CatégorieProduit`, {
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
    <div className='EvenementListeAdmin'>
    <div className='EvenementListeHeader'>
    <h2>Liste des Catégories</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginBottom: '20px' }}>
        <Link to="/categories/ajouter">
          <button>
            <FontAwesomeIcon icon={faPlus} /> Ajouter une catégorie
          </button>
        </Link>
      </div>
    </div>

      {categories.length > 0 ? (
        <table className='Evenement_listeAdmin'>
          <thead>
            <tr>
              <th>ID</th>
              <th>IMAGE</th>
              <th>Libellé</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
               <td>{category.id}</td>
                <td> <img src={`${config.imageBaseUrl}/${category.image}`} alt={`Image de l'événement: ${event.libelle}`} style={{ width: '50px', height: '50px' }} /></td>
                
                <td>{category.libelle}</td>
                <td>
                  <Link to={`/categories/modifier/${category.id}`}>
                    <button style={{ marginRight: '10px' }}>
                      <FontAwesomeIcon icon={faEdit} /> Modifier
                    </button>
                  </Link>
                  <button onClick={() => handleDelete(category.id)} style={{ marginLeft: '10px', color: 'red' }}>
                    <FontAwesomeIcon icon={faTrash} /> Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>Aucune catégorie trouvée.</p>
      )}
    </div>
  );
};

export default ListeCategories;
