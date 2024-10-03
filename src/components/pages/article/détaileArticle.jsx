/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import config from '/src/config'; 
import './détailArticle.css';
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

  if (!article) {
    return <div>Aucun article trouvé.</div>;
  }

  return (
    <div>
     <div className="container_image">
     <img src={`${config.imageBaseUrl}/${article.image}`} alt={article.libelle} />
     </div>
     <div className="containerDétailArticler">
     <h2>{article.libelle}</h2>
      <p>Date de création : {new Date(article.created_at).toLocaleDateString()}</p>
      <p>{article.description}</p>
     </div>
    </div>
  );
};

export default ArticleDetails;
