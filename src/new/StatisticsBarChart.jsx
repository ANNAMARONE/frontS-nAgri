/* eslint-disable no-unused-vars */
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import PropTypes from 'prop-types';

const StatisticsBarChart = ({ data }) => {
    return (
        <BarChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalProductsSold" fill="#8884d8" />
            <Bar dataKey="totalClients" fill="#82ca9d" />
            <Bar dataKey="totalOrders" fill="#ffc658" />
        </BarChart>
    );
};

// Définition des PropTypes
StatisticsBarChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            totalProductsSold: PropTypes.number.isRequired,
            totalClients: PropTypes.number.isRequired,
            totalOrders: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default StatisticsBarChart;
