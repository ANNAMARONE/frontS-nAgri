/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import config from '/src/config';
const CreateForum = () => {
  const [libelle, setLibelle] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");


    const token = localStorage.getItem("token");


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
    <div>
      <h2>Créer un nouveau forum</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Libellé :</label>
          <input
            type="text"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            required
            maxLength={255}
          />
        </div>

        <div>
          <label>Description :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "En cours..." : "Créer le forum"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForum;
