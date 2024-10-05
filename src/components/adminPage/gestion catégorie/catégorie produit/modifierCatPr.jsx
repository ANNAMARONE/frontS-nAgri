/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ModifierCategorie = () => {
  const { id } = useParams();
  const [libelle, setLibelle] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategorie();
  }, []);

  const fetchCategorie = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/detail_categorieProduit/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('Réponse API:', response.data); 

      if (response.data) {
        setLibelle(response.data.libelle);
        setCurrentImage(response.data.image);
      } else {
        throw new Error('Aucune donnée reçue');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données de la catégorie', error);
      setError('Erreur lors de la récupération des données de la catégorie');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('libelle', libelle);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post(`http://127.0.0.1:8000/api/modifier_categorieProduit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/categories');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error);
      if (error.response) {
        setError(error.response.data.errors?.libelle || error.response.data.errors?.image || error.response.data.message);
      } else {
        setError('Erreur lors de la mise à jour de la catégorie');
      }
    }
  };

  return (
    <div>
      <h2>Modifier la Catégorie</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
     <div className='AjouterEvenement'>
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
          <label>Image actuelle:</label>
          {currentImage && <img src={`http://127.0.0.1:8000/storage/images/${currentImage}`} alt="Catégorie actuelle" style={{ width: '100px' }} />}
        </div>
        <div>
          <label>Nouvelle Image:</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Modifier</button>
      </form>
     </div>
    </div>
  );
};

export default ModifierCategorie;
