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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!libelle) newErrors.libelle = "Le libellé est requis.";
    else if (libelle.length > 255) newErrors.libelle = "Le libellé doit comporter moins de 255 caractères.";
    
    if (!description) newErrors.description = "La description est requise.";
    
    if (!categorieRessourceId) newErrors.categorieRessourceId = "Veuillez sélectionner une catégorie.";
    
    if (!image) newErrors.image = "L'image est requise.";
    else if (!["image/jpeg", "image/png"].includes(image.type)) newErrors.image = "Format de l'image invalide. (JPEG ou PNG uniquement)";
    else if (image.size > 2048 * 1024) newErrors.image = "L'image doit être inférieure à 2 Mo.";
    
    if (!pieceJoin) newErrors.pieceJoin = "Le fichier PDF est requis.";
    else if (pieceJoin.type !== "application/pdf") newErrors.pieceJoin = "Format de fichier invalide. (PDF uniquement)";
    else if (pieceJoin.size > 2048 * 1024) newErrors.pieceJoin = "Le fichier PDF doit être inférieur à 2 Mo.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

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
            className={errors.libelle ? 'error' : ''}
          />
          {errors.libelle && <p className="error-message">{errors.libelle}</p>}
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>
        <div>
          <label>Catégorie:</label>
          <select
            value={categorieRessourceId}
            onChange={(e) => setCategorieRessourceId(e.target.value)}
            className={errors.categorieRessourceId ? 'error' : ''}
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((categorie) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.libelle} 
              </option>
            ))}
          </select>
          {errors.categorieRessourceId && <p className="error-message">{errors.categorieRessourceId}</p>}
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className={errors.image ? 'error' : ''}
          />
          {errors.image && <p className="error-message">{errors.image}</p>}
        </div>
        <div>
          <label>Fichier PDF:</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPieceJoin(e.target.files[0])}
            className={errors.pieceJoin ? 'error' : ''}
          />
          {errors.pieceJoin && <p className="error-message">{errors.pieceJoin}</p>}
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AjouterRessource;
