/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  const [producteur, setProducteur] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProducteur = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/utilisateurs/${id}`, {
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
    <div>
      <h2>Détails de l&apos;utilisateur</h2>
      {message && <p>{message}</p>}
      
      <p><strong>Nom:</strong> {producteur.name}</p>
      <p><strong>Adresse:</strong> {producteur.adresse}</p>
      <p><strong>Role:</strong> {producteur.role}</p>
      <p><strong>Email:</strong> {producteur.email}</p>
      <p><strong>Téléphone:</strong> {producteur.telephone}</p>
      
    </div>
  );
};

export default  UserDetail;
