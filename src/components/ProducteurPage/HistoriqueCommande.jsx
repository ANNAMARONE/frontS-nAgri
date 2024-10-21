/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '/src/config'; 
import './historique.css';

const HistoriqueCommande = () => {
    const [commandes, setCommandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCommandesProduitsUser = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/historiqueCommande`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setCommandes(response.data.commandes);
            } catch (err) {
                setError('Erreur lors de la récupération des commandes : ' + err.message);
                console.log('Erreur lors de la récupération des commandes.', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCommandesProduitsUser();
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='historiqueCommande'>
            <h2>Commandes concernant vos Produits</h2>
            {commandes.length === 0 ? (
                <p>Aucune commande trouvée.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID de la Commande</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Produits</th>
                            <th>Client</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commandes.map((commande) => (
                            <tr key={commande.id}>
                                <td>{commande.id}</td>
                                <td>{commande.status_de_commande}</td>
                                <td>{new Date(commande.created_at).toLocaleDateString()}</td>
                                
                                <td>
                                    <table className="produitsTable">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Libellé</th>
                                                <th>Prix</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {commande.produits.map((produit) => (
                                                <tr key={produit.id}>
                                                    <td><img src={`${config.imageBaseUrl}/${produit.image}`} alt={produit.libelle} /></td>
                                                    <td>{produit.libelle}</td>
                                                    <td>{produit.prix} FCFA</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <strong>Nom:</strong> {commande.client.nom}<br />
                                    <strong>Email:</strong> {commande.client.email}<br />
                                    <strong>Téléphone:</strong> {commande.client.telephone} <br />
                                    <strong>Adresse:</strong>{commande.client.adresse}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
    
};

export default HistoriqueCommande;
