/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '/src/config';

const Panier = () => {
  const [panier, setPanier] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const panierFromLocalStorage = localStorage.getItem('panier');
    const userFromLocalStorage = localStorage.getItem('user');
    
    console.log('Utilisateur récupéré depuis localStorage:', userFromLocalStorage);
  
    if (panierFromLocalStorage) {
      setPanier(JSON.parse(panierFromLocalStorage));
    }
  }, []);
  
  const modifierQuantite = (id, quantite) => {
    if (quantite < 1) return; // Ne pas permettre une quantité inférieure à 1

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
    const userFromLocalStorage = localStorage.getItem('user');
    const user = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
    const token = localStorage.getItem('token'); 
    const userId = user ? user.id : null; 
  
    if (userId && panier.length > 0) { 
      setLoading(true);
      setErrorMessage('');
      setSuccessMessage('');
  

      const produitsData = panier.map(produit => ({
        produit_id: produit.id,  
        quantite: produit.quantite
      }));
  
      try {
        const response = await axios.post(`${config.apiBaseUrl}/commander`, {
          produits: produitsData, // Utilisation des données correctement formatées
          user_id: userId,
          montant_total: montantTotal,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Commande réussie:', response.data);
        setSuccessMessage('Commande réussie ! Merci pour votre achat.');
        setPanier([]); 
        localStorage.removeItem('panier'); 
      } catch (error) {
        console.error('Erreur lors de l\'envoi de la commande:', error);
        setErrorMessage('Erreur lors de la création de la commande. Veuillez réessayer.');
        if (error.response) {
          console.log('Détails de la réponse:', error.response.data);
          console.log('Statut:', error.response.status);
        }
      } finally {
        setLoading(false);
      }
  
    } else {
      console.log('L\'utilisateur n\'est pas connecté.');
      setErrorMessage('Veuillez vous connecter avant de passer une commande.');
    }
  };
  
  
  return (
    <div>
      <h2>Mon Panier</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>} 
      
      {panier.map(produit => (
        <div key={produit.id}>
          <h3>{produit.libelle}</h3>
          <p>{produit.prix} FCFA</p>
          <input
            type="number"
            value={produit.quantite}
            onChange={(e) => modifierQuantite(produit.id, parseInt(e.target.value))}
            min="1"
          />
          <button onClick={() => supprimerProduit(produit.id)}>Supprimer</button>
        </div>
      ))}
      <h3>Montant Total: {montantTotal} FCFA</h3>
      <button onClick={handleCommander} disabled={loading}>{loading ? 'Chargement...' : 'Commander'}</button> 
    </div>
  );
};

export default Panier;
