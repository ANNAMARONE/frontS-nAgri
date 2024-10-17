import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '/src/config';
import "./statistics.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faUsers, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import StatisticsPieChart from '/src/new/StatisticsPieChart';
import StatisticsBarChart from '/src/new//StatisticsBarChart';

const Statistics = () => {
    const [statistics, setStatistics] = useState({
        totalProductsSold: 0,
        totalClients: 0,
        totalRevenue: 0,
    });

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/statistics`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setStatistics({
                    totalProductsSold: response.data.total_products_sold || 0,
                    totalClients: response.data.total_clients || 0,
                    totalRevenue: response.data.total_revenue || 0,
                });
             
            } catch (error) {
                console.log("Error fetching statistics:", error);
            }
        };

        fetchStatistics();
    }, []);

    const chartData = [
        { name: "Produits Vendus", value: statistics.totalProductsSold, color: "#8884d8" },
        { name: "Nombre de Clients", value: statistics.totalClients, color: "#5869ff" },
        { name: "Revenu Total", value: statistics.totalRevenue, color: "#ffc658" },
    ];
    
    const chartData2 = [
        {
            name:"Produits Vendus",
            totalProductsSold: statistics.totalProductsSold || 0,
            totalClients: 0,
            totalRevenue: 0,
        },
        {
            name: "Nombre de Clients",
            totalProductsSold: 0,
            totalClients: statistics.totalClients || 0,
            totalRevenue: 0,
        },
        {
            name:"Revenu Total",
            totalProductsSold: 0,
            totalClients: 0,
            totalRevenue: statistics.totalRevenue || 0,
        },
    ];
    
    return (
        <div className="statistics">
            
            <div>
                <div className="statistics-card">
                    <FontAwesomeIcon icon={faBox} className="icon-animation" />
                    <h3>Produits Vendus</h3>
                    <p>{statistics.totalProductsSold}</p>
                </div>
                <div className="statistics-card">
                    <FontAwesomeIcon icon={faUsers} className="icon-animation" />
                    <h3>Nombre de Clients</h3>
                    <p>{statistics.totalClients}</p>
                </div>
                <div className="statistics-card">
                    <FontAwesomeIcon icon={faDollarSign} className="icon-animation" />
                    <h3>Revenu Total</h3>
                    <p>{statistics.totalRevenue} FCFA</p>
                </div>
            </div>

            {/* Affichage des Graphiques */}
            <div className="charts">
                <StatisticsPieChart data={chartData} />
                <StatisticsBarChart data={chartData2} />
            </div>
        </div>
    );
};

export default Statistics;
