/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '/src/config';
import { useNavigate } from 'react-router-dom';
import { NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
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
    <div  className='EvenementListeAdmin'>
      <div  className='EvenementListeHeader'>
      <h2>Liste des Articles</h2>
      {message && <p>{message}</p>}

      
        <NavLink to="/AjouteArticle" activeClassName="active"> <button>
          <FontAwesomeIcon icon={faPlus} /> Ajouter un article
          </button>
          </NavLink>
      </div>
       

  <div className='Evenement_listeAdmin'>
  <table>
        <thead>
          <tr>
          <th>Image</th>
            <th>Titre</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articls.map((article) => (
            <tr key={article.id}>
              <td><img src={`${config.imageBaseUrl}/${article.image}`}  style={{ width: '50px', height: '50px' }} /></td>
              <td>{article.libelle}</td>
              <td>{new Date(article.created_at).toLocaleDateString()}</td>
              <td  className='ActionÉvenet'>
                
                <button onClick={() => handleEdit(article.id)} style={{ marginLeft: '10px' }}>
                <FaEdit size={24} color='green'/>
              </button>
                <button ><GrView size={24} color='blue'/></button>
                <button onClick={() => handelDeletArticle(article.id)}><MdDelete size={24} color='red' /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>

    </div>
  )
}

export default ListeArticle
