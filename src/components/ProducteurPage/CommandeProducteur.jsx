/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '/src/config'; // Ajustez le chemin en fonction de votre structure de dossier

const MesCommandes = () => {
    const [commandes, setCommandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCommandes = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/commandes`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ajoutez l'en-tête d'autorisation ici
                    }
                });
                setCommandes(response.data.commandes);
            } catch (err) {
                setError('Erreur lors de la récupération des commandes : ' + err.message); // Modifiez l'appel à setError
                console.log('Erreur lors de la récupération des commandes.', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCommandes();
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Mes Commandes en Attente</h2>
            {commandes.length === 0 ? (
                <p>Aucune commande en attente trouvée.</p>
            ) : (
                <ul>
                    {commandes.map((commande) => (
                        <li key={commande.id}>
                            <h3>Commande ID: {commande.id}</h3>
                            <p>Status: {commande.status_de_commande}</p>
                            <h4>Produits:</h4>
                            <ul>
                                {commande.produits.map((produit) => (
                                    <li key={produit.id}>{produit.libelle} - {produit.prix} FCFA</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MesCommandes;
