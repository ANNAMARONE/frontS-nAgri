/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Link,NavLink, Outlet } from 'react-router-dom';
import './dasboardProducteur.css'; 
import { FaArrowRight } from "react-icons/fa";
import config from '/src/config';

const DashboardProducteur = () => {
  const [produits, setProduits] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [utilisateurs, setUtilisateurs] = useState([]);
  
// Affficher quelques produit sur la page

useEffect(() => {
  const fetchProduits = async () => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}/afficher_produitParUser?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProduits(response.data.data); 
      setTotalPages(response.data.last_page); 
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Erreur lors de la connexion au serveur.");
      }
    }
  };

  fetchProduits();
}, [page]);

// Afficher quelques producteurs
useEffect(() => {
  const fetchUtilisateurs = async () => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}/utilisateurs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setUtilisateurs(response.data);
    } catch (error) {
      setMessage('Erreur lors de la récupération des utilisateurs.',error);
    }
  };

  fetchUtilisateurs();
}, []);

  return (
    <div className="dashboard-containerProducteur">
  <div className="cartdasbordProducteur">
  <div className="section1ProducteurDash">
  <div className="cart1_dasbord">
    <h3>Créer et vendre des produits extraordinaires</h3>
    <p>
      Le premier et le plus grand marché sénégalais de produits
      locaux
    </p>
    <NavLink to="/ajoutProduit">
      <button>Ajouter</button>
    </NavLink>
  </div>
  <div className='section1titreP'>
    <p>Mes produits</p>
    <Link to="/AfficherProduit">
    <button>voire plus <FaArrowRight /></button>
    </Link>
   
  </div>
  <div>
  {produits.length > 0 ? (
        <div>
          <ul className='setion1CartProduitP'>
            {produits.slice(0,6).map((produit) => (
              <li key={produit.id} className='Section1Card'>
                <img src={`${config.imageBaseUrl}/${produit.image}`}/><br />
                {produit.libelle}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Aucun produit trouvé.</p>
      )}
  </div>
  </div> 
 <div className="section2ProducteurDash">
 <div className="cart2_dasbord">
    <p>
      Prendre contact avec d &apos;autres utilisateurs, vous avez la possibilité de
    </p>
    <Link to="/producteurs">
    <button>En savoir plus</button>
    </Link>
  </div>
  <div className='listProducteurProdu'>
    <div className='descriptProduc'>
      <p>Lists des producteurs</p>
      <Link to="/producteurs">
    <button>voire plus <FaArrowRight /></button>
    </Link>
    </div>
    <div className='producteurParRole'>
{utilisateurs.slice(0,5).map((utilisateur)=>(
<div key={utilisateur.id} className='ProducteurInfo'>
<img src={`${config.imageProfil}/${utilisateur.profile}`} />
<div>
  <p>{utilisateur.name}</p>
  <p>{utilisateur.role}</p>
</div>
<p>{new Date(utilisateur.created_at).toLocaleDateString()}</p>
</div>
))}

    </div>
  </div>
 </div>
</div> 
      <main className="dashboard-content">
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardProducteur ;
