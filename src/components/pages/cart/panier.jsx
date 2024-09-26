import React, { useEffect, useState } from 'react';

const Panier = () => {
  const [panier, setPanier] = useState([]);

  // Récupérer le panier depuis le localStorage au chargement du composant
  useEffect(() => {
    const panierStocké = localStorage.getItem('panier');
    if (panierStocké) {
      setPanier(JSON.parse(panierStocké));
    }
  }, []);

  // Sauvegarder le panier dans le localStorage à chaque mise à jour
  useEffect(() => {
    localStorage.setItem('panier', JSON.stringify(panier));
    console.log('Panier mis à jour dans localStorage:', panier); // Log pour vérifier
  }, [panier]);

  return (
    <div className='panier'>
      <h2>Votre panier</h2>
      {panier.length === 0 ? (
        <p>Le panier est vide.</p>
      ) : (
        panier.map(item => (
          <div key={item.produit.id}>
            <p>{item.produit.libelle} - Quantité : {item.quantite}</p>
            <p>Prix unitaire : {item.produit.prix} CFA</p>
            <p>Prix total : {item.produit.prix * item.quantite} CFA</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Panier;
