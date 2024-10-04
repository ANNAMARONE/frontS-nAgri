/* eslint-disable no-unused-vars */
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
          const response = await axios.get(`${config.apiBaseUrl}/commandes`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCommandes(response.data);
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

  return (
    <div>
      <h2>Mes Commandes</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <div className='commandesList'>
        {commandes.map(commande => (
          <div key={commande.id} className='commandeItem'>
            <p>ID de la Commande: {commande.id}</p>
            <p>Montant Total: {commande.montant_total} FCFA</p>
            <p>Date: {new Date(commande.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commandes;
