/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '/src/config'; // Ajustez le chemin en fonction de votre structure de dossier

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
        <div>
            <h2>Commandes concernant vos Produits</h2>
            {commandes.length === 0 ? (
                <p>Aucune commande trouvée.</p>
            ) : (
                <ul>
                    {commandes.map((commande) => (
                        <li key={commande.id}>
                            <h3>Commande ID: {commande.id}</h3>
                            <p>Status: {commande.status_de_commande}</p>
                            <p>Date: {new Date(commande.created_at).toLocaleDateString()}</p>
                            <h4>Produits:</h4>
                            <ul>
                                {commande.produits.map((produit) => (
                                    <li key={produit.id}>{produit.nom} - {produit.prix} FCFA</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HistoriqueCommande;
