/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import config from '/src/config';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
const ListeForums = () => {
  const [forums, setForums] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(0); 
  const perPage = 3; 
  useEffect(() => {
   
    axios.get(`${config.apiBaseUrl}/forums?per_page=${perPage}&page=${currentPage}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        setForums(response.data.data); 
        setTotalPages(response.data.last_page); 
      })
      .catch(error => {
        if (error.response) {
          setError(error.response.data.error); 
        } else {
          setError("Erreur lors de la récupération des forums");
        }
      });
  }, [currentPage]); 

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.apiBaseUrl}/supprimer_forums/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
     
      setForums(forums.filter((forum) => forum.id !== id));
      setMessage('forum supprimer avec succès.');
      
    } catch (error) {
      setError('Erreur lors de la suppression du forum');
    }
  };

  return (
    <div className='EvenementListeAdmin'>
   <div className='EvenementListeHeader'>
   <h2>Liste des Forums</h2>
    {error && <p>{error}</p>}
  
    <div style={{ marginBottom: '20px' }}>
      <Link to="/forums/ajouter">
        <button>
          <FontAwesomeIcon icon={faPlus} /> Ajouter un forum
        </button>
      </Link>
    </div>
   </div>
  
    {forums.length > 0 ? (
      <table className='Evenement_listeAdmin'>
        <thead>
          <tr>
            <th>Libelle</th>
            <th>description</th>
            <th>Date de création</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {forums.map((forum) => (
            <tr key={forum.id}>
              <td>{forum.libelle}</td>
              <td>{forum.description}</td>
              <td>{new Date(forum.created_at).toLocaleDateString()}</td>
              <td>
                <Link to={`/forumsdetail/${forum.id}`}>
                  <button>
                  <FaEdit size={24} color='green'/>
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(forum.id)}
                >
                 <MdDelete size={24} color='red' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      !error && <p>Aucun forum trouvé.</p>
    )}
  
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => setCurrentPage(currentPage - 1)}>Précédent</button>
      )}
      {currentPage < totalPages && (
        <button onClick={() => setCurrentPage(currentPage + 1)}>Suivant</button>
      )}
    </div>
  </div>
  
  );
};

export default ListeForums;
