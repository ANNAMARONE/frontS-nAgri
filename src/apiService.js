import axios from 'axios';
import config from '/src/config';

// Fonction pour récupérer les produits
export const fetchProduits = async (page = 1) => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/afficher_produit?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw error;
  }
};

// Fonction pour récupérer les catégories
export const fetchCategorie = async () => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/CatégorieProduit`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    throw error;
  }
};
//Fonction afficher les produits par catégorie
export const fetchProduitByCatégorie=async(categorieId)=>{
  try {
    const response = await axios.get(`${config.apiBaseUrl}/categories/${categorieId}/produits`);
    return response.data; 
  } catch (error) {
    console.error('Erreur lors de la récupération des produits par catégorie:', error);
    throw error; 
  }
};
