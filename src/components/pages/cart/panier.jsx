/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import config from '/src/config';
import { Link } from 'react-router-dom'; 
import './panier.css';
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2'
const Panier = () => {
  const [panier, setPanier] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState("en_ligne");
  const navigate = useNavigate();
  

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!userFromLocalStorage || !token) {
      setErrorMessage('Veuillez vous connecter pour accéder à votre panier.');
      navigate('/login'); 
      return;
    }

    const panierFromLocalStorage = localStorage.getItem('panier');
    if (panierFromLocalStorage) {
      setPanier(JSON.parse(panierFromLocalStorage));
    }
  }, [navigate]);

  const modifierQuantite = (id, quantite) => {
    if (quantite < 1) return;

    const updatedPanier = panier.map(produit =>
      produit.id === id ? { ...produit, quantite } : produit
    );
    setPanier(updatedPanier);
    localStorage.setItem('panier', JSON.stringify(updatedPanier));
  };

  const supprimerProduit = (id) => {
    const updatedPanier = panier.filter(produit => produit.id !== id);
    setPanier(updatedPanier);
    localStorage.setItem('panier', JSON.stringify(updatedPanier));
  };

  const montantTotal = panier.reduce((total, produit) => total + produit.prix * produit.quantite, 0);

  const montantExpedition = 500; 
  const montantTotalAvecExpedition = montantTotal + montantExpedition;

  const handleCommander = async () => {
    const userFromLocalStorage = localStorage.getItem('user');
    const user = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
    const token = localStorage.getItem('token');
    const userId = user ? user.id : null;

    if (userId && panier.length > 0) {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        const produitsData = panier.map(produit => ({
            produit_id: produit.id,
            quantite: produit.quantite
        }));

        try {
            const response = await axios.post(`${config.apiBaseUrl}/commander`, {
                produits: produitsData,
                user_id: userId,
                montant_total: montantTotal,
                payment_method: paymentMethod,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Vérification du type de paiement
            if (paymentMethod === "en_ligne") {
                if (response.data.payment_link) {
                    // Vider le panier avant de rediriger
                    setPanier([]); 
                    localStorage.removeItem('panier');
                    window.location.href = response.data.payment_link;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur',
                        text: response.data.message || 'Une erreur est survenue.',
                    });
                }
            } else {
                // Pour le paiement hors ligne
                setPanier([]); 
                localStorage.removeItem('panier');
                window.location.reload();
                Swal.fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'Commande créée avec succès!',
                });
            }
        } catch (error) {
            console.error('Erreur lors de la commande ou du paiement:', error);
            setErrorMessage('Une erreur est survenue lors de la commande ou du paiement. Veuillez réessayer.');
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la commande ou du paiement. Veuillez réessayer.',
            });

            if (error.response) {
                console.log('Détails de la réponse:', error.response.data);
            }
        } finally {
            setLoading(false);
        }
    } else {
        setErrorMessage('Veuillez vous connecter avant de passer une commande.');
        Swal.fire({
            icon: 'warning',
            title: 'Attention',
            text: 'Veuillez vous connecter avant de passer une commande.',
        });
    }
};

  
  
  
  return (
    <div>
      <div className='headerpanier'>
        <h2>Mon Panier</h2>
        <button className='Buttoncommandes'><Link to="/commande">Mes commandes</Link> </button>
      </div>
      <div className='tr1'></div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>} 
      <div className='PanierCommande'>
        <div>
          {panier.length === 0 ? (
            <p>Votre panier est vide.</p>
          ) : (
            panier.map(produit => (
              <div key={produit.id}>
                <div className='ProduitPanier'>
                  <div className='elementPanier1'>
                    <div className="image-container">
                      <img src={`${config.imageBaseUrl}/${produit.image}`} alt={produit.nom} />
                    </div>
                    <div className='elementPanier2'>
                      <h3>{produit.libelle}</h3>
                      <p>quantite: {produit.quantite}</p>
                      <input
                        type="number"
                        value={produit.quantite}
                        onChange={(e) => modifierQuantite(produit.id, parseInt(e.target.value))}
                        min="1"
                      />
                      <button onClick={() => supprimerProduit(produit.id)}><MdDeleteForever size={24} /></button>
                    </div>
                  </div>
                  <div className='elementPanierPrix'>
                    <p>{produit.prix} FCFA</p>
                  </div>
                </div>
              </div>
            ))
          )}
               
        </div>
        <div className='commandePanier'>
        <div>
{/* methode de payement */}
<form className="styled">
      <fieldset>
        <legend>choisire un moyenne de payement</legend>

        <div className="options">
          <label>
            <input
              className="cc"
              name="payment"
              value="en_ligne"
              type="radio"
              checked={paymentMethod === "en_ligne"}
              onChange={handlePaymentChange}
            />
            <svg aria-hidden="true" viewBox="0 0 249 177">
              <use href="#card" />
            </svg>
            <span id="cc-title">Paiement</span>
            <span id="cc-hint">En ligne</span>
          </label>

          <label>
            <input
              className="cc2"
              name="payment"
              value="Paiement à la livraison"
              type="radio"
              checked={paymentMethod === "Paiement à la livraison"}
              onChange={handlePaymentChange}
            />
            <svg aria-hidden="true" viewBox="0 0 249 177">
              <use href="#card" />
            </svg>
            <span id="cc-title2">Paiement</span>
            <span id="cc-hint2">Paiement à la livraison</span>
          </label>
        </div>
      </fieldset>

    </form>
            </div>
          <h1>Résumé de la commande</h1>
          <div className='resume-details'>
            <div className='detail-item'>
              <p>Total des produits:</p>
              <h3>{montantTotal} FCFA</h3>
            </div>
            <div className='detail-item'>
              <p>Expédition:</p>
              <h3>{montantExpedition} FCFA</h3>
            </div>
            <div className='detail-item'>
              <p>Montant Total:</p>
              <h3>{montantTotalAvecExpedition} FCFA</h3>
            </div>
          </div>
          <button onClick={handleCommander} disabled={loading} className='payment-button'>
            {loading ? 'Chargement...' : 'Continuer vers le paiement'}
          </button>
        </div>
      </div>
   

    
    </div>
  );
};

export default Panier;
