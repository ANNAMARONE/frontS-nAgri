import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatisticsBarChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <div>Aucune donnée disponible pour afficher le graphique.</div>; 
    }

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip/>
                <Legend />
                <Bar dataKey="totalProductsSold" fill="#8884d8" animationDuration={500} />
                <Bar dataKey="totalClients" fill="#5869ff" animationDuration={500} />
                <Bar dataKey="totalRevenue" fill="#ffc658" animationDuration={500} /> 
            </BarChart>
        </ResponsiveContainer>
    );
};

StatisticsBarChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            totalProductsSold: PropTypes.number.isRequired,
            totalClients: PropTypes.number.isRequired,
            totalRevenue: PropTypes.number.isRequired, 
        })
    ).isRequired,
};

export default StatisticsBarChart;
