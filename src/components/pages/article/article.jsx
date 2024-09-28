/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from '/src/config'; 
import { NavLink, Link } from 'react-router-dom';

export default function Article ()
{
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/articles`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          }
        });
        setArticles(response.data);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.error || err.response.data.message);
        } else {
          setError("Erreur lors de la récupération des articles.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Articles</h2>
      {articles.length > 0 ? (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
                <img src={`${config.imageBaseUrl}/${article.image}`} alt={article.libelle} />
                
                <Link to={`/articles/${article.id}`}>
                  {article.libelle}
                </Link>
              <p>{article.description}</p>
              <p>{new Date(article.created_at).toLocaleDateString()}</p>
            <p>lien:{article.lien}</p>
              <p>statut:{article.statut}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun article disponible.</p>
      )}
    </div>
  );
};


