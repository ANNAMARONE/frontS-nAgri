/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './produit.css'
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa"
import panierProduit from '/src/assets/images/panier1.png'
import { SlHandbag } from "react-icons/sl";
import { GrView } from "react-icons/gr";
import { FcLikePlaceholder } from "react-icons/fc";
import { IoIosStar } from "react-icons/io";
import { fetchProduits, fetchCategorie,fetchProduitByCatégorie } from '/src/apiService'; 
import config from '/src/config';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logo1 from '/src/assets/images/img1.jpg';
import logo2 from '/src/assets/images/img2.jpg';
import logo3 from '/src/assets/images/img3.jpg';
import logo4 from '/src/assets/images/img4.jpg';
import logo5 from '/src/assets/images/img5.jpg';
import logo6 from '/src/assets/images/img6.jpg';

export default function Produit (){
  const [produits, setProduits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [catégories, setCategorie] = useState([]);
  const [liked, setLiked] = useState(false);
  const [filteredProduits, setFilteredProduits] = useState([]); 
  const [selectionCategorie,setselectionCategorie]=useState(null);
  const [panier, setPanier] = useState([]);
  const [quantites, setQuantites] = useState({});
  // Récupération des produits
  useEffect(() => {
    const getProduits = async () => {
      try {
        const data = await fetchProduits(currentPage);
        setProduits(data.data);
        setTotalPages(data.last_page); 
        setFilteredProduits(data.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    };

    getProduits();
  }, [currentPage]);

  // Récupération des catégories
  useEffect(() => {
    const getCategorie = async () => {
      try {
        const data = await fetchCategorie();
        setCategorie(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    getCategorie();
  }, []);


  // recupérer les produits par catégorie

  const selectionCatégorie = async (categorieId) => {
    setselectionCategorie(categorieId);
    try {
      if (categorieId) {
        const data = await fetchProduitByCatégorie(categorieId);
        console.log('Produits récupérés pour la catégorie:', categorieId, data);
        if (Array.isArray(data)) {
          setFilteredProduits(data); // Affiche seulement les produits de cette catégorie
        } else {
          console.warn('Aucun produit trouvé pour la catégorie:', categorieId);
        }
      } else {
        setFilteredProduits(setProduits); // Affiche tous les produits si aucune catégorie n'est sélectionnée
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des produits par catégorie:', error);
    }
  };

  


  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  const handleLike = (produit) => {
    console.log("Produit ID:", produit.id);
    if (!liked && produit.id) {
      axios.post(`${config.apiBaseUrl}/product/${produit.id}/like`)
        .then(res => {
          setLiked(true); 
        })
        .catch(error => {
          console.error("Erreur lors de l'ajout du like :", error);
        });
    } else {
      console.error("Produit non valide ou déjà liké");
    }
  };
 
  
 
    const settings = {
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1500,
      arrows: false,
      dots: false,
      pauseOnHover: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 520,
          settings: {
            slidesToShow: 3,
          },
        },
      ],
    }
   
  // Récupérer le panier depuis le localStorage au chargement du composant
  useEffect(() => {
    const panierStocké = localStorage.getItem('panier');
    if (panierStocké) {
      const panierParsed = JSON.parse(panierStocké);
      setPanier(panierParsed);
      const initialQuantites = panierParsed.reduce((acc, produit) => {
        acc[produit.id] = produit.quantite;
        return acc;
      }, {});
      setQuantites(initialQuantites);
    }
  }, []);

  // Sauvegarder le panier dans le localStorage à chaque mise à jour
  useEffect(() => {
    if (panier.length > 0) {
      localStorage.setItem('panier', JSON.stringify(panier));
      console.log('Panier mis à jour dans localStorage:', panier);
    }
  }, [panier]);

  const ajouterAuPanier = (produit, quantite = 1) => {
    const produitExist = panier.find(item => item.id === produit.id);
  
    let nouveauPanier;
  
    if (produitExist) {
      if (produitExist.quantite + quantite <= produit.quantite) {  // Vérifiez si la quantité totale en panier est inférieure à celle en stock
        nouveauPanier = panier.map(item => 
          item.id === produit.id 
          ? { ...item, quantite: item.quantite + quantite }
          : item
        );
      } else {
        console.log("Stock insuffisant");
        return; // Sortir si le stock est insuffisant
      }
    } else {
      if (quantite <= produit.quantite) {
        nouveauPanier = [...panier, { ...produit, quantite }];
      } else {
        console.log("Stock insuffisant");
        return; // Sortir si le stock est insuffisant
      }
    }
  
    setPanier(nouveauPanier);
    localStorage.setItem("panier", JSON.stringify(nouveauPanier)); 
    console.log("Produit ajouté au panier :", produit);
    console.log("Panier actuel :", nouveauPanier);
  };
  
  
      // Fonction pour gérer les changements de quantité
      const handleQuantityChange = (produitId, value) => {
        setQuantites((prevQuantites) => ({
          ...prevQuantites,
          [produitId]: value,
        }));
      
  };
  const navigate = useNavigate(); 
  const handleViewDetails = (produitId) => {
    navigate(`/produits/${produitId}`); 
  };
  return (
    <div>
      
      {/* premiére section */}
      <section className='sectioN1'>
        <div className='descriptionBoutique'>
          <div className='description1'>
            <h1>Frais et sains <br/> Aliments biologiques</h1>
            <button>acheté <FaArrowRight /></button>
          </div>
        </div>
        <div className='deux_image'>
          <div className='image_panier'>
            <img src={panierProduit} alt="" />
          </div>
          <div className='produit_desc'>
            <h1>Produits 100% sénégalais</h1>
          </div>
        </div>
      </section>
      
      <section className='section2'>
        <div className='catégorie'>
          <h1>Catégories</h1>
          <div className='liste_catégorie'>
            {catégories.map(categorie => (
              
              <button key={categorie.id}  onClick={() =>selectionCatégorie(categorie.id) }className='catégorie1'>
                <img src={`${config.imageBaseUrl}/${categorie.image}`} alt={categorie.nom} />
                <p>{categorie.libelle}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* produit les plus populaire */}
      <div className='produit_plus_populaire'>
        <div className='produit_populaire'>
          <div className='produitPopu'>
            <h1>Produits populaires</h1>
            <button></button>
             {/* Pagination */}
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Précédent
            </button>
            <span>Page {currentPage} sur {totalPages}</span>
            <button 
              onClick={nextPage} 
              disabled={currentPage === totalPages}
            >
              Voir plus <FaArrowRight size={20} color="#009444" />
            </button>
          </div>
          </div>

          <div className='liste_carte'>
          {filteredProduits.map(produit => (
              <div key={produit.id}>
                <div className='cartProduit'>
                  <img src={`${config.imageBaseUrl}/${produit.image}`} alt={produit.nom} />
                  <div className='elementcart'>
                    <div className='porduitprix'>
                    <input
                      type="number"
                      min="1"
                      defaultValue={quantites[produit.id] || 1}
                      onChange={(e) => handleQuantityChange(produit.id, parseInt(e.target.value))}
                      style={{ width: '50px', marginRight: '10px' }} 
                    />  
                      <p>{produit.libelle}</p>
                      <p>{produit.prix} cfa</p>
                      
                      <p>
                        <IoIosStar size={20} color="#FF8A00"/>
                        <IoIosStar size={20} color="#FF8A00"/>
                        <IoIosStar size={20} color="#FF8A00"/>
                        <IoIosStar size={20} color="#FF8A00"/>
                      </p>
                    </div>
                    
                    <div className='action_cart'>
                   
                      <div className='action_cart1'>
                      <div className='icone1' onClick={() => handleLike(produit)}>
                          <FcLikePlaceholder size={24} />
                        </div>
                        
                        <div className='icone2'onClick={() => handleViewDetails(produit.id)}> <GrView size={24}/></div>
                      </div>
                      
                      <div className='addcarte' onClick={() =>ajouterAuPanier(produit)}>
                        <SlHandbag size={20}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
{/* offre exeptionnelle */}
<div>
<div className='offre_exeptionnelle'>
        <div className='produit_exeptionnel'>
          <div className='produitPopu'>
            <h1>Offres exceptionnelles</h1>
            <button></button>
             {/* Pagination */}
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Précédent
            </button>
            <span>Page {currentPage} sur {totalPages}</span>
            <button 
              onClick={nextPage} 
              disabled={currentPage === totalPages}
            >
              Voir plus <FaArrowRight size={20} color="#009444" />
            </button>
          </div>
          </div>

          <div className='liste_carte'>
          {filteredProduits.map(produit => (
              <div key={produit.id}>
                <div className='cartProduitexp'>
                  <img src={`${config.imageBaseUrl}/${produit.image}`} alt={produit.nom} />
                  <div className='elementcart'>
                    <div className='porduitprix'>
                      <p>{produit.libelle}</p>
                      <p>{produit.prix} cfa</p>
                      <p>
                        <IoIosStar size={20} color="#FF8A00"/>
                        <IoIosStar size={20} color="#FF8A00"/>
                        <IoIosStar size={20} color="#FF8A00"/>
                        <IoIosStar size={20} color="#FF8A00"/>
                      </p>
                    </div>
                    <div className='action_cartp'>
                      <div className='icone1' onClick={() => handleLike(produit)}>
                          <FcLikePlaceholder size={24} />
                        </div>
                        <div className='icone2'onClick={() => handleViewDetails(produit.id)}> <GrView size={24}/></div>
                        

                      <div className='addcarteprod'>
                        <SlHandbag size={20}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
</div>
{/* disponible chez nous */}
<div className='secton4'>
  <div>
<h1>disponible chez nous</h1>
<div>
<div className="container">
  <div className="customer-logos">
      <Slider {...settings}>
        <div className="logo-item"><img src={logo1} alt="Logo 1" /></div>
        <div className="logo-item"><img src={logo2} alt="Logo 2" /></div>
        <div className="logo-item"><img src={logo3}alt="Logo 3" /></div>
        <div className="logo-item"><img src={logo4} alt="Logo 4" /></div>
        <div className="logo-item"><img src={logo5}alt="Logo 5" /></div>
        <div className="logo-item"><img src={logo6} alt="Logo 6" /></div>
        {/* Ajoutez plus de logos si nécessaire */}
      </Slider>
    </div>
</div>
</div>
  </div>
</div>
    </div>
  );
  
}
