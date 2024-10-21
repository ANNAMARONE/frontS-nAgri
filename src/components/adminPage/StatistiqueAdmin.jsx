import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import config from '/src/config';

const MontantCommandesChart = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [statistiques, setStatistiques] = useState({
        montants: 0, 
        labels: 0   
    });

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${config.apiBaseUrl}/EvolutionCommande`, { 
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log('Données récupérées:', response.data);

                const { montants = [], labels = [] } = response.data;

                // Vérifiez le format des montants
                console.log('Montants:', montants);
                console.log('Labels:', labels); 

                // Met à jour les statistiques
                setStatistiques({ montants, labels });

                if (montants.length > 0 && labels.length > 0) {
                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Montant Total des Commandes',
                                data: montants.map(montant => parseFloat(montant) || 0), // Conversion sécurisée
                                backgroundColor: 'rgba(54, 162, 235, 0.2)', 
                                borderColor: 'rgba(54, 162, 235, 1)', 
                                borderWidth: 2,
                                fill: true,
                                tension: 0.4,
                            },
                        ],
                    });
                } else {
                    setError('Les données des montants ou des labels sont invalides.');
                }
                
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
                setError('Erreur lors de la récupération des données.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Chargement des données...</div>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <h2>Évolution du Montant Total des Commandes</h2>
            {chartData.labels && chartData.labels.length > 0 && chartData.datasets[0].data.length > 0 ? (
                <Line data={chartData} />
            ) : (
                <p>Aucune donnée à afficher.</p>
            )}
        </div>
    );
};

export default MontantCommandesChart;
