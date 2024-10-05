/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import config from '/src/config';
import './détailProduit.css';
import { SlHandbag } from "react-icons/sl";
import { FcLikePlaceholder } from "react-icons/fc";
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import Swal from 'sweetalert2'

const ProductDetails = () => {
  const { id } = useParams(); 
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1); 
  const [panier, setPanier] = useState([]);
  const [liked, setLiked] = useState(false);
  const [quantites, setQuantites] = useState({});
  useEffect(() => {
   
    const fetchProduit = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/détail_produit/${id}`);
        const data = await response.json();
        console.log(produit)
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
 // Récupérer le panier depuis le localStorage au chargement du composant
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

// Sauvegarder le panier dans le localStorage à chaque mise à jour
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


  const ajouterAuPanier = (produit, quantite = 1) => {
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
      title: "produit ajouter au panier avc succée",
      showConfirmButton: false,
      timer: 1500
    });
    console.log("Panier actuel :", nouveauPanier);
  };
  const handleLike = (produit) => {
    console.log("Produit ID:", produit.id);
    if (!liked && produit.id) {
      axios.post(`${config.apiBaseUrl}/product/${produit.id}/like`)
        .then(res => {
          setLiked(true); 
        })
        .catch(error => {
          console.error("Erreur lors de l'ajout du like :", error);
        });
    } else {
      console.error("Produit non valide ou déjà liké");
    }
  };
//button quantité 


const qtyMin = 0;
const qtyMax = 10;

const handleChange = (e) => {
  let value = parseInt(e.target.value, 10);
  if (isNaN(value) || value < qtyMin) {
    setQty(qtyMin);
  } else if (value > qtyMax) {
    setQty(qtyMax);
  } else {
    setQty(value);
  }
};

const handleClick = (operator) => {
  if (operator === "add") {
    if (qty < qtyMax) {
      setQty(qty + 1);
    }
  } else {
    if (qty > qtyMin) {
      setQty(qty - 1);
    }
  }
}

  return (
    <div className='containerDétailP'>
      <div className='closeButton'><IoMdClose /></div>
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
        disabled={qty <= qtyMin}
        type="button"
      >
        -
      </button>
      <input
        className="product-qty"
        type="number"
        name="product-qty"
        min={qtyMin}
        max={qtyMax}
        value={qty}
        onChange={handleChange}
      />
      <button
        className="qty-count qty-count--add"
        onClick={() => handleClick("add")}
        disabled={qty >= qtyMax}
        type="button"
      >
        +
      </button>
    </div>
    <button className='ajoutcarte' onClick={() =>ajouterAuPanier(produit)}>
  ajouter au panier <SlHandbag size={20}/>
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
