/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '/src/config';
import './Gestionstock.css';
import Swal from 'sweetalert2';

const GestionStock = () => {
        const [produits, setProduits] = useState([]);
        const [message, setMessage] = useState('');
      
        useEffect(() => {
          const fetchProduits = async () => {
            try {
              const response = await axios.get(`${config.apiBaseUrl}/afficherProduit`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              });
              setProduits(response.data);
            } catch (error) {
              console.error('Erreur lors de la récupération des produits:', error);
            }
          };
      
          fetchProduits();
        }, []);
      
        const ajouterStock = async (id) => {
            const { value: quantite } = await Swal.fire({
                title: 'Entrez la quantité à ajouter:',
                input: 'text',
                inputAttributes: {
                    placeholder: 'Quantité'
                },
                showCancelButton: true,
                confirmButtonText: 'Soumettre',
                showLoaderOnConfirm: true,
                preConfirm: (quantite) => {
                    return new Promise((resolve, reject) => {
                        if (!quantite || isNaN(quantite) || quantite <= 0) {
                            reject('Veuillez entrer une quantité valide.');
                        } else {
                            resolve();
                        }
                    });
                },
                allowOutsideClick: false
            });
          if (quantite) {
            try {
              await axios.post(`${config.apiBaseUrl}/ajouterStock/${id}`, { quantite }, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              });
              setMessage('Stock ajouté avec succès.');
              
              
            } catch (error) {
              setMessage(error.response?.data?.message || 'Erreur lors de l\'ajout du stock.');
            }
          }
        };
      
        const retirerStock = async (id) => {
            const { value: quantite } = await Swal.fire({
                title: 'Entrez la quantité à retirer:',
                input: 'text',
                inputAttributes: {
                    placeholder: 'Quantité'
                },
                showCancelButton: true,
                confirmButtonText: 'Soumettre',
                showLoaderOnConfirm: true,
                preConfirm: (quantite) => {
                    return new Promise((resolve, reject) => {
                        if (!quantite || isNaN(quantite) || quantite <= 0) {
                            reject('Veuillez entrer une quantité valide.');
                        } else {
                            resolve();
                        }
                    });
                },
                allowOutsideClick: false
            });
        
            if (quantite) {
                try {
                    await axios.post(`${config.apiBaseUrl}/modifierStock/${id}`, { quantite }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    setMessage('Stock retiré avec succès.');
                } catch (error) {
                    setMessage(error.response?.data?.message || 'Erreur lors du retrait du stock.');
                }
            }
        };
        
        
  return (
    <div className="produits-container">
      <h2>Liste des Produits</h2>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>image</th>
            <th>description</th>
            <th>Libellé</th>
            <th>Quantité</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((produit) => (
            <tr key={produit.id}>
              <td>{produit.id}</td>
              <td><img src={`${config.imageBaseUrl}/${produit.image}`} alt={produit.libelle} /></td>
              <td>{produit.description}</td>
              <td>{produit.libelle}</td>
              <td>{produit.quantite}</td>
              <td>{produit.prix}</td>
              <td>
                <button className='buttonAjoutStock' onClick={() => ajouterStock(produit.id)}>Ajouter Stock</button>
                <button className='buttonModifierStock' onClick={() => retirerStock(produit.id)}>Retirer Stock</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GestionStock
