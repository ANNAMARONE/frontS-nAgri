/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProduitsUtilisateurs = () => {
  const [produits, setProduits] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1); // Page actuelle
  const [totalPages, setTotalPages] = useState(1); // Nombre total de pages
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/afficher_produitParUser?page=${page}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProduits(response.data.data); // Laravel retourne les résultats dans une clé `data`
        setTotalPages(response.data.last_page); // Le nombre total de pages est disponible avec `last_page`
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Erreur lors de la connexion au serveur.");
        }
      }
    };

    fetchProduits();
  }, [page]); // Recharger les produits lorsque la page change

  const handleEdit = (produitId) => {
    navigate(`/modifierProduit/${produitId}`);
  };

  const handleDelete = async (produitId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/supprimer_produit/${produitId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setProduits(produits.filter((produit) => produit.id !== produitId));
      setMessage("Produit supprimé avec succès.");
    } catch (error) {
      setMessage("Erreur lors de la suppression du produit.");
    }
  };

  // Fonction pour changer de page
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <h2>Produits ajoutés</h2>
      <button style={{ marginBottom: '20px' }}>
        <NavLink to="/ajoutProduit" activeClassName="active">
          <FontAwesomeIcon icon={faPlus} /> Ajouter un produit
        </NavLink>
      </button>
      {message && <p>{message}</p>}
      {produits.length > 0 ? (
        <div>
          <ul>
            {produits.map((produit) => (
              <li key={produit.id}>
                {produit.libelle} - {produit.prix} - {produit.statut}
                <button onClick={() => handleEdit(produit.id)} style={{ marginLeft: '10px' }}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDelete(produit.id)} style={{ marginLeft: '10px' }}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
          </ul>
          {/* Pagination */}
          <div style={{ marginTop: '20px' }}>
            <button onClick={() => changePage(page - 1)} disabled={page === 1}>
              Précédent
            </button>
            <span style={{ margin: '0 10px' }}>Page {page} sur {totalPages}</span>
            <button onClick={() => changePage(page + 1)} disabled={page === totalPages}>
              Suivant
            </button>
          </div>
        </div>
      ) : (
        <p>Aucun produit trouvé.</p>
      )}
    </div>
  );
};

export default ProduitsUtilisateurs;
