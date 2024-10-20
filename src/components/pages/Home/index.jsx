/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './index1.css';
import './globale.css';
import ImageAbout from '/src/assets/images/8d681f98b5a57d724973bad8abcde996.jpg';
import panierImage from '/src/assets/images/bgPanier.png';
import panierBag from '/src/assets/images/carteImage.png';

import collaboration from '/src/assets/images/collaboration.webp';
import Ressoucer from '/src/assets/images/ressoucer.jpeg';
import BackPage1 from '/src/assets/images/bagPage1.png';
import ImagePerson from '/src/assets/images/main.png';
import personne from '/src/assets/images/personne.png';
import resher from '/src/assets/images/resher.png'
import ImageAbout2 from '/src/assets/images/about10.png'
import ReactPlayer from 'react-player';
import { fetchProduits, fetchCategorie,fetchProduitByCatégorie } from '/src/apiService'; 
import Swal from 'sweetalert2';
import config from '/src/config';
import axios from 'axios';
const Index = () => {

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
          setFilteredProduits(data);
        } else {
          console.warn('Aucun produit trouvé pour la catégorie:', categorieId);
        }
      } else {
        setFilteredProduits(setProduits); 
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
    if (!produit.id || liked) {
      console.error("Produit non valide ou déjà liké");
      return;
    }
  
    const token = localStorage.getItem("token"); 
  
    axios.post(
      `${config.apiBaseUrl}/produit/${produit.id}/like`, 
      {}, 
      {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      }
    )
    .then(res => {
      const updatedLikes = res.data.likes; 
      setFilteredProduits(prevProduits =>
        prevProduits.map(p =>
          p.id === produit.id ? { ...p, likes: updatedLikes } : p
        )
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Produit liké avec succès",
        showConfirmButton: false,
        timer: 1500
      });
    })
    .catch(error => {
      console.error("Erreur lors de l'ajout du like :", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Échec du like",
        showConfirmButton: false,
        timer: 1500
      });
    });
  };
  
  return (
    <div>
      <body>
      <section id="top" className="rowtop_1">
  <div className="container-fluid">
    <div className="rowtop_1 d-flex align-items-center">
      <div className="text-content">
		
        <h1>Bienvenue sur SénAgri</h1>
        <p>
          SénAgri est une plateforme qui connecte les acteurs du secteur agricole sénégalais à travers des solutions technologiques innovantes. Elle vise à moderniser l'agriculture et à promouvoir une croissance durable au service des producteurs locaux.
        </p>
        <a href="#" className="cta-button">Rejoignez-nous</a> 
      </div>
      <div className="image-content">
        <img src={panierImage} alt="" />
      </div>
    </div>
    <div className="bubble"></div>
    <div className="bubble"></div>
    <div className="bubble"></div>
    <div className="shape"></div>
  </div>
</section>


<section id="sale" className="p_1 bg_lighto">
 <div className="container-fluid">
   <div className="list_h1 text-center mb-4 row">
    <div className="col-md-12">
	 <h2 className="mb-0"><span className="col_green">Meilleure </span>vente</h2>
	</div> 
   </div>
   <div className="list_h2 row">
   {filteredProduits.slice(0,6).map(produit => (
    <div className="col-md-2 col-sm-6" key={produit.id}>
    
     <div className="list_h2i" >
	    <div className="list_h2i1 position-relative">
	        <div className="list_h2i1i">
	          <div className="grid clearfix">
				  <figure className="effect-jazz mb-0">
					<div className='effectImage'>
                    <img src={`${config.imageBaseUrl}/${produit.image}`} alt={produit.nom} className="w-100" />
                    </div>
				  </figure>
			  </div>
	       </div>
		    <div className="list_h2i1i1 position-absolute top-0 p-1">
	         <h6 className="mb-0 font_12 fw-bold d-inline-block bg_yell col_black lh-1 rounded_30 p-1 px-2">{produit.quantite}%</h6>
	       </div>
	   </div>
	    <div className="list_h2i2">
	     <h6 className="fw-bold font_14"><a href="#">{produit.libelle}</a></h6>
		 <span className="col_yell">
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star-half-o"></i>
		 </span>
		 <h6 className="mt-2 font_14"><span className="span_1 col_green fw-bold">{produit.prix}cfa</span> </h6>
		 <h6 className="mb-0 mt-4 text-center"><a className="button" href="#">Ajouter au panier</a></h6>
	   </div>
	 </div>
    
	</div>
))}
   </div>
   
 </div>
</section>

<section id="serv_n" className="p_1 pb-0">
 <div className="container-fluid">
   <div className="list_h1 text-center mb-4 row">
    <div className="col-md-12"> 
	 <h2 className="mb-0">
        <span className="col_green">Nos </span>service</h2>
	</div>
   </div>
   <div className="serv_n row">
    <div className="col-md-3">
	 <div className="serv_nml">
	   <div className="serv_nl border_1  position-relative">
	   <div className="serv_nli">
	     <h5>Shop</h5>
		 <hr className="line_1"/>
		 <p className="mb-0">Providing simple shopping cart flow for users and other services.</p>
	   </div>
	   <div className="serv_nli1 position-absolute">
	     <span className="d-inline-block bg_yell text-black text-center rounded-circle"><i className="fa fa-shopping-bag"></i></span>
	   </div>
	 </div>
	 <div className="serv_nl border_1 position-relative mt-4">
	   <div className="serv_nli">
	     <h5>Relaxation</h5>
		 <hr className="line_1"/>
		 <p className="mb-0">Bring nature in to your life, greater productivity and relaxation.</p>
	   </div>
	   <div className="serv_nli1 position-absolute">
	     <span className="d-inline-block bg_yell text-black text-center rounded-circle"><i className="fa fa-dollar"></i></span>
	   </div>
	 </div>
	 <div className="serv_nl border_1  position-relative mt-4">
	   <div className="serv_nli">
	     <h5>Delivery</h5>
		 <hr className="line_1"/>
		 <p className="mb-0">Delivery to your door, better mental wellbeing and happiness.</p>
	   </div>
	   <div className="serv_nli1 position-absolute">
	     <span className="d-inline-block bg_yell text-black text-center rounded-circle"><i className="fa fa-truck"></i></span>
         
	   </div>
	 </div>
	 </div>
	</div>
	<div className="col-md-6">
    <div className="serv_nm text-center">
<img src={BackPage1} alt="" />
</div>

	</div>
	<div className="col-md-3">
	  <div className="serv_nml">
	   <div className="serv_nl border_1   position-relative">
	   <div className="serv_nli text-end serv_nlio">
	     <h5>Quality</h5>
		 <hr className="line_1 ms-auto"/>
		 <p className="mb-0">Providing quality plants to gardeners. Decorates your home with plants</p>
	   </div>
	   <div className="serv_nli1 position-absolute serv_nli1o">
	     <span className="d-inline-block bg_yell text-black text-center rounded-circle"><i className="fa fa-trademark"></i></span>
	   </div>
	 </div>
	 <div className="serv_nl border_1   position-relative mt-4">
	   <div className="serv_nli text-end serv_nlio">
	     <h5>Nursery Experts</h5>
		 <hr className="line_1 ms-auto"/>
		 <p className="mb-0">Get experts tip to how you can care your plants in you home.</p>
	   </div>
	   <div className="serv_nli1 position-absolute serv_nli1o">
	     <span className="d-inline-block bg_yell text-black text-center rounded-circle"><i className="fa fa-user-plus"></i></span>
	   </div>
	 </div>
	 <div className="serv_nl border_1 position-relative mt-4">
	   <div className="serv_nli text-end serv_nlio">
	     <h5>24/7 Support Center</h5>
		 <hr className="line_1 ms-auto"/>
		 <p className="mb-0">Lorem ipsum dolor sit amet, consectetuer adipiscing sed diam nibh euismod</p>
	   </div>
	   <div className="serv_nli1 position-absolute serv_nli1o">
	     <span className="d-inline-block bg_yell text-black text-center rounded-circle"><i className="fa fa-phone"></i></span>
	   </div>
	 </div>
	 </div>
 
	</div>
   </div>   
 </div>
</section>

<section id="grow" className="p_3">
 <div className="container-fluid">
   <div className="list_h1 text-center mb-4 row">
    <div className="col-md-12"> 
	 <h2 className="mb-0">Ce que <span className="col_green">nous </span> offrons</h2>
	</div>
   </div>
   <div className="grow_1 row">
    <div className="col-md-4">
      <div className="grow_1i text-center">
	    <div className="grid clearfix">
				  <figure className="effect-jazz mb-0">
					<a href="#"><img src={panierBag} className="w-100" alt="abc"/></a>
                   
				  </figure>
			  </div>
	   <h3 className="mt-3 mb-3">HDPE Grow Bags</h3>
	   <h6 className="mb-0"><a className="button  text-center" href="#">Vente de produits agricoles</a></h6>
	  </div>
	</div>
	<div className="col-md-4">
      <div className="grow_1i text-center">
	    <div className="grid clearfix">
				  <figure className="effect-jazz mb-0">
					<a href="#"><img src={collaboration} className="w-100" alt="abc"/></a>
				  </figure>
			  </div>
	   <h3 className="mt-3 mb-3">GEO Fabric Grow Bags</h3>
	   <h6 className="mb-0"><a className="button  text-center" href="#">Collaboration entre agriculteurs</a></h6>
	  </div>
	</div>
	<div className="col-md-4">
      <div className="grow_1i text-center">
	    <div className="grid clearfix">
				  <figure className="effect-jazz mb-0">
					<a href="#"><img src={Ressoucer} className="w-100" alt="abc"/></a>
				  </figure>
			  </div>
	   <h3 className="mt-3 mb-3">Rectangle Grow Bag</h3>
	   <h6 className="mb-0"><a className="button  text-center" href="#">Ressources agricoles</a></h6>
	  </div>
	</div>
   </div>
 </div>
</section>
<section id="disc" className="displayTope">
 <div className="container-fluid">
   <div className="list_h1 text-center mb-4 row">
    <div className="col-md-12">
	 <h2 className="mb-0">Discover</h2>
	</div>
   </div>
   <div className="disc_1 text-center mb-4 row">
    <div className="col-md-12">
	    <ul className="nav nav-tabs mb-0 border-0 justify-content-center">
<li className="nav-item d-inline-block me-2">
<a href="#home" data-bs-toggle="tab" aria-expanded="false" className="nav-link active">
<span className="d-md-block">New Arrivals</span>
</a>
</li>
<li className="nav-item d-inline-block me-2">
<a href="#profile" data-bs-toggle="tab" aria-expanded="true" className="nav-link">
<span className="d-md-block">Today's Sale</span>
</a>
</li>
<li className="nav-item d-inline-block">
<a href="#profile1" data-bs-toggle="tab" aria-expanded="true" className="nav-link">
<span className="d-md-block">Lighting Deals</span>
</a>
</li>

</ul>
	</div>
   </div>
   <div className="disc_2 row">
     <div className="col-md-12">
	   <div className="tab-content">
<div className="tab-pane active" id="home">
   <div className="list_h2 row">
   {filteredProduits.slice(0,6).map(produit => (
    <div className="col"  key={produit.id}>
    
     <div className="list_h2i">
	    <div className="list_h2i1 position-relative">
	        <div className="list_h2i1i">
	          <div className="grid clearfix">
				  <figure className="effect-jazz mb-0">
                  <div className='effectImage'>
                    <img src={`${config.imageBaseUrl}/${produit.image}`} className="w-100" alt={produit.nom}/>
                    </div>
				  </figure>
			  </div>
	       </div>
		    <div className="list_h2i1i1 position-absolute top-0 p-1">
	         <h6 className="mb-0 font_12 fw-bold d-inline-block bg_yell col_black lh-1 rounded_30 p-1 px-2">{produit.quantite}%</h6>
	       </div>
	   </div>
	    <div className="list_h2i2">
	     <h6 className="fw-bold font_14"><a href="#">{produit.libelle}</a></h6>
		 <span className="col_yell">
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star-half-o"></i>
		 </span>
		 <h6 className="mt-2 font_14"><span className="span_1 col_green fw-bold">{produit.prix}</span> </h6>
		 <h6 className="mb-0 mt-4 text-center"><a className="button" href="#">Select Options</a></h6>
	   </div>
	 </div>
     
	</div>
	  ))}
   </div>
</div>
<div className="tab-pane" id="profile">
   <div className="list_h2 row">
    <div className="col">
     <div className="list_h2i">
	    <div className="list_h2i1 position-relative">
	        <div className="list_h2i1i">
	          <div className="grid clearfix">
				  <figure className="effect-jazz mb-0">
					<a href="#"><img src="img/27.jpg" className="w-100" alt="abc"/></a>
				  </figure>
			  </div>
	       </div>
		    <div className="list_h2i1i1 position-absolute top-0 p-1">
	         <h6 className="mb-0 font_12 fw-bold d-inline-block bg_yell col_black lh-1 rounded_30 p-1 px-2">-60%</h6>
	       </div>
	   </div>
	    <div className="list_h2i2">
	     <h6 className="fw-bold font_14"><a href="#">All Time Vegetable Seeds</a></h6>
		 <span className="col_yell">
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star-half-o"></i>
		 </span>
		 <h6 className="mt-2 font_14"><span className="span_1 col_green fw-bold">$ 189.00</span> <span className="span_2 ms-2 text-decoration-line-through">$ 430.00</span></h6>
		 <h6 className="mb-0 mt-4 text-center"><a className="button" href="#">Select Options</a></h6>
	   </div>
	 </div>
	</div>
	<div className="col">
     <div className="list_h2i">
	    <div className="list_h2i1 position-relative">
	        <div className="list_h2i1i">
	          <div className="grid clearfix">
				  <figure className="effect-jazz mb-0">
					<a href="#"><img src="img/28.jpg" className="w-100" alt="abc"/></a>
				  </figure>
			  </div>
	       </div>
		    <div className="list_h2i1i1 position-absolute top-0 p-1">
	         <h6 className="mb-0 font_12 fw-bold d-inline-block bg_yell col_black lh-1 rounded_30 p-1 px-2">-10%</h6>
	       </div>
	   </div>
	    <div className="list_h2i2">
	     <h6 className="fw-bold font_14"><a href="#">40 Variety of Flowers Seed</a></h6>
		 <span className="col_yell">
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star-half-o"></i>
		 </span>
		 <h6 className="mt-2 font_14"><span className="span_1 col_green fw-bold">$ 489.00</span> <span className="span_2 ms-2 text-decoration-line-through">$ 990.00</span></h6>
		 <h6 className="mb-0 mt-4 text-center"><a className="button" href="#">Select Options</a></h6>
	   </div>
	 </div>
	</div>
	<div className="col">
     <div className="list_h2i">
	    <div className="list_h2i1 position-relative">
	        <div className="list_h2i1i">
	          <div className="grid clearfix">
				  <figure className="effect-jazz mb-0">
					<a href="#"><img src="img/29.jpg" className="w-100" alt="abc"/></a>
				  </figure>
			  </div>
	       </div>
		    <div className="list_h2i1i1 position-absolute top-0 p-1">
	         <h6 className="mb-0 font_12 fw-bold d-inline-block bg_yell col_black lh-1 rounded_30 p-1 px-2">-20%</h6>
	       </div>
	   </div>
	    <div className="list_h2i2">
	     <h6 className="fw-bold font_14"><a href="#">45 Variety of Vegetable</a></h6>
		 <span className="col_yell">
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star-half-o"></i>
		 </span>
		 <h6 className="mt-2 font_14"><span className="span_1 col_green fw-bold">$ 389.00</span> <span className="span_2 ms-2 text-decoration-line-through">$ 680.00</span></h6>
		 <h6 className="mb-0 mt-4 text-center"><a className="button" href="#">Select Options</a></h6>
	   </div>
	 </div>
	</div>
	<div className="col">
     <div className="list_h2i">
	    <div className="list_h2i1 position-relative">
	        <div className="list_h2i1i">
	          <div className="grid clearfix">
				  <figure className="effect-jazz mb-0">
					<a href="#"><img src="img/30.jpg" className="w-100" alt="abc"/></a>
				  </figure>
			  </div>
	       </div>
		    <div className="list_h2i1i1 position-absolute top-0 p-1">
	         <h6 className="mb-0 font_12 fw-bold d-inline-block bg_yell col_black lh-1 rounded_30 p-1 px-2">-30%</h6>
	       </div>
	   </div>
	    <div className="list_h2i2">
	     <h6 className="fw-bold font_14"><a href="#">Summer Vegetable and</a></h6>
		 <span className="col_yell">
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star-half-o"></i>
		 </span>
		 <h6 className="mt-2 font_14"><span className="span_1 col_green fw-bold">$ 289.00</span> <span className="span_2 ms-2 text-decoration-line-through">$ 699.00</span></h6>
		 <h6 className="mb-0 mt-4 text-center"><a className="button" href="#">Select Options</a></h6>
	   </div>
	 </div>
	</div>
	<div className="col">
     <div className="list_h2i">
	    <div className="list_h2i1 position-relative">
	        <div className="list_h2i1i">
	          <div className="grid clearfix">
				  <figure className="effect-jazz mb-0">
					<a href="#"><img src="img/31.jpg" className="w-100" alt="abc"/></a>
				  </figure>
			  </div>
	       </div>
		    <div className="list_h2i1i1 position-absolute top-0 p-1">
	         <h6 className="mb-0 font_12 fw-bold d-inline-block bg_yell col_black lh-1 rounded_30 p-1 px-2">-26%</h6>
	       </div>
	   </div>
	    <div className="list_h2i2">
	     <h6 className="fw-bold font_14"><a href="#">Summer Vegetable Seeds</a></h6>
		 <span className="col_yell">
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star-half-o"></i>
		 </span>
		 <h6 className="mt-2 font_14"><span className="span_1 col_green fw-bold">$ 269.00</span> <span className="span_2 ms-2 text-decoration-line-through">$ 799.00</span></h6>
		 <h6 className="mb-0 mt-4 text-center"><a className="button" href="#">Select Options</a></h6>
	   </div>
	 </div>
	</div>
   </div>
</div>

<div className="tab-pane" id="profile1">
 <div className="list_h2 row">
    <div className="col">
     <div className="list_h2i">
	    <div className="list_h2i1 position-relative">
	        <div className="list_h2i1i">
	          <div className="grid clearfix">
				  <figure className="effect-jazz mb-0">
					<a href="#"><img src="img/32.jpg" className="w-100" alt="abc"/></a>
				  </figure>
			  </div>
	       </div>
		    <div className="list_h2i1i1 position-absolute top-0 p-1">
	         <h6 className="mb-0 font_12 fw-bold d-inline-block bg_yell col_black lh-1 rounded_30 p-1 px-2">-23%</h6>
	       </div>
	   </div>
	    <div className="list_h2i2">
	     <h6 className="fw-bold font_14"><a href="#">All Time Vegetable Seeds</a></h6>
		 <span className="col_yell">
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star-half-o"></i>
		 </span>
		 <h6 className="mt-2 font_14"><span className="span_1 col_green fw-bold">$ 189.00</span> <span className="span_2 ms-2 text-decoration-line-through">$ 430.00</span></h6>
		 <h6 className="mb-0 mt-4 text-center"><a className="button" href="#">Select Options</a></h6>
	   </div>
	 </div>
	</div>
	<div className="col">
     <div className="list_h2i">
	    <div className="list_h2i1 position-relative">
	        <div className="list_h2i1i">
	          <div className="grid clearfix">
				  <figure className="effect-jazz mb-0">
					<a href="#"><img src="img/33.jpg" className="w-100" alt="abc"/></a>
				  </figure>
			  </div>
	       </div>
		    <div className="list_h2i1i1 position-absolute top-0 p-1">
	         <h6 className="mb-0 font_12 fw-bold d-inline-block bg_yell col_black lh-1 rounded_30 p-1 px-2">-33%</h6>
	       </div>
	   </div>
	    <div className="list_h2i2">
	     <h6 className="fw-bold font_14"><a href="#">40 Variety of Flowers Seed</a></h6>
		 <span className="col_yell">
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star-half-o"></i>
		 </span>
		 <h6 className="mt-2 font_14"><span className="span_1 col_green fw-bold">$ 489.00</span> <span className="span_2 ms-2 text-decoration-line-through">$ 990.00</span></h6>
		 <h6 className="mb-0 mt-4 text-center"><a className="button" href="#">Select Options</a></h6>
	   </div>
	 </div>
	</div>
	<div className="col">
     <div className="list_h2i">
	    <div className="list_h2i1 position-relative">
	        <div className="list_h2i1i">
	          <div className="grid clearfix">
				  <figure className="effect-jazz mb-0">
					<a href="#"><img src="img/34.jpg" className="w-100" alt="abc"/></a>
				  </figure>
			  </div>
	       </div>
		    <div className="list_h2i1i1 position-absolute top-0 p-1">
	         <h6 className="mb-0 font_12 fw-bold d-inline-block bg_yell col_black lh-1 rounded_30 p-1 px-2">-40%</h6>
	       </div>
	   </div>
	    <div className="list_h2i2">
	     <h6 className="fw-bold font_14"><a href="#">45 Variety of Vegetable</a></h6>
		 <span className="col_yell">
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star-half-o"></i>
		 </span>
		 <h6 className="mt-2 font_14"><span className="span_1 col_green fw-bold">$ 389.00</span> <span className="span_2 ms-2 text-decoration-line-through">$ 680.00</span></h6>
		 <h6 className="mb-0 mt-4 text-center"><a className="button" href="#">Select Options</a></h6>
	   </div>
	 </div>
	</div>
	<div className="col">
     <div className="list_h2i">
	    <div className="list_h2i1 position-relative">
	        <div className="list_h2i1i">
	          <div className="grid clearfix">
				  <figure className="effect-jazz mb-0">
					<a href="#"><img src="img/35.jpg" className="w-100" alt="abc"/></a>
				  </figure>
			  </div>
	       </div>
		    <div className="list_h2i1i1 position-absolute top-0 p-1">
	         <h6 className="mb-0 font_12 fw-bold d-inline-block bg_yell col_black lh-1 rounded_30 p-1 px-2">-14%</h6>
	       </div>
	   </div>
	    <div className="list_h2i2">
	     <h6 className="fw-bold font_14"><a href="#">Summer Vegetable and</a></h6>
		 <span className="col_yell">
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star-half-o"></i>
		 </span>
		 <h6 className="mt-2 font_14"><span className="span_1 col_green fw-bold">$ 289.00</span> <span className="span_2 ms-2 text-decoration-line-through">$ 699.00</span></h6>
		 <h6 className="mb-0 mt-4 text-center"><a className="button" href="#">Select Options</a></h6>
	   </div>
	 </div>
	</div>
	<div className="col">
     <div className="list_h2i">
	    <div className="list_h2i1 position-relative">
	        <div className="list_h2i1i">
	          <div className="grid clearfix">
				  <figure className="effect-jazz mb-0">
					<a href="#"><img src="img/36.jpg" className="w-100" alt="abc"/></a>
				  </figure>
			  </div>
	       </div>
		    <div className="list_h2i1i1 position-absolute top-0 p-1">
	         <h6 className="mb-0 font_12 fw-bold d-inline-block bg_yell col_black lh-1 rounded_30 p-1 px-2">-38%</h6>
	       </div>
	   </div>
	    <div className="list_h2i2">
	     <h6 className="fw-bold font_14"><a href="#">Summer Vegetable Seeds</a></h6>
		 <span className="col_yell">
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star"></i>
		  <i className="fa fa-star-half-o"></i>
		 </span>
		 <h6 className="mt-2 font_14"><span className="span_1 col_green fw-bold">$ 269.00</span> <span className="span_2 ms-2 text-decoration-line-through">$ 799.00</span></h6>
		 <h6 className="mb-0 mt-4 text-center"><a className="button" href="#">Select Options</a></h6>
	   </div>
	 </div>
	</div>
   </div>
 </div>

</div>
	 </div>
   </div>
 </div>
</section>

 {/* section numero 1 */}
 <section className='section1'>
          <div className='container'>
            <div className='container_un'>
        <div> 
          <img src={ImageAbout2} alt="à propos" style={{ width: '570px', height: '475px' }} />
        </div>
        <div className='section_description'>
          <div className='titreApropos'>
          <div className='trh1'></div>
          <h6>À propos de SénAgri</h6>
          </div>
          <h1>Améliorer la production agricole au sénégal</h1>
          <div className='descriptionApropos'>
          <div className='trh2'></div>
          <p>SénAgri est une initiative dédiée à la transformation du secteur agricole sénégalais à travers l&apos;intégration de la technologie. Nous accompagnons les agriculteurs, les coopératives, et les investisseurs en offrant 
            des solutions qui facilitent la commercialisation, l&apos;accès aux financements et l&apos;optimisation des
             pratiques agricoles. Notre mission est de contribuer à une agriculture plus moderne, durable et connectée,
              pour une meilleure rentabilité et une croissance inclusive.</p>
             
          </div>
          <button>En savoire plus</button>
        </div>
        </div>
        </div>
        </section>
        {/* section numéro 2 */}



<section id="organ" className="p_3">
 <div className="container-fluid">
   <div className="list_h1 text-center mb-4 row">
    <div className="col-md-12">
	 <h2 className="mb-0">Pourquoi <span className="col_green">nous </span> choisir?</h2>
	</div>
   </div>
   <div className="organ_1 row">
    <div className="col-md-3">
     <div className="organ_1">
	   <div className="organ_1i row">
	     <div className="col-md-3 pe-0 col-3">
		  <div className="organ_1il">
		   <img src={ImageAbout} className="w-100" alt="abc"/>
           
		  </div>
		 </div>
		 <div className="col-md-9 col-9">
		  <div className="organ_1ir">
		   <h6 className="fw-bold">Livraison gratuite</h6>
		   <p className="mb-0 font_14">Livraison gratuite pour les commandes supérieures à 5000 CFA</p>
		  </div>
		 </div>
	   </div>
	 </div>
	</div>
	<div className="col-md-3">
     <div className="organ_1">
	   <div className="organ_1i row">
	     <div className="col-md-3 pe-0 col-3">
		  <div className="organ_1il">
		   <img src={ImagePerson} className="w-100" alt="abc"/>
		  </div>
		 </div>
		 <div className="col-md-9 col-9">
		  <div className="organ_1ir">
		   <h6 className="fw-bold">SIMPLICITÉ</h6>
		   <p className="mb-0 font_14">Explorez facilement notre plateforme et nos outils intuitifs pour un parcours d 'investissement agricole sans stress.</p>
		  </div>
		 </div>
	   </div>
	 </div>
	</div>
	<div className="col-md-3">
     <div className="organ_1">
	   <div className="organ_1i row">
	     <div className="col-md-3 pe-0 col-3">
		  <div className="organ_1il">
		   <img src={personne} className="w-100" alt="abc"/>
		  </div>
		 </div>
		 <div className="col-md-9 col-9">
		  <div className="organ_1ir">
		   <h6 className="fw-bold">TRANSPARENCE</h6>
		   <p className="mb-0 font_14">Accédez à des ressources utiles et des conseils aux agriculteurs et jardiniers, tels que des articles ,forums de discussion, etc.</p>
		  </div>
		 </div>
	   </div>
	 </div>
	</div>
	<div className="col-md-3">
     <div className="organ_1">
	   <div className="organ_1i row">
	     <div className="col-md-3 pe-0 col-3">
		  <div className="organ_1il">
		   <img src={resher} className="w-100" alt="abc"/>
		  </div>
		 </div>
		 <div className="col-md-9 col-9">
		  <div className="organ_1ir">
		   <h6 className="fw-bold">SOUTIEN</h6>
		   <p className="mb-0 font_14">Grâce à nos outils de communication et de collaboration, vous pouvez facilement entrer en contact avec d'autres agriculteurs et commerçants,.</p>
		  </div>
		 </div>
	   </div>
	 </div>
	</div>
   </div>
   <div className="organ_2 row mt-4 text-center">
    <div className="col-md-12">
       <div className="organ_2i position-relative">
       <div className="organ_2i1">
	   <iframe src="https://assets.pinterest.com/ext/embed.html?id=736479345325002135" height="438" width="600" frameborder="0" scrolling="no" ></iframe>
</div>

		 <div className="organ_2i2 position-absolute top-0 w-100">
		  
		 </div>
	   </div>
	</div>
   </div>
 </div>
</section>


<section id="learn" className="p_3 bg_light">
 <div className="container-fluid">
   <div className="learn_1 row">
    <div className="col-md-6">
      <div className="learn_1l position-relative">
	    <div className="learn_1l1">
	      <div className="grid clearfix">
				  <figure className="effect-jazz mb-0">
					 
<div className='player-wrapper'>
      <ReactPlayer
        className='react-player'
        url='https://youtu.be/GEplt9E7IOg'
        width='100%'
        height='100%'
        controls={true}
      />
    </div>
				  </figure>
			  </div>
	  </div>
	  <div className="learn_1l2 position-absolute w-100 bg_back h-100 top-0 px-4">
	     <div className="learn_1l2i row">
		   <div className="col-md-3 col-3">
		     <div className="learn_1l2il">
			   <img src="img/52.jpg" className="rounded-circle w-100" alt="abc"/>
			 </div>
		   </div>
		   <div className="col-md-9 col-9">
		     <div className="learn_1l2ir">
			   <h3 className="text-white">Agriculture & Jardinage</h3>
			   <h5 className="text-light">Par Équipe de sénAgri</h5>
			   <h6 className="mb-0 mt-3"><a className="font_12 fw-bold d-inline-block bg_oran lh-1 text-white rounded_30 p-1 px-3" href="#"><i className="fa fa-bell me-1"></i> SUBSCRIBE</a></h6>
			 </div>
		   </div>
		 </div>
	  </div>
	  </div>
	</div>
	<div className="col-md-6">
      <div className="learn_1r mt-4">
	    <h1 className="font_60"><span className="col_green">Learn</span> with Us</h1>
		<p className="mt-3">The cucumber is a widely-cultivated creeping vine plant in the Cucurbitaceae family. It contains Vitamins A, C, and K and is rich in magnesium, potassium, iron, calcium, copper, zinc, and many other nutrients and minerals. Buy good quality Cucumber (Kheera) Hybrid Seeds best price in India from www.info@gmail.com with a High Germination rate. Are You New to Gardening? Elevate Your Skills and   Become a PRO—Don't Miss This Chance!</p>
		<h6 className="mb-0 mt-4"><a className="button_2" href="#">Subscribe on YouTube</a></h6>
	  </div>
	</div>
   </div>
 </div>
</section>


</body>
    </div>
  )
}

export default Index
