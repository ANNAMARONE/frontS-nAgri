/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ModifierProduit = () => {
  const { id } = useParams(); 
  const [produit, setProduit] = useState({
    libelle: '',
    description: '',
    quantite: 0,
    prix: 0,
    statut: '',
    categorie_produit_id: '',
  });
  const [image, setImage] = useState(null); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/CatégorieProduit");
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProduit = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/détail_produit/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProduit(response.data.produit); 
      } catch (error) {
        setMessage(error.response?.data?.message || 'Erreur lors de la récupération du produit.');
      }
    };

    fetchProduit();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduit({ ...produit, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Créer un FormData pour envoyer l'image à remove.bg
    const formData = new FormData();
    if (image) {
      formData.append('image_file', image);
    }

    try {
      // Appel à l'API remove.bg pour supprimer le fond de l'image
      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: {
          'X-Api-Key': 'hvxuCWhWSAYJbaiRvzTphNDf', 
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      const blobImage = response.data; 
      const imageSansFond = new File([blobImage], 'image_sans_fond.png', { type: 'image/png' });

      // Créer un autre FormData pour envoyer les données du produit
      const produitFormData = new FormData();
      produitFormData.append('libelle', produit.libelle);
      produitFormData.append('description', produit.description);
      produitFormData.append('quantite', produit.quantite);
      produitFormData.append('prix', produit.prix);
      produitFormData.append('statut', produit.statut);
      produitFormData.append('categorie_produit_id', produit.categorie_produit_id);

      // Ajouter l'image sans fond au formulaire de modification du produit
      produitFormData.append('image', imageSansFond);

      await axios.post(`http://127.0.0.1:8000/api/modifier_produit/${id}`, produitFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Produit modifié avec succès.');
      navigate('/afficherProduit'); 
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de la modification du produit.');
    }
  };

  return (
    <div>
      <h2>Modifier Produit</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Libellé :</label>
          <input
            type="text"
            name="libelle"
            value={produit.libelle}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description :</label>
          <textarea
            name="description"
            value={produit.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Quantité :</label>
          <input
            type="number"
            name="quantite"
            value={produit.quantite}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Prix :</label>
          <input
            type="number"
            name="prix"
            value={produit.prix}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Statut :</label>
          <input
            type="text"
            name="statut"
            value={produit.statut}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Catégorie :</label>
          <select
            name="categorie_produit_id"
            value={produit.categorie_produit_id}
            onChange={handleInputChange}
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
          <label>Image :</label>
          <input type="file" name="image" onChange={handleImageChange} />
        </div>
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default ModifierProduit;
