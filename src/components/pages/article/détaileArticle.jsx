/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import config from '/src/config'; 

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/article/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          }
        });
        setArticle(response.data.article);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message || 'Erreur lors de la récupération de l\'article.');
        } else {
          setError("Erreur réseau.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!article) {
    return <div>Aucun article trouvé.</div>;
  }

  return (
    <div>
      <h2>{article.libelle}</h2>
      <p>{article.description}</p>
      <img src={`${config.imageBaseUrl}/${article.image}`} alt={article.libelle} />
      <p>Date de création : {new Date(article.created_at).toLocaleDateString()}</p>
      <p>{article.lien}</p>
      <p>{article.description}</p>
    </div>
  );
};

export default ArticleDetails;
