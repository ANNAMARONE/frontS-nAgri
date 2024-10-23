/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ajoutProduit.css';
import config from '/src/config';

const AjouterProduit = () => {
  const [libelle, setLibelle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [quantite, setQuantite] = useState("");
  const [prix, setPrix] = useState("");
  const [statut, setStatut] = useState("");
  const [categorieProduitId, setCategorieProduitId] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const statuts = [
    { value: "en stock", label: "en stock" },
    { value: "en rupture", label: "en rupture" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/CatégorieProduit`);
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };

    fetchCategories();
  }, []);

  const validate = () => {
    const newErrors = {};
    
    if (!libelle) newErrors.libelle = "Le libellé est requis.";
    else if (libelle.length > 255) newErrors.libelle = "Le libellé ne doit pas dépasser 255 caractères.";
    
    if (!image) newErrors.image = "L'image est requise.";
    
    if (!description) newErrors.description = "La description est requise.";
    
    if (!quantite) newErrors.quantite = "La quantité est requise.";
    else if (isNaN(quantite) || quantite <= 0) newErrors.quantite = "La quantité doit être un entier positif.";
    
    if (!prix) newErrors.prix = "Le prix est requis.";
    else if (isNaN(prix) || prix <= 0) newErrors.prix = "Le prix doit être un entier positif.";
    
    if (!statut) newErrors.statut = "Le statut est requis.";
    
    if (!categorieProduitId) newErrors.categorieProduitId = "La catégorie du produit est requise.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('size', 'auto');

    try {
      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: {
          'X-Api-Key': 'S1PnfkaQgxogU4MwKW5fNz95',
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      const imageWithoutBg = new File([response.data], file.name, { type: 'image/png' });
      setImage(imageWithoutBg);

    } catch (error) {
      console.error("Erreur lors de la suppression du fond de l'image:", error);
      setErrors((prevErrors) => ({ ...prevErrors, image: "Erreur lors du traitement de l'image." }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const formData = new FormData();
    formData.append("libelle", libelle);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("quantite", quantite);
    formData.append("prix", prix);
    formData.append("statut", statut);
    formData.append("categorie_produit_id", categorieProduitId);

    const userId = localStorage.getItem("userId");
    formData.append("user_id", userId);

    try {
      const response = await axios.post(`${config.apiBaseUrl}/Ajouter_produits`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setMessage(response.data.message);
      navigate('/afficherProduit');
      setErrors({});
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors);
        } else {
          console.error("Erreur lors de l'ajout du produit:", error.response.data);
          setMessage("Erreur lors de l'ajout du produit : " + error.response.data.message);
        }
      } else {
        console.error("Erreur lors de la connexion au serveur:", error);
        setMessage("Erreur lors de la connexion au serveur.");
      }
    }
  };

  return (
    <div className='AjoutProduitP'>
      <h2>Ajouter un Produit</h2>
      {message && <p>{message}</p>}
      {Object.keys(errors).length > 0 && (
        <div>
          <ul>
            {Object.keys(errors).map((key) => (
              <li key={key}>{errors[key]}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className='description_form1'>
          <div>
            <label>Libellé</label><br />
            <input
              type="text"
              value={libelle}
              onChange={(e) => setLibelle(e.target.value)}
            />
          </div>

          <div>
            <label>Description</label><br />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Quantité</label><br />
            <input
              type="number"
              value={quantite}
              onChange={(e) => setQuantite(e.target.value)}
            />
          </div>
          <div>
            <label>Prix</label><br />
            <input
              type="number"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
            />
          </div>
          <div>
            <label>Statut</label><br />
            <select
              value={statut}
              onChange={(e) => setStatut(e.target.value)}
            >
              <option value="">Sélectionnez un statut</option>
              {statuts.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Catégorie Produit</label><br />
            <select
              value={categorieProduitId}
              onChange={(e) => setCategorieProduitId(e.target.value)}
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((categorie) => (
                <option key={categorie.id} value={categorie.id}>
                  {categorie.libelle}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='description_form1'>
          <label>Sélectionnez une image</label>
          <div className="file-input-container">
            <label htmlFor="image-upload" className="file-input-label">
              <div className="icon-container">
                <i className="fa fa-image" aria-hidden="true"></i>
              </div><br />
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit">Ajouter le produit</button>
        </div>
      </form>
    </div>
  );
};

export default AjouterProduit;
