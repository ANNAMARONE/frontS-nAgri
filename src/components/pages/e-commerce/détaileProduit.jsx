/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom'; 
import config from '/src/config';
import './détailProduit.css';
import { SlHandbag } from "react-icons/sl";
import { FcLikePlaceholder } from "react-icons/fc";
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import Swal from 'sweetalert2';

const ProductDetails = () => {
  const { id } = useParams(); 
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1); 
  const [panier, setPanier] = useState([]);
  const [liked, setLiked] = useState(false);
  const [quantites, setQuantites] = useState({});
  const [filteredProduits, setFilteredProduits] = useState([]); 
  useEffect(() => {
    const fetchProduit = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/détail_produit/${id}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Erreur lors de la récupération du produit');
        }
        setProduit(data.produit);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduit();
  }, [id]); 

  useEffect(() => {
    const panierStocké = localStorage.getItem('panier');
    if (panierStocké) {
      const panierParsed = JSON.parse(panierStocké);
      setPanier(panierParsed);
      const initialQuantites = panierParsed.reduce((acc, produit) => {
        acc[produit.id] = produit.quantite;
        return acc;
      }, {});
      setQuantites(initialQuantites);
    }
  }, []);

  useEffect(() => {
    if (panier.length > 0) {
      localStorage.setItem('panier', JSON.stringify(panier));
      console.log('Panier mis à jour dans localStorage:', panier);
    }
  }, [panier]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  const ajouterAuPanier = (produit, quantite = qty) => {
    const produitExist = panier.find(item => item.id === produit.id);
    let nouveauPanier;
  
    if (produitExist) {
      if (produitExist.quantite + quantite <= produit.quantite) { 
        nouveauPanier = panier.map(item => 
          item.id === produit.id 
          ? { ...item, quantite: item.quantite + quantite }
          : item
        );
      } else {
        console.log("Stock insuffisant");
        return; 
      }
    } else {
      if (quantite <= produit.quantite) {
        nouveauPanier = [...panier, { ...produit, quantite }];
      } else {
        console.log("Stock insuffisant");
        return; 
      }
    }
  
    setPanier(nouveauPanier);
    localStorage.setItem("panier", JSON.stringify(nouveauPanier)); 
    console.log("Produit ajouté au panier :", produit);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Produit ajouté au panier avec succès",
      showConfirmButton: false,
      timer: 1500
    });
    console.log("Panier actuel :", nouveauPanier);
  };

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      setQty(1);
    } else if (value > produit.quantite) {
      setQty(produit.quantite);
    } else {
      setQty(value);
    }
  };

  const handleClick = (operator) => {
    if (operator === "add") {
      if (qty < produit.quantite) {
        setQty(qty + 1);
      }
    } else {
      if (qty > 1) {
        setQty(qty - 1);
      }
    }
  };

  const handleLike = (produit) => {
    if (!produit.id || liked) {
      console.error("Produit non valide ou déjà liké");
      return;
    }
  
    const token = localStorage.getItem("token"); 
  
    axios.post(
      `${config.apiBaseUrl}/produit/${produit.id}/like`, 
      {}, 
      {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      }
    )
    .then(res => {
      const updatedLikes = res.data.likes; 
      setFilteredProduits(prevProduits =>
        prevProduits.map(p =>
          p.id === produit.id ? { ...p, likes: updatedLikes } : p
        )
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Produit liké avec succès",
        showConfirmButton: false,
        timer: 1500
      });
    })
    .catch(error => {
      console.error("Erreur lors de l'ajout du like :", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Échec du like",
        showConfirmButton: false,
        timer: 1500
      });
    });
  };
  
  return (
    <div className='containerDétailP'>
      <NavLink to="/produit">
        <div className='closeButton'><IoMdClose /></div>
      </NavLink>
      
      <div className='containerDétail1'>
      {produit ? (
        <div className='carteDétail'>
          <div className='CarteImage'>
            <img src={`${config.imageBaseUrl}/${produit.image}`} alt={produit.nom} />
          </div>
          <div className='ProduitElementDétaile'>
            <div className='headerCartE'>
              <h1>{produit.libelle}</h1>
              <p>{produit.statut}</p>
            </div>
            <p className='NamePrix'>{produit.prix} cfa</p>
            <hr />
            <p>Description: {produit.description}</p>
            <hr />
            <div className='buttonAction'>
              <div className="qty-input">
                <button
                  className="qty-count qty-count--minus"
                  onClick={() => handleClick("minus")}
                  disabled={qty <= 1}
                  type="button"
                >
                  -
                </button>
                <input
                  className="product-qty"
                  type="number"
                  name="product-qty"
                  min={1}
                  max={produit.quantite}
                  value={qty}
                  onChange={handleQuantityChange}
                />
                <button
                  className="qty-count qty-count--add"
                  onClick={() => handleClick("add")}
                  disabled={qty >= produit.quantite}
                  type="button"
                >
                  +
                </button>
              </div>
              <button className='ajoutcarte' onClick={() => ajouterAuPanier(produit, qty)}>
                Ajouter au panier <SlHandbag size={20}/>
              </button>
              <button className='likeicon' onClick={() => handleLike(produit)}>
                <i className="fa-regular fa-heart fa-lg"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Produit non trouvé</p>
      )}
      </div>
    </div>
  );
};

export default ProductDetails;
