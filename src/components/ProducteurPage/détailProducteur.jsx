/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '/src/config';
import './listeproducteur.css'
const ProducteurDetail = () => {
  const { id } = useParams();
  const [producteur, setProducteur] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProducteur = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/utilisateurs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProducteur(response.data);
      } catch (error) {
        setMessage('Erreur lors de la récupération des détails du producteur.',error);
      }
    };

    fetchProducteur();
  }, [id]);

  if (!producteur) return <p>Chargement...</p>;

  return (
    <div className='détailProducteur'>
      <h2>Détails du Producteur</h2>
      {message && <p>{message}</p>}
      <img src={`${config.imageProfil}/${producteur.profile}`} alt={producteur.name} />
      <p><strong>Nom:</strong> {producteur.name}</p>
      <p><strong>Adresse:</strong> {producteur.adresse}</p>
      <p><strong>region:</strong> {producteur.regione}</p>
      <p><strong>Email:</strong> {producteur.email}</p>
      <p><strong>Téléphone:</strong> {producteur.telephone}</p>
      
    </div>
  );
};

export default ProducteurDetail;
