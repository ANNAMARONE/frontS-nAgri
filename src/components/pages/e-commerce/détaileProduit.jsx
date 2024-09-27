import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 

const ProductDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
   
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/détail_produit/${id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Erreur lors de la récupération du produit');
        }
        
        setProduct(data.produit);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); 

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      {product ? (
        <div>
          <h1>{product.nom_produit}</h1>
          <p>Description: {product.description}</p>
          <p>Prix: {product.prix_unitaire} €</p>
          <p>Quantité disponible: {product.quantité}</p>
        </div>
      ) : (
        <p>Produit non trouvé</p>
      )}
    </div>
  );
};

export default ProductDetails;
