/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; 
import config from '/src/config';

const RessourceDetails = () => {
  const { id } = useParams(); 
  const [ressource, setRessource] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRessourceDetails = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/ressources/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }); 
        setRessource(response.data);
      
      } catch (err) {
        setError("Erreur lors de la récupération des détails de la ressource.");
       
      } finally {
        setLoading(false);
      }
    };

    fetchRessourceDetails();
  }, [id]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!ressource) {
    return <div>Aucune ressource trouvée.</div>;
  }

  return (
    <div>
      <h2>Détails de la Ressource</h2>
      <h3>{ressource.libelle}</h3>
      <img src={`${config.imageBaseUrl}/${ressource.image}`} alt={ressource.libelle} />
      <p>{ressource.description}</p>
      <p>Date : {new Date(ressource.created_at).toLocaleDateString()}</p>
      <p>Categorie : {ressource.categorie_ressource_id}</p>
    </div>
  );
};

export default RessourceDetails;
