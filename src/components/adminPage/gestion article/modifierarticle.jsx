/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import config from '/src/config';
const ModifierArticle = () => {
  const { id } = useParams(); 
  const [article, setArticle] = useState({
    libelle: '',
    description: '',
    lien: '',
    statut: '',
    image: null,
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/article/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setArticle(response.data.article);
        
      } catch (error) {
        setMessage('Erreur lors du chargement de l\'article');
      }
    };
    fetchArticle();
  }, [id]);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };


  const handleImageChange = (e) => {
    setArticle({ ...article, image: e.target.files[0] });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const formData = new FormData();
    formData.append('libelle', article.libelle);
    formData.append('description', article.description);
    formData.append('lien', article.lien);
    formData.append('statut', article.statut);
    if (article.image instanceof File) {
      formData.append('image', article.image); 
    }

    try {
      const response = await axios.post(`${config.apiBaseUrl}/modifier_Article/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Article mis à jour avec succès');
      navigate('/articles')
      setErrors({});
    } catch (error) {
      if (error.response && error.response.status === 422) {
     
        setErrors(error.response.data.errors);
      } else {
        setMessage('Une erreur est survenue lors de la mise à jour de l\'article');
      }
    }
  };

  return (
    <div>
      <h2>Modifier l&apos;article</h2>
      {message && <p>{message}</p>}
    <div  className='AjouterEvenement'>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Libellé :</label>
          <input
            type="text"
            name="libelle"
            value={article.libelle}
            onChange={handleInputChange}
            required
          />
          {errors.libelle && <span>{errors.libelle[0]}</span>}
        </div>
        <div>
          <label>Description :</label>
          <textarea
            name="description"
            value={article.description}
            onChange={handleInputChange}
            required
          />
          {errors.description && <span>{errors.description[0]}</span>}
        </div>
        <div>
          <label>Lien :</label>
          <input
            type="text"
            name="lien"
            value={article.lien}
            onChange={handleInputChange}
            required
          />
          {errors.lien && <span>{errors.lien[0]}</span>}
        </div>
        <div>
          <label>Statut :</label>
          <input
            type="text"
            name="statut"
            value={article.statut}
            onChange={handleInputChange}
            required
          />
          {errors.statut && <span>{errors.statut[0]}</span>}
        </div>
        <div>
          <label>Image :</label>
          <input type="file" name="image" onChange={handleImageChange} />
          {errors.image && <span>{errors.image[0]}</span>}
        </div>
        <button type="submit">Mettre à jour l&apos;article</button>
      </form>
    </div>
    </div>
  );
};

export default ModifierArticle;
