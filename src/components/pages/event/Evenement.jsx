/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from '/src/config';

const Evenement = () => {
  const [evenements, setEvenements] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvenements = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/evenements`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          }
        });
        setEvenements(response.data);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message || 'Erreur lors de la récupération des événements.');
        } else {
          setError("Erreur réseau.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvenements();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (evenements.length === 0) {
    return <div>Aucun événement trouvé.</div>;
  }

  return (
    <div>
      <h2>Liste des Événements</h2>
      <ul>
        {evenements.map((evenement) => (
          <li key={evenement.id}>
            <img src={`${config.imageBaseUrl}/${evenement.image}`} alt={evenement.libelle} />
            <img src={`${config.docummentPdf}/${evenement.piéce_join}`} alt={evenement.libelle} />
            
            <h3>{evenement.libelle}</h3>
            <p>{evenement.lien}</p>
            <p>{evenement.description}</p>
            <p>Date : {new Date(evenement.created_at).toLocaleDateString()}</p>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default  Evenement;
