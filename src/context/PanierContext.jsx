import React, { createContext, useContext, useState, useEffect } from 'react';

const PanierContext = createContext();

export const PanierProvider = ({ children }) => {
  // Initialisez le panier à partir du localStorage s'il existe, sinon avec un tableau vide
  const [panier, setPanier] = useState(() => {
    const panierSauvegarde = localStorage.getItem('panier');
    return panierSauvegarde ? JSON.parse(panierSauvegarde) : [];
  });

  // Sauvegarder le panier dans le localStorage à chaque changement de celui-ci
  useEffect(() => {
    localStorage.setItem('panier', JSON.stringify(panier));
  }, [panier]);

  const ajouterAuPanier = (produit) => {
    setPanier((prevPanier) => {
      const produitExist = prevPanier.find(item => item.produit.id === produit.id);
      if (produitExist) {
        return prevPanier.map(item => 
          item.produit.id === produit.id 
            ? { ...item, quantite: item.quantite + 1 }
            : item
        );
      } else {
        return [...prevPanier, { produit, quantite: 1 }];
      }
    });
  };

  const supprimerDuPanier = (id) => {
    setPanier((prevPanier) => prevPanier.filter(item => item.produit.id !== id));
  };

  const modifierQuantite = (id, nouvelleQuantite) => {
    setPanier((prevPanier) => {
      return prevPanier.map(item => {
        if (item.produit.id === id) {
          return { ...item, quantite: nouvelleQuantite };
        }
        return item;
      });
    });
  };

  const montantTotal = panier.reduce((total, item) => total + (item.produit.prix * item.quantite), 0);

  return (
    <PanierContext.Provider value={{ panier, ajouterAuPanier, supprimerDuPanier, modifierQuantite, montantTotal }}>
      {children}
    </PanierContext.Provider>
  );
};

export const usePanier = () => {
  return useContext(PanierContext);
};
