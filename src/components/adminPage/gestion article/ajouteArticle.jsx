/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '/src/config';

const AjouterArticle = () => {
  const [libelle, setLibelle] = useState('');
  const [description, setDescription] = useState('');
  const [lien, setLien] = useState('');
  const [statut, setStatut] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'libelle') setLibelle(value);
    if (name === 'description') setDescription(value);
    if (name === 'lien') setLien(value);
    if (name === 'statut') setStatut(value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!libelle || libelle.length > 255) {
      newErrors.libelle = 'Le libellé est requis et doit contenir un maximum de 255 caractères.';
    }

    if (!description) {
      newErrors.description = 'La description est requise.';
    }

 

    if (!statut || statut.length < 1) {
      newErrors.statut = 'Le statut est requis et doit contenir au moins un caractère.';
    }

    if (!image) {
      newErrors.image = 'Une image est requise.';
    } else if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(image.type)) {
      newErrors.image = 'L\'image doit être au format jpeg, jpg, png ou webp.';
    } else if (image.size > 2048 * 1024) {
      newErrors.image = 'La taille de l\'image ne doit pas dépasser 2 Mo.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('libelle', libelle);
    formData.append('description', description);
    formData.append('lien', lien);
    formData.append('statut', statut);
    formData.append('image', image);

    try {
      const response = await axios.post(`${config.apiBaseUrl}/articles`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Article ajouté avec succès !');
      setErrors({});
      navigate('/articles');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setMessage('Une erreur est survenue lors de l\'ajout de l\'article.');
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
            value={libelle}
            onChange={handleInputChange}
          />
          {errors.libelle && <span>{errors.libelle}</span>}
        </div>
        <div>
          <label>Description :</label>
          <textarea
            name="description"
            value={description}
            onChange={handleInputChange}
          />
          {errors.description && <span>{errors.description}</span>}
        </div>
        <div>
          <label>Lien :</label>
          <input
            type="text"
            name="lien"
            value={lien}
            onChange={handleInputChange}
          />
          {errors.lien && <span>{errors.lien}</span>}
        </div>
        <div>
          <label>Statut :</label>
          <input
            type="text"
            name="statut"
            value={statut}
            onChange={handleInputChange}
          />
          {errors.statut && <span>{errors.statut}</span>}
        </div>
        <div>
          <label>Image :</label>
          <input type="file" name="image" onChange={handleImageChange} />
          {errors.image && <span>{errors.image}</span>}
        </div>
        <button type="submit">Ajouter l&apos;article</button>
      </form>
    </div>
  );
};

export default AjouterArticle;
