/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '/src/config';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import './commande.css';
import {  MdRateReview } from 'react-icons/md';
import Swal from 'sweetalert2'
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; 
const Commandes = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState('');
  const [selectedCommandeId, setSelectedCommandeId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('user');
    const user = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
    const token = localStorage.getItem('token');

    if (!user || !token) {
      // Stocker la route actuelle pour redirection après la connexion
      localStorage.setItem('redirectPath', window.location.pathname);
  
      // Rediriger vers la page de connexion
      Swal.fire({
          icon: 'warning',
          title: 'Attention',
          text: 'Veuillez vous connecter pour voire vos commandes.',
      }).then(() => {
          navigate('/login');
      });
      return;
  }
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
  
  

  const handleStatusChange = async (commandeId, status) => {
    if (!commandeId) {
      console.error('Commande ID is null or undefined');
      setErrorMessage('Erreur: ID de la commande non trouvé.');
      return;
    }
  
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch(`${config.apiBaseUrl}/commandes/${commandeId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status_de_commande: status }),
      });
  
      if (!response.ok) {
        // Affiche le statut et le message d'erreur de la réponse
        const errorData = await response.json();
        throw new Error(`Erreur lors de la mise à jour du statut: ${response.status} ${errorData.message}`);
      }
  
      const data = await response.json();
  
      // Met à jour la liste des commandes avec le nouveau statut
      setCommandes(commandes.map(commande =>
        commande.id === commandeId ? { ...commande, status_de_commande: status } : commande
      ));
      setSelectedCommandeId(null);
      setStatus('');
    } catch (error) {
      console.error('Erreur:', error);
      setErrorMessage('Erreur lors de la mise à jour du statut.');
    }
  };
  
  
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Modifier le Statut</Popover.Header>
      <Popover.Body>
        <select
        className='buttonStatut'
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value='invalide'>Invalide</option>
          <option value='en_attente'>En Attente</option>
          <option value='en_cours'>En Cours</option>
          <option value='expediee'>Expédiée</option>
          <option value='livree'>Livrée</option>
        </select>
        <Button 
          variant="primary"
          onClick={() => handleStatusChange(selectedCommandeId, status)}
          style={{ marginLeft: '10px' }}
        >
          Enregistrer
        </Button>
      </Popover.Body>
    </Popover>
  );



  return (
    <div>
      {/* banner */}
      <div className='bannerCommande'>
  <h2 className='mesCommandesTitle'>Mes Commandes</h2>
  <p className='commandesDescription'>
    Découvrez vos commandes récentes, suivez leur statut et gérez facilement vos achats en un seul endroit.
  </p>
</div>


      {/* banner */}

      {errorMessage && <div className="error">{errorMessage}</div>}
      {loading && <div>Chargement...</div>}
      <div className='commandesList'>
      {commandes.map(commande => (
        <div key={commande.id} className='commandeItem'>
          <h3>Commande: {commande.references}</h3>
          <p>Date de la Commande: {new Date(commande.created_at).toLocaleDateString()}</p>
          <p>Montant Total de la Commande: {commande.montant_total} FCFA</p>
          <h4>Produits:</h4>
          <ul>
            {commande.produits.map(produit => (
              <li key={produit.id}>
                <p>Produit: {produit.libelle}</p>
                <div className='infoCommande'>
                  <div className='imageCommande'>
                    <img src={`${config.imageBaseUrl}/${produit.image}`} alt={produit.nom} />
                  </div>
                  <div>
                    <p>Quantité: {produit.pivot.quantite}</p>
                    <p>Montant: {produit.pivot.montant} FCFA</p>
                    <p>Statut: {commande.status_de_commande}</p>
                  </div>
                </div>
                <hr />
              </li>
            ))}
          </ul>

          <div className="commandeActions">
          
            
            {/* Laisser un avis */}
            <OverlayTrigger
  trigger="click"
  placement="right"
  overlay={popover}
  onClick={() => {
    setSelectedCommandeId(commande.id);
    setStatus(commande.status_de_commande); 
  }}
>
  <button>
    <MdRateReview size={30} /> Modifier le Statut
  </button>
</OverlayTrigger>

            
            {/* Supprimer la commande */}
            <button onClick={() => handleDelete(commande.id)}>
              <MdDeleteForever size={30} /> Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Commandes;
