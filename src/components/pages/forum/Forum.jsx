/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from '/src/config';
import { NavLink, Link } from 'react-router-dom';

const Forum = () => {
  const [forums, setForums] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupérer les forums depuis l'API
    axios.get(`${config.apiBaseUrl}/forums`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        setForums(response.data);
      })
      .catch(error => {
        if (error.response) {
          setError(error.response.data.error); 
        } else {
          setError("Erreur lors de la récupération des forums");
        }
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Liste des forums</h2>
      <p><NavLink to="/ajouterForum" className='span'>Ajouter un forum</NavLink></p>
      
      {forums.length > 0 ? (
        <ul>
          {forums.map((forum) => (
            <li key={forum.id}>
              {/* Utilise Link pour rediriger vers les détails du forum */}
              <h3>
                <Link to={`/forums/${forum.id}`}>
                  {forum.libelle}
                </Link>
              </h3>
              <p>{forum.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun forum disponible.</p>
      )}
    </div>
  );
};

export default Forum;
