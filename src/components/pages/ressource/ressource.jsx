/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from '/src/config';
import { Link } from "react-router-dom";
const RessourcesList = () => {
  const [ressources, setRessources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Récupérer les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/catégorieRessouce`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setCategories(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des catégories.");
      }
    };

    fetchCategories();
  }, []);

  // Récupérer les ressources (avec ou sans catégorie sélectionnée)
  useEffect(() => {
    const fetchRessources = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = selectedCategory
          ? `${config.apiBaseUrl}/ressources/categorie/${selectedCategory}?page=${currentPage}`
          : `${config.apiBaseUrl}/ressources?page=${currentPage}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        setRessources(response.data.data);
        setTotalPages(response.data.last_page); // Pagination total pages
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message || 'Erreur lors de la récupération des ressources.');
        } else {
          setError("Erreur réseau.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRessources();
  }, [selectedCategory, currentPage]);


  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); 
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Liste des Ressources</h2>

      {/* Afficher les catégories */}
      <div>
        <h3>Catégories</h3>
        <ul>
          {categories.map((category) => (
            <li key={category.id} onClick={() => handleCategoryClick(category.id)}>
              {category.libelle}
            </li>
          ))}
        </ul>
      </div>

      {/* Afficher les ressources */}
      <ul>
        {ressources.map((ressource) => (
          <li key={ressource.id}>
             <Link to={`/ressources/${ressource.id}`}> 
            <h3>{ressource.libelle}</h3>
            </Link>
            <img src={`${config.imageBaseUrl}/${ressource.image}`} alt={ressource.libelle} />
            <p>{ressource.description}</p>
            <p>Date : {new Date(ressource.created_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Précédent
        </button>
        <span>Page {currentPage} sur {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default RessourcesList;
