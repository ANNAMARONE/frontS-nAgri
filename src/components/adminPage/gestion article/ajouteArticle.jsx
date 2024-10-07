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


  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const formData = new FormData();
    formData.append('libelle', libelle);
    formData.append('description', description);
    formData.append('lien', lien);
    formData.append('statut', statut);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(`${config.imageBaseUrl}/articles`,formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          'Content-Type': 'multipart/form-data', 
        },
      });

      setMessage('Article ajouté avec succès !');
      setErrors({});
      navigate('/articles')
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
            required
          />
          {errors.libelle && <span>{errors.libelle[0]}</span>}
        </div>
        <div>
          <label>Description :</label>
          <textarea
            name="description"
            value={description}
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
            value={lien}
            onChange={handleInputChange}
            required
          />
          {errors.lien && <span>{errors.lien[0]}</span>}
        </div>
        <div>
          <label>Statut :</label>
          <input
            type="text"
            name="statut"
            value={statut}
            onChange={handleInputChange}
            required
          />
          {errors.statut && <span>{errors.statut[0]}</span>}
        </div>
        <div>
          <label>Image :</label>
          <input type="file" name="image" onChange={handleImageChange} required />
          {errors.image && <span>{errors.image[0]}</span>}
        </div>
        <button type="submit">Ajouter l&apos;article</button>
      </form>
    </div>
  );
};

export default AjouterArticle;
