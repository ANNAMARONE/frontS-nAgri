/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from '/src/config';
import './Evenement.css';
import ImageEvenement from '/src/assets/images/Rectangle.png'
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
          setError("Vueillez verifier votre connexion");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvenements();
  }, []);

  

  if (error) {
    return <div>{error}</div>;
  }

  if (evenements.length === 0) {
    return <div>Aucun événement trouvé.</div>;
  }

  return (
    <div>
      <div className="bannerEvenement">
<div className="cardBanner">
  <div>
    <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Sed ante erat, cursus nec velit at, pulvinar pulvinar velit. Proin </h1>
    <p>
    iaculis viverra quam, ut vulputate mi malesuada in. Vivamus rutrum, justo ac dictum consectetur,
     mi nibh faucibus nulla, non dignissim velit elit in lacus. Maecenas placerat tristique euismod.
    </p>
  </div>
  <div className="EvenementImage">
    <img src={ImageEvenement} alt="" />
  </div>
</div>
      </div>
      <div className="ElementEvenement">
  <h2>Liste des Événements</h2>
  <ul  className="cardEvenement">
    {evenements.map((evenement) => (
      <li key={evenement.id} className="cartElement">
        <div></div>
        <img src={`${config.imageBaseUrl}/${evenement.image}`} alt={evenement.libelle} />
        <h3>{evenement.libelle}</h3>
        <p>{evenement.description}</p>
        <p>Date : {new Date(evenement.created_at).toLocaleDateString()}</p>
      
        <button
          onClick={() => window.location.href = evenement.lien}
          className="btn-lien"
        >
          Voir Détails
        </button>
      </li>
    ))}
  </ul>
</div>

    </div>
  );
};

export default  Evenement;
