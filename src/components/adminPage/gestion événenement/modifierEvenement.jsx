/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import config from '/src/config';
import './listeEvenement.css';
const ModifierEvenement = () => {
  const { id } = useParams(); 
  const [evenement, setEvenement] = useState({
    libelle: '',
    description: '',
    lien: '',
    date: '',
    image: null,
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const fetchEvenement = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/evenement/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEvenement(response.data.evenement);
      } catch (error) {
        setMessage('Erreur lors du chargement de l\'événement');
      }
    };
    fetchEvenement();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvenement({ ...evenement, [name]: value });
  };

  const handleImageChange = (e) => {
    setEvenement({ ...evenement, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const formData = new FormData();
    formData.append('libelle', evenement.libelle);
    formData.append('description', evenement.description);
    formData.append('lien', evenement.lien);
    formData.append('date', evenement.date);
    if (evenement.image instanceof File) {
      formData.append('image', evenement.image); 
    }
    
    try {
      const response = await axios.post(`${config.apiBaseUrl}/modifier_Evenement/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setMessage('Événement mis à jour avec succès');
      setErrors({});
      navigate('/evenements')
    } catch (error) {
      if (error.response && error.response.status === 422) {
      
        setErrors(error.response.data.errors);
      } else {
        setMessage('Une erreur est survenue lors de la mise à jour de l\'événement');
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
        <button type="submit">Mettre à jour l&apos;événement</button>
      </form>
    </div>
  );
};

export default ModifierEvenement;
