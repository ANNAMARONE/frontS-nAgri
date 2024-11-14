/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { createContext, useState, useContext, useEffect } from 'react';

const PanierContext = createContext();

export const PanierProvider = ({ children }) => {
  const [panier, setPanier] = useState([]);
  const [panierCount, setPanierCount] = useState(0);

  // useEffect qui est exécuté après le montage du composant pour récupérer les données
  useEffect(() => {
    const panierFromLocalStorage = localStorage.getItem('panier');
    if (panierFromLocalStorage) {
      const parsedPanier = JSON.parse(panierFromLocalStorage);
      setPanier(parsedPanier);
      setPanierCount(parsedPanier.reduce((count, produit) => count + produit.quantite, 0));
    }
  }, []); 

  const updatePanier = (nouveauPanier) => {
    setPanier(nouveauPanier);
    setPanierCount(nouveauPanier.reduce((count, item) => count + item.quantite, 0));
    localStorage.setItem('panier', JSON.stringify(nouveauPanier));
  };

  return (
    <PanierContext.Provider value={{ panier, panierCount, updatePanier }}>
      {children}
    </PanierContext.Provider>
  );
};

// Validation des PropTypes
PanierProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const usePanier = () => useContext(PanierContext);
