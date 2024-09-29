import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AjouterProduit = () => {
  const [libelle, setLibelle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [quantite, setQuantite] = useState("");
  const [prix, setPrix] = useState("");
  const [statut, setStatut] = useState(""); // État pour le statut
  const [categorieProduitId, setCategorieProduitId] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const [categories, setCategories] = useState([]);

  const statuts = [
    { value: "en stock", label: "en stock" },
    { value: "en rupture", label: "en rupture" },
   
  ];

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setErrors((prevErrors) => [...prevErrors, { image: ["L'image est requise."] }]);
      return;
    }

    const formData = new FormData();
    formData.append("libelle", libelle);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("quantite", quantite);
    formData.append("prix", prix);
    formData.append("statut", statut); // Ajouter le statut
    formData.append("categorie_produit_id", categorieProduitId);

    const userId = localStorage.getItem("userId");
    formData.append("user_id", userId);

    try {
        const response = await axios.post("http://127.0.0.1:8000/api/Ajouter_produits", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      
        setMessage(response.data.message);
        setErrors([]);
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
    <div>
      <h2>Ajouter un Produit</h2>
      {message && <p>{message}</p>}
      {errors.length > 0 && (
        <div>
          <ul>
            {Object.keys(errors).map((key) => (
              <li key={key}>{errors[key][0]}</li>
            ))}
          </ul>
        </div>
      )}
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
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
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
          <label>Quantité</label>
          <input
            type="number"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Prix</label>
          <input
            type="number"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Statut</label>
          <select
            value={statut}
            onChange={(e) => setStatut(e.target.value)}
            required
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
          <label>Catégorie Produit</label>
          <select
            value={categorieProduitId}
            onChange={(e) => setCategorieProduitId(e.target.value)}
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((categorie) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.libelle} {/* Adaptez selon la propriété de votre modèle */}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Ajouter le produit</button>
      </form>
    </div>
  );
};

export default AjouterProduit;
