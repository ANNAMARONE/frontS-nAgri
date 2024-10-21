/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css'; 
import config from '/src/config';
const TotalMontantCommandes = () => {
    const [montantTotal, setMontantTotal] = useState(0);

    useEffect(() => {
        const fetchCommandes = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${config.apiBaseUrl}/commandes`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Supposons que chaque commande a une propriété 'montant'
                const total = response.data.reduce((acc, commande) => acc + commande.montant, 0);
                setMontantTotal(total);
            } catch (error) {
                console.error('Erreur lors de la récupération des commandes', error);
            }
        };
        fetchCommandes();
    }, []);

    return (
        <div className="montant-total-commandes">
            <h2>Montant Total des Commandes</h2>
            <p><strong>{montantTotal.toLocaleString()} F CFA</strong></p>
        </div>
    );
};

export default TotalMontantCommandes;
