import React, { useEffect, useState } from "react";
import axios from "axios";
import config from '/src/config'; 
import banner from '/src/assets/images/banner.mp4'
import './article.css'; 
import { Link } from 'react-router-dom';
export default function Article() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  

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

  if (error) {
    return <div>{error}</div>;
  }
  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
        return description.substring(0, maxLength) + '...';
    }
    return description;
};
  return (
    <div className="containerArticler" >
        <div className="banner-video">
        <video autoPlay muted loop className="background-video">
          <source src={banner} type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
        <div className="banner-content">
          <h1>Bienvenue sur notre plateforme </h1>
          <p>Explorez les derniers articles.</p>
        </div>
      </div>
      <h2>Articles</h2>
      <div className="container_Article">
      {articles.length > 0 ? (
        articles.map((article) => (
          <div className="card" key={article.id}>
            <img src={`${config.imageBaseUrl}/${article.image}`} alt={article.libelle} />
            <div className="card-content">
              <Link to={`/articles/${article.id}`} className="card-title">
                {truncateDescription(article.libelle,100)}
              </Link>
              <p className="card-description">{truncateDescription(article.description,100)}</p>
              <div className="card-footer">
                <span>{new Date(article.created_at).toLocaleDateString()}</span>
                <span>Statut: {article.statut}</span>
              </div>
             
            </div>
          </div>
        ))
      ) : (
        <p>Aucun article disponible.</p>
      )}
      </div>
    </div>
  );
}
