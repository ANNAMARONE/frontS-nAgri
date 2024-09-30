/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '/src/config';
import { useNavigate } from 'react-router-dom';
import { NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ListeArticle = () => {
    const [articls,setArticles]=useState([]);
    const [message,setMessage]=useState('');
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(true);
    const navigate=useNavigate();
    useEffect(()=>{
        fetchArticles();
    },[]);
const fetchArticles = async () => {
try{
    const response = await axios.get(`${config.apiBaseUrl}/articles`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
    });
    setArticles(response.data);
}catch(err){
if(err.response){
    setError(err.response.data.message ||"Erreur lors de la récupération des Article.")
}else{
    setError("Erreur réseau")
}
}finally{
    setLoading(false)
}
};

if (loading){
    return <div>Chargement...</div>
}
if(error){
    return <div>{error}</div>
}
const handelDeletArticle=async (id)=>{
    if(window.confirm('Êtes vous sûr de vouloir supprimer cet Article?')){
        try{
            const response = await axios.delete(`${config.apiBaseUrl}/supprimer_article/${id}`,{
                headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
                }
            });
            setMessage('Événement supprimé avec succès.');
        }catch (error){
            setMessage('Erreur lors de la suppression de l’article.',error)
        }
    }
}
const handleEdit=(articleId)=>{
    navigate(`/modifierArticle/${articleId}`);
}
  return (
    <div>
      <h2>Liste des Articles</h2>
      {message && <p>{message}</p>}

      <h2>ajout Ajouter un article</h2>
      <button 
        onClick={() => console.log("Rediriger vers la page d'ajout de l'article")}
        style={{ marginBottom: '20px' }}
        >
        <NavLink to="/AjouteArticle" activeClassName="active"> <FontAwesomeIcon icon={faPlus} /> Ajouter un article</NavLink>
       
      </button>
      {/* Liste des événements */}
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articls.map((article) => (
            <tr key={article.id}>
              <td>{article.libelle}</td>

              <td>{article.description}</td>
              <td>{article.date}</td>
              <td>
                
                <button onClick={() => handleEdit(article.id)} style={{ marginLeft: '10px' }}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
                <button >voir détail</button>
                <button onClick={() => handelDeletArticle(article.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default ListeArticle
