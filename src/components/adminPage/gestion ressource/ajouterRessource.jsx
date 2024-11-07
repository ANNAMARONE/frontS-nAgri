/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '/src/config';
const AjouterRessource = () => {
  const [libelle, setLibelle] = useState('');
  const [description, setDescription] = useState('');
  const [categorieRessourceId, setCategorieRessourceId] = useState('');
  const [image, setImage] = useState(null);
  const [pieceJoin, setPieceJoin] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

    // Récupérer les catégories
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await axios.get(`${config.apiBaseUrl}/catégorieRessouce`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            });
            setCategories(response.data);
          } catch (err) {
            console.error("Erreur lors de la récupération des catégories.");
          }
        };
    
        fetchCategories();
      }, []);
    

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('libelle', libelle);
    formData.append('description', description);
    formData.append('categorie_ressource_id', categorieRessourceId);
    formData.append('image', image);
    formData.append('piéce_join', pieceJoin);

    try {
      const response = await axios.post(`${config.apiBaseUrl}/ajout_ressources`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage('Ressource ajoutée avec succès');
      navigate('/listeressources');
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setMessage('Erreur lors de l\'ajout de la ressource');
      }
    }
  };

  return (
    <div className='AjouterEvenement'>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Libellé:</label>
          <input
            type="text"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Catégorie:</label>
          <select
            value={categorieRessourceId}
            onChange={(e) => setCategorieRessourceId(e.target.value)}
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((categorie) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.libelle} 
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>Fichier PDF:</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPieceJoin(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AjouterRessource;
