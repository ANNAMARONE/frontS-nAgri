/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import config from '/src/config';
import './détailProduit.css'
const ProductDetails = () => {
  const { id } = useParams(); 
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
   
    const fetchProduit = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/détail_produit/${id}`);
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

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className='containerDétailP'>
      <div className='containerDétail1'>
      {produit ? (
        <div className=''>
<div>
<img src={`${config.imageBaseUrl}/${produit.image}`} alt={produit.nom} />
</div>
<div>
<h1>{produit.libelle}</h1>
         
         <p>Description: {produit.description}</p>
         <p>Prix: {produit.prix} cfa</p>
         <p>Quantité disponible: {produit.quantite}</p>
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
