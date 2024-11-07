/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import config from '/src/config';
import { useNavigate } from "react-router-dom";
import './ajoutForum.css';
import { FiSend } from "react-icons/fi";

const CreateForum = () => {
  const [libelle, setLibelle] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  

  const validateForm = () => {
    if (!libelle || libelle.length > 255) {
      setErrorMessage("Le libellé est requis et doit comporter moins de 255 caractères.");
      return false;
    }

    if (!description) {
      setErrorMessage("La description est requise.");
      return false;
    }

    setErrorMessage(""); 
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return; 

    setLoading(true);
    setSuccessMessage("");
    const userFromLocalStorage = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userFromLocalStorage || !token) {
      setErrorMessage('Veuillez vous connecter pour accéder à votre panier.');
      navigate('/login'); 
      return;
    }

    axios
      .post(
        `${config.apiBaseUrl}/ajout_forums`,
        {
          libelle: libelle,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      )
      .then((response) => {
        setSuccessMessage(response.data.success);
        setLibelle(""); 
        setDescription("");
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(
            error.response.data.error
              ? error.response.data.error.libelle || error.response.data.error.description
              : "Une erreur est survenue."
          );
        } else {
          setErrorMessage("Une erreur est survenue.");
        }
        setLoading(false);
      });
  };

  return (
    <div className="bannerForum">
      <h2>Créer un nouveau forum</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Libellé :</label><br />
          <input
            type="text"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            maxLength={255}
          />
        </div>

        <div>
          <label>Description :</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            <FiSend /> {loading ? "En cours" : "Créer le forum"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForum;
