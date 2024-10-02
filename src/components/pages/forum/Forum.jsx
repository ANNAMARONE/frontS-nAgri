/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from '/src/config';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './forum.css';
import { FaForumbee } from "react-icons/fa";

const Forum = () => {
  const [forums, setForums] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(0); 
  const navigate=useNavigate;
  const perPage = 3; 

  useEffect(() => {
   
    axios.get(`${config.apiBaseUrl}/forums?per_page=${perPage}&page=${currentPage}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        setForums(response.data.data); 
        setTotalPages(response.data.last_page); 
      })
      .catch(error => {
        if (error.response) {
          setError(error.response.data.error); 
        } else {
          setError("Erreur lors de la récupération des forums");
        }
      });
  }, [currentPage]); 

  // Fonction pour calculer le temps écoulé
  const timeSince = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);
    
    if (interval > 1) return interval + " ans";
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + " mois";
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + " jours";
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + " heures";
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + " minutes";
    return seconds + " secondes";
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bannerForum">
      
      <div className="forum-container">
        <div className="header">
        <h6><FaForumbee />Liste des forums</h6>
        <div className="hrforum"></div>
          <button className="add-forum-link">
            <NavLink to="/ajouterForum" className='span'>Ajouter un forum</NavLink>
          </button>
        </div>
        <div>
          {forums.length > 0 ? (
            <ul className="forums-list">
              {forums.map((forum) => (
                <li key={forum.id} className="forum-item">
                  <div className="forum-header">
                    <div className="forum-profile">
                      <img src={`${config.imageProfil}/${forum.user.profile}`} />
                      <p>{forum.user.name}</p>
                    </div>
                    <div>
                      <p className="forum-author">
                        <strong>{forum.user.name}</strong>
                      </p>
                      <p className="forum-time">il y &apos;a {timeSince(forum.created_at)} </p>
                    </div>
                  </div>
                  <p className="forum-title">
                    {forum.libelle}
                  </p>
                  <p className="forum-description">{forum.description}</p>
                  <Link to={`/forums/${forum.id}`}>
                    <button className="forum-button">Commentaire</button>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun forum disponible.</p>
          )}

          {/* Boutons de navigation de pagination */}
          <div className="pagination">
            {currentPage > 1 && (
              <button onClick={() => setCurrentPage(currentPage - 1)}>Précédent</button>
            )}
            {currentPage < totalPages && (
              <button onClick={() => setCurrentPage(currentPage + 1)}>Suivant</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
