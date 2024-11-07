/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '/src/config';
import './listeEvenement.css';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvenement({ ...evenement, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!evenement.libelle) {
      newErrors.libelle = 'Le libellé est requis';
    } else if (evenement.libelle.length > 255) {
      newErrors.libelle = 'Le libellé doit comporter au maximum 255 caractères';
    }

     if (!evenement.description) {
      newErrors.description = 'La description est requise';
    } else if (evenement.description.length < 300) {
      newErrors.description = 'La description doit comporter au moins 300 caractères';
    }

    if (!evenement.lien) {
      newErrors.lien = 'Le lien est requis';
    } else if (evenement.lien.length > 255) {
      newErrors.lien = 'Le lien doit comporter au maximum 255 caractères';
    }

    if (!evenement.date) {
      newErrors.date = 'La date est requise';
    } else {
      const selectedDate = new Date(evenement.date);
      const today = new Date();
      if (selectedDate < today) {
        newErrors.date = 'La date doit être aujourd\'hui ou dans le futur';
      }
    }

    if (!image) {
      newErrors.image = 'L\'image est requise';
    } else {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(image.type)) {
        newErrors.image = 'L\'image doit être au format jpeg, jpg, ou png';
      } else if (image.size > 2048 * 1024) {
        newErrors.image = 'La taille de l\'image ne doit pas dépasser 2MB';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valider le formulaire avant l'envoi
    if (!validateForm()) {
      setMessage('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    const formData = new FormData();
    formData.append('libelle', evenement.libelle);
    formData.append('description', evenement.description);
    formData.append('lien', evenement.lien);
    formData.append('date', evenement.date);

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(`${config.apiBaseUrl}/ajout_evenements`, formData, {
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
        const apiErrors = error.response.data.errors || {};
        const formattedErrors = {};
        Object.keys(apiErrors).forEach((key) => {
          formattedErrors[key] = apiErrors[key][0];
        });
        setErrors(formattedErrors);
      } else {
        setMessage('Une erreur est survenue lors de l\'ajout de l\'événement.');
      }
    }
  };

  return (
    <div className='AjouterEvenement'>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Libellé :</label>
          <input
            type="text"
            name="libelle"
            value={evenement.libelle}
            onChange={handleInputChange}
          />
          {errors.libelle && <span className="error">{errors.libelle}</span>}
        </div>
        <div>
          <label>Description :</label>
          <textarea
            name="description"
            value={evenement.description}
            onChange={handleInputChange}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <div>
          <label>Lien :</label>
          <input
            type="text"
            name="lien"
            value={evenement.lien}
            onChange={handleInputChange}
          />
          {errors.lien && <span className="error">{errors.lien}</span>}
        </div>
        <div>
          <label>Date :</label>
          <input
            type="date"
            name="date"
            value={evenement.date}
            onChange={handleInputChange}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>
        <div>
          <label>Image :</label>
          <input type="file" name="image" onChange={handleImageChange} />
          {errors.image && <span className="error">{errors.image}</span>}
        </div>
        <button type="submit">Ajouter Événement</button>
      </form>
    </div>
  );
};

export default AjouterEvenement;
