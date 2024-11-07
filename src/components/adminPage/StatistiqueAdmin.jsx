/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import config from '/src/config';
import './statistiqueAdmin.css'
import { MdDeleteForever } from "react-icons/md";
// Enregistrer les composants nécessaires
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const MontantCommandesChart = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commandes, setCommandes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        // Fonction pour récupérer les données de l'évolution des commandes
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${config.apiBaseUrl}/EvolutionCommande`, { 
                    headers: { Authorization: `Bearer ${token}` }
                });

                const { montants = [], labels = [] } = response.data;

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Montant Total des Commandes',
                            data: montants.map(montant => parseFloat(montant) || 0),
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                });
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
                setError('Erreur lors de la récupération des données.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Fonction pour récupérer la liste des commandes
    const fetchListeCommandes = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${config.apiBaseUrl}/toutlescommande`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            // Utilisez response.data.commandes pour définir les commandes
            setCommandes(response.data.commandes);
           
            console.log("Données des commandes :", response.data.commandes);
        } catch (error) {
            console.error("Erreur lors de la récupération des commandes :", error); 
        }
    };
    

    // Appel de la fonction pour récupérer les commandes au montage du composant
    useEffect(() => {
        fetchListeCommandes();
    }, []);
    const handleDelete = async (commandeId) => {
        const token = localStorage.getItem('token');
      
        if (token) {
          try {
            await axios.delete(`${config.apiBaseUrl}/commandes/${commandeId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      
            // Mettre à jour l'état local pour enlever la commande supprimée
            setCommandes(commandes.filter(commande => commande.id !== commandeId));
          } catch (error) {
            console.error('Erreur lors de la suppression de la commande:', error);
            setErrorMessage('Erreur lors de la suppression de la commande. Veuillez réessayer.');
          }
        } else {
          setErrorMessage('Veuillez vous connecter pour supprimer une commande.');
        }
      };
    if (loading) {
        return <div>Chargement des données...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <h2>Évolution du Montant Total des Commandes</h2>
            {chartData.labels && chartData.labels.length > 0 ? (
                <Line data={chartData} />
            ) : (
                <p>Aucune donnée à afficher.</p>
            )}

<div style={{ width: '80%', margin: 'auto' }} className='commandeTables'>
            <h2>Liste des Commandes</h2>
            {commandes && commandes.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>client </th>
                            <th>Montant Total</th>
                            <th>Date de Création</th>
                            <th>statut</th>
                            <th>Produits</th>
                    
                        </tr>
                    </thead>
                    <tbody>
                        {commandes.map((cmd) => (
                            <tr key={cmd.id}>
                                <td>{cmd.id}</td>
                                <td>{cmd.user.name}</td>
                                <td>{cmd.montant_total} cfa</td>
                                <td>{new Date(cmd.created_at).toLocaleDateString()}</td>
                                <td>{cmd.status_de_commande}</td>
                                <td>
                                    {cmd.produits && cmd.produits.length > 0 ? (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Libellé</th>
                                                    <th>Quantité</th>
                                                    <th>Image</th>
                                                </tr>
                                            </thead>
                                            
                                            <tbody>
                                                {cmd.produits.map((produit) => (
                                                    <tr key={produit.id}>
                                                        <td>{produit.libelle}</td>
                                                        <td>{produit.quantite}</td>
                                                        <td>
                                                            <img src={`${config.imageBaseUrl}/${produit.image}`} alt={produit.libelle} width="50" />
                                                        </td>
                                                    </tr>
                                                ))}
                                               <td>  <button onClick={() => handleDelete(cmd.id)}>
              <MdDeleteForever size={30} /> Supprimer
            </button></td>
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>Aucun produit dans cette commande.</p>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucune commande disponible.</p>
            )}
        </div>

        </div>
    );
};

export default MontantCommandesChart;
