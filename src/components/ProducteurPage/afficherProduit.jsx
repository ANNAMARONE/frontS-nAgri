/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '/src/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './afficherProduit.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { HiDotsVertical } from "react-icons/hi";
const ProduitsUtilisateurs = () => {
  const [produits, setProduits] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/afficher_produitParUser?page=${page}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProduits(response.data.data); 
        setTotalPages(response.data.last_page); 
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Erreur lors de la connexion au serveur.");
        }
      }
    };

    fetchProduits();
  }, [page]); 
  const handleEdit = (produitId) => {
    navigate(`/modifierProduit/${produitId}`);
  };

  const handleDelete = async (produitId) => {
    try {
      await axios.delete(`${config.apiBaseUrl}/supprimer_produit/${produitId}`, {
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
    <div className='AfficheProduitProducteur'>
      <div className='headerListProduit'>
      <h2>Tous les produits</h2> 
      <button style={{ marginBottom: '20px' }}>
        <NavLink to="/ajoutProduit" activeClassName="active">
          <FontAwesomeIcon icon={faPlus} /> Ajouter un produit
        </NavLink>
      </button>
      </div>
     
     
      {message && <p>{message}</p>}
      {produits.length > 0 ? (
       <div>
        <div >
       <ul className="produit-liste">

       {produits.map((produit) => (
           <li key={produit.id} >
          <div className='cartProduitProducteur'>
          <div className="produitTopcart">
            <img src={`${config.imageBaseUrl}/${produit.image}`}/><br />
            <div>
            <span>{produit.libelle}</span><br />
            <span>{produit.prix} CFA</span>
            </div>
           <div>
           {['left'].map((placement) => (
        <OverlayTrigger
          trigger="click"
          key={placement}
          placement={placement}
          overlay={
            <Popover id={`popover-positioned-${placement}`}>
              <Popover.Header as="h3">action</Popover.Header>
              <Popover.Body>
              <div>
               <button
                 onClick={() => handleEdit(produit.id)}
                 className="edit-btn"
               >
                 Modifier<FontAwesomeIcon icon={faEdit} />
               </button><br />
               <button
                 onClick={() => handleDelete(produit.id)}
                 className="delete-btn"
               >supprimer
                 <FontAwesomeIcon icon={faTrash} />
               </button>
             </div>
              </Popover.Body>
            </Popover>
          }
        >
          <Button className='togollePopover'><HiDotsVertical size={24}/></Button>
        </OverlayTrigger>
      ))}
         
           </div>
            </div>
             <div className="produit_info">
              <p>{produit.description}</p>
             </div>
            
          </div>
           </li>
         ))}
       </ul>
       </div>

     
       {/* Pagination */}
       <div className="pagination">
         <button onClick={() => changePage(page - 1)} disabled={page === 1}>
           Précédent
         </button>
         <span>Page {page} sur {totalPages}</span>
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
