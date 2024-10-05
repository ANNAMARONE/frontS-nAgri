/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import config from '/src/config';
import { FaEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
const ListeRessources = () => {
  const [ressources, setRessources] = useState([]);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1); 
  const [lastPage, setLastPage] = useState(1); 
  
  const fetchRessources = async (page) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/ressources?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRessources(response.data.data);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
    } catch (error) {
      setMessage('Erreur lors du chargement des ressources');
    }
  };

  useEffect(() => {
    fetchRessources(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/supprimer_ressource/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRessources(ressources.filter(ressource => ressource.id !== id));
      setMessage('Ressource supprimée avec succès');
    } catch (error) {
      setMessage('Erreur lors de la suppression');
    }
  };

  const handleNextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div >
      <div className='EvenementListeHeader'>
      <h2>Liste des ressources</h2>
      {message && <p>{message}</p>}
      
      <NavLink to="/ajouterRessource" activeClassName="active"> 
      <button>
      <FontAwesomeIcon icon={faPlus} /> Ajouter un ressource</button>
      </NavLink>
      
      </div>
     <div className='Evenement_listeAdmin' >
     <table>
        <thead>
          <tr>
          <th>image</th>
            <th>Libellé</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ressources.map(ressource => (
            <tr key={ressource.id}>
              <td>
              <img src={`${config.imageBaseUrl}/${ressource.image}`} alt={`Image de l'événement: ${event.libelle}`} style={{ width: '50px', height: '50px' }} />         
              </td>
              <td>{ressource.libelle}</td>

              <td>{new Date(ressource.created_at).toLocaleDateString()}</td>
              <td  className='ActionÉvenet'>
               
                <NavLink to={`/ressources/${ressource.id}`}>
                  <button><GrView size={24} color='blue'/></button>
                </NavLink>

               
                <NavLink to={`/ressources/modifier/${ressource.id}`}>
                  <button> <FaEdit size={24} color='green'/></button>
                </NavLink>

               
                <button onClick={() => handleDelete(ressource.id)}><MdDelete size={24} color='red' /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>

      
      <div className="pagination">
      <button 
        onClick={handlePrevPage} 
        disabled={currentPage === 1}
      >
        Précédent
      </button>
      <span>Page {currentPage} sur {lastPage}</span>
      <button 
        onClick={handleNextPage} 
        disabled={currentPage === lastPage}
      >
        Suivant
      </button>
    </div>
    </div>
  );
};

export default ListeRessources;
