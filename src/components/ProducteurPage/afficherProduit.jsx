/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ProduitsUtilisateurs = () => {
  const [produits, setProduits] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/afficher_produitParUser', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProduits(response.data);
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Erreur lors de la connexion au serveur.");
        }
      }
    };

    fetchProduits();
  }, []);

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

  return (
    <div>
      <h2>Produits ajoutés</h2>
      <button 
        onClick={() => console.log("Rediriger vers la page d'ajout de produit")}
        style={{ marginBottom: '20px' }}
        
      >
        <NavLink to="/ajoutProduit" activeClassName="active"> <FontAwesomeIcon icon={faPlus} /> Ajouter un produit</NavLink>
       
      </button>
      {message && <p>{message}</p>}
      {produits.length > 0 ? (
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
      ) : (
        <p>Aucun produit trouvé.</p>
      )}
    </div>
  );
};

export default ProduitsUtilisateurs;
