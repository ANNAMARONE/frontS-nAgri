import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import config from '/src/config';

// Enregistrer les composants nécessaires
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const MontantCommandesChart = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statistiques, setStatistiques] = useState({
        montants: [],
        labels: []
    });

    // Référence pour l'instance du graphique
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${config.apiBaseUrl}/EvolutionCommande`, { 
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log('Données récupérées:', response.data);

                const { montants = [], labels = [] } = response.data;
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
                                data: montants.map(montant => parseFloat(montant) || 0),
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

        // Nettoyage pour détruire l'instance de graphique lors du démontage du composant
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
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
                <Line ref={chartRef} data={chartData} />
            ) : (
                <p>Aucune donnée à afficher.</p>
            )}
        </div>
    );
};

export default MontantCommandesChart;
