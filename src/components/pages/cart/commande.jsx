import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '/src/config';
import './panier.css';

const Commandes = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCommandes = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        setLoading(true);
        setErrorMessage('');

        try {
          const response = await axios.get(`${config.apiBaseUrl}/mes-commandes`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCommandes(response.data.commandes);
        } catch (error) {
          console.error('Erreur lors de la récupération des commandes:', error);
          setErrorMessage('Erreur lors de la récupération des commandes. Veuillez réessayer.');
        } finally {
          setLoading(false);
        }
      } else {
        setErrorMessage('Veuillez vous connecter pour voir vos commandes.');
      }
    };

    fetchCommandes();
  }, []);
  const handleDelete = async (commandeId) => {
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        await axios.delete(`${config.apiBaseUrl}/mes-commandes/${commandeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Mettre à jour l'état local pour enlever la commande supprimée
        setCommandes(commandes.filter(commande => commande.id !== commandeId));
      } catch (error) {
        console.error('Erreur lors de la suppression de la commande:', error);
        setErrorMessage('Erreur lors de la suppression de la commande. Veuillez réessayer.');
      }
    } else {
      setErrorMessage('Veuillez vous connecter pour supprimer une commande.');
    }
  };
  

  return (
    <div>
      <h2>Mes Commandes</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {loading && <div>Chargement...</div>}
      <div className='commandesList'>
        {commandes.map(commande => (
          <div key={commande.id} className='commandeItem'>
            <h3>ID de la Commande: {commande.id}</h3>
            <p>Date de la Commande: {new Date(commande.created_at).toLocaleDateString()}</p>
            <p>Montant Total de la Commande: {commande.montant_total} FCFA</p>
            <h4>Produits:</h4>
            <ul>
              {commande.produits.map(produit => (
                <li key={produit.id}>
                  <p>Produit: {produit.libelle}</p>
                  <p>Quantité: {produit.pivot.quantite}</p>
                  <p>Montant: {produit.pivot.montant} FCFA</p>
                  <p>statut:{commande.	status_de_commande	}</p>
                </li>
              ))}
            </ul>
            <button onClick={() => handleDelete(commande.id)}>Supprimer la commande</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commandes;
