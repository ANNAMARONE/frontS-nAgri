/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AjouterEvenement = () => {
  const [evenement, setEvenement] = useState({
    libelle: '',
    description: '',
    lien: '',
    date: ''
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Gestion des changements de formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvenement({ ...evenement, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('libelle', evenement.libelle);
    formData.append('description', evenement.description);
    formData.append('lien', evenement.lien);
    formData.append('date', evenement.date);

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/ajout_evenements', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('Événement ajouté avec succès');
      setErrors({});
      navigate('/evenements');
    } catch (error) {
      if (error.response && error.response.status === 422) {
       
        setErrors(error.response.data.errors);
      } else {
        setMessage('Une erreur est survenue lors de l\'ajout de l\'événement.');
      }
    }
  };

  return (
    <div>
      <h2>Ajouter un Événement</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Libellé :</label>
          <input
            type="text"
            name="libelle"
            value={evenement.libelle}
            onChange={handleInputChange}
            required
          />
          {errors.libelle && <span>{errors.libelle[0]}</span>}
        </div>
        <div>
          <label>Description :</label>
          <textarea
            name="description"
            value={evenement.description}
            onChange={handleInputChange}
            required
          />
          {errors.description && <span>{errors.description[0]}</span>}
        </div>
        <div>
          <label>Lien :</label>
          <input
            type="text"
            name="lien"
            value={evenement.lien}
            onChange={handleInputChange}
            required
          />
          {errors.lien && <span>{errors.lien[0]}</span>}
        </div>
        <div>
          <label>Date :</label>
          <input
            type="date"
            name="date"
            value={evenement.date}
            onChange={handleInputChange}
            required
          />
          {errors.date && <span>{errors.date[0]}</span>}
        </div>
        <div>
          <label>Image :</label>
          <input type="file" name="image" onChange={handleImageChange} />
          {errors.image && <span>{errors.image[0]}</span>}
        </div>
        <button type="submit">Ajouter Événement</button>
      </form>
    </div>
  );
};

export default AjouterEvenement;
