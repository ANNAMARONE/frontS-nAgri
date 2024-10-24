/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import config from '/src/config'; 
import './détailArticle.css';
import { Link } from 'react-router-dom';
const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  
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
          setError("Erreur lors de la récupération des articles.");
        } 
      }
    };

    fetchArticles();
  }, []);
  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
        return description.substring(0, maxLength) + '...';
    }
    return description;
};
  if (!article) {
    return <div>Aucun article trouvé.</div>;
  }

  return (
    <div>
     <div className="container_image">
     <img src={`${config.imageBaseUrl}/${article.image}`} alt={article.libelle} />
     </div>
  

     <div className="donnéArticle1">
     <div className="containerDétailArticler">
     <h2>{article.libelle}</h2>
      <p>Date de création : {new Date(article.created_at).toLocaleDateString()}</p>
      <p>{article.description}</p>
     </div>
     <div className="ArticleDétaile1">
      {articles.length > 0 ? (
        articles.slice(0,3).map((article) => (
          <div className="card" key={article.id}>
            <img src={`${config.imageBaseUrl}/${article.image}`} alt={article.libelle} />
            <div className="card-content">
              <Link to={`/articles/${article.id}`} className="card-title" >
                {truncateDescription(article.libelle,50)}
              </Link>
              <p className="card-description">{truncateDescription(article.description,100)}</p>
              <div className="card-footer">
                <span>{new Date(article.created_at).toLocaleDateString()} - Agriculture</span>
               
              </div>
             
            </div>
          </div>
        ))
      ) : (
        <p>Aucun article disponible.</p>
      )}
      </div>
     </div>
    </div>
  );
};

export default ArticleDetails;
