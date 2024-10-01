/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import config from '/src/config';
const ModifierRessource = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [libelle, setLibelle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [piéceJoin, setPiéceJoin] = useState(null);
  const [categorieRessourceId, setCategorieRessourceId] = useState('');
  const [message, setMessage] = useState('');
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

  useEffect(() => {

    const fetchRessource = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/ressources/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const ressource = response.data;
        setLibelle(ressource.libelle);
        setDescription(ressource.description);
        setCategorieRessourceId(ressource.categorie_ressource_id);
      } catch (error) {
        setMessage('Erreur lors du chargement de la ressource.');
      }
    };
    fetchRessource();
  }, [id]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('libelle', libelle);
    formData.append('description', description);
    formData.append('categorie_ressource_id', categorieRessourceId);

    if (image) {
      formData.append('image', image);
    }
    
    if (piéceJoin) {
      formData.append('piéce_join', piéceJoin);
    }

    try {
      await axios.post(`http://127.0.0.1:8000/api/modifier_Ressource/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Ressource modifiée avec succès.');
      navigate('/listeressources'); 
    } catch (error) {
      setMessage('Erreur lors de la modification de la ressource.',error);
    }
  };

  return (
    <div>
      <h2>Modifier la ressource</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Libellé</label>
          <input 
            type="text" 
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Catégorie de ressource</label>
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
          <label>Image</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setImage(e.target.files[0])} 
          />
        </div>
        <div>
          <label>Pièce jointe (PDF)</label>
          <input 
            type="file" 
            accept="application/pdf" 
            onChange={(e) => setPiéceJoin(e.target.files[0])} 
          />
        </div>
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default ModifierRessource;
