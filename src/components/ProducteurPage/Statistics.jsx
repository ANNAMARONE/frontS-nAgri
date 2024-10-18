/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '/src/config';
import "./statistics.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faUsers, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import StatisticsPieChart from '/src/new/StatisticsPieChart';
import StatisticsBarChart from '/src/new/StatisticsBarChart';
import {  Link,NavLink, Outlet } from 'react-router-dom';
import './dasboardProducteur.css'; 
import { FaArrowRight } from "react-icons/fa";
const Statistics = () => {
    const [statistics, setStatistics] = useState({
        totalProductsSold: 0,
        totalClients: 0,
        totalRevenue: 0,
    });
    const [chartData, setChartData] = useState([]);
    const [chartData2, setChartData2] = useState([]);
    const [produits, setProduits] = useState([]);
    const [message, setMessage] = useState("");
    const [page, setPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1); 
    const [utilisateurs, setUtilisateurs] = useState([]);
    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/statistics`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
    
                const { total_products_sold, total_clients, total_revenue } = response.data;
    
                // Mettre à jour les statistiques
                setStatistics({
                    totalProductsSold: total_products_sold || 0,
                    totalClients: total_clients || 0,
                    totalRevenue: Number(total_revenue) || 0,
                });
    
                // Préparer les données pour le PieChart
                const pieChartData = [
                    { name: "Produits Vendus", value: total_products_sold, color: "#8884d8" },
                    { name: "Clients", value: total_clients, color: "#82ca9d" },
                    { name: "Revenu", value: Number(total_revenue), color: "#ffc658" }
                ];
                console.log("PieChart Data:", pieChartData); // Vérifiez les données
    
                // Préparer les données pour le BarChart
                const barChartData = [
                    { name: "Produits Vendus", totalProductsSold: total_products_sold, totalClients: 0, totalRevenue: 0 },
                    { name: "Nombre de Clients", totalProductsSold: 0, totalClients: total_clients, totalRevenue: 0 },
                    { name: "Revenu Total", totalProductsSold: 0, totalClients: 0, totalRevenue: Number(total_revenue) },
                ];
                console.log("BarChart Data:", barChartData); // Vérifiez les données
    
                setChartData(pieChartData);
                setChartData2(barChartData);
            } catch (error) {
                console.error("Erreur lors de la récupération des statistiques :", error);
            }
        };
    
        fetchStatistics();
    }, []);
      
// Affficher quelques produit sur la page

useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/afficher_produitParUser?page=${page}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProduits(response.data.data); 
        setTotalPages(response.data.last_page); 
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Erreur lors de la connexion au serveur.");
        }
      }
    };
  
    fetchProduits();
  }, [page]);
  
  // Afficher quelques producteurs
  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/utilisateurs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        setUtilisateurs(response.data);
      } catch (error) {
        setMessage('Erreur lors de la récupération des utilisateurs.',error);
      }
    };
  
    fetchUtilisateurs();
  }, []);
    return (
        <div>
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
                        <p>{statistics.totalRevenue.toLocaleString()} FCFA</p>
                    </div>
                </div>
            </div>
            <div className="dashboard-containerProducteur">
  <div className="cartdasbordProducteur">
  <div className="section1ProducteurDash">
  <div className="cart1_dasbord">
    <h3>Créer et vendre des produits extraordinaires</h3>
    <p>
      Le premier et le plus grand marché sénégalais de produits
      locaux
    </p>
    <NavLink to="/ajoutProduit">
      <button>Ajouter</button>
    </NavLink>
  </div>
  <div className='section1titreP'>
    <p>Mes produits</p>
    <Link to="/AfficherProduit">
    <button>voire plus <FaArrowRight /></button>
    </Link>
   
  </div>
  <div>
  {produits.length > 0 ? (
        <div>
          <ul className='setion1CartProduitP'>
            {produits.slice(0,6).map((produit) => (
              <li key={produit.id} className='Section1Card'>
                <img src={`${config.imageBaseUrl}/${produit.image}`}/><br />
                {produit.libelle}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Aucun produit trouvé.</p>
      )}
  </div>
  </div> 
 <div className="section2ProducteurDash">
 <div className="cart2_dasbord">
    <p>
      Prendre contact avec d &apos;autres utilisateurs, vous avez la possibilité de
    </p>
    <Link to="/producteurs">
    <button>En savoir plus</button>
    </Link>
  </div>
  <div className='listProducteurProdu'>
    <div className='descriptProduc'>
      <p>Lists des producteurs</p>
      <Link to="/producteurs">
    <button>voire plus <FaArrowRight /></button>
    </Link>
    </div>
    <div className='producteurParRole'>
    {utilisateurs.slice(0, 5).map((utilisateur) => (
        <div key={utilisateur.id} className='ProducteurInfo'>
            <img src={`${config.imageProfil}/${utilisateur.profile}`} alt={utilisateur.name} />
            <div className='producteurDetails'>
                <p className='producteurName'>{utilisateur.name}</p>
                <p className='producteurRole'>{utilisateur.role}</p>
            </div>
            <p className='producteurDate'>{new Date(utilisateur.created_at).toLocaleDateString()}</p>
        </div>
    ))}
</div>

  </div>
 </div>
</div> 
      <main className="dashboard-content">
        <Outlet /> 
      </main>
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
