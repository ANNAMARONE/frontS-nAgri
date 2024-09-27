import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '/src/config';
const user = { id: userId, name: userName }; // Exemple d'objet utilisateur
localStorage.setItem('user', JSON.stringify(user));
const Panier = () => {
  const [panier, setPanier] = useState([]);

  useEffect(() => {
    const panierFromLocalStorage = localStorage.getItem('panier');
    if (panierFromLocalStorage) {
      setPanier(JSON.parse(panierFromLocalStorage));
    }
  }, []);

  const modifierQuantite = (id, quantite) => {
    const updatedPanier = panier.map(produit =>
      produit.id === id ? { ...produit, quantite } : produit
    );
    setPanier(updatedPanier);
    localStorage.setItem('panier', JSON.stringify(updatedPanier));
  };

  const supprimerProduit = (id) => {
    const updatedPanier = panier.filter(produit => produit.id !== id);
    setPanier(updatedPanier);
    localStorage.setItem('panier', JSON.stringify(updatedPanier));
  };

  const montantTotal = panier.reduce((total, produit) => total + produit.prix * produit.quantite, 0);
  const handleCommander = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;
  
    if (userId) {
      try {
        const response = await axios.post(`${config.apiBaseUrl}/api/commande`, {
          panier,
          user_id: userId, // Ajoutez l'ID de l'utilisateur ici
        });
        console.log('Commande réussie:', response.data);
        
        // Vider le panier après la commande
        setPanier([]);
        localStorage.removeItem('panier');
      } catch (error) {
        console.error('Erreur lors de l\'envoi de la commande:', error);
      }
    } else {
      console.log('L\'utilisateur n\'est pas connecté.');
    }
  };


  
  return (
    <div>
      <h2>Mon Panier</h2>
      {panier.map(produit => (
        <div key={produit.id}>
          <h3>{produit.libelle}</h3>
          <p>{produit.prix} FCFA</p>
          <input
            type="number"
            value={produit.quantite}
            onChange={(e) => modifierQuantite(produit.id, parseInt(e.target.value))}
          />
          <button onClick={() => supprimerProduit(produit.id)}>Supprimer</button>
        </div>
      ))}
      <h3>Montant Total: {montantTotal} FCFA</h3>
      <button onClick={handleCommander}>Commander</button>
    </div>
  );
};

export default Panier;
