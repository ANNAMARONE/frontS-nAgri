/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AjouterCategorie = () => {
  const [libelle, setLibelle] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Créer un objet FormData pour envoyer les données
    const formData = new FormData();
    formData.append('libelle', libelle);
    formData.append('image', image);

    try {
      await axios.post('http://127.0.0.1:8000/api/Ajout_categorieProduit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/categories'); 
    } catch (error) {
      if (error.response) {
        setError(error.response.data.errors.libelle || error.response.data.errors.image || error.response.data.message);
      } else {
        setError('Erreur lors de l\'ajout de la catégorie');
      }
    }
  };

  return (
    <div>
      <h2>Ajouter une Catégorie</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Libelle:</label>
          <input
            type="text"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AjouterCategorie;
