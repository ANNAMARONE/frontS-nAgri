/* eslint-disable no-unused-vars */
import React from 'react'
import './produit.css'
import { FaArrowRight } from "react-icons/fa"
import panierProduit from '/src/assets/images/panier1.png'
import catégoriImage from '/src/assets/images/produit.png'
import { SlHandbag } from "react-icons/sl";
import { GrView } from "react-icons/gr";
import { FcLikePlaceholder } from "react-icons/fc";
import { IoIosStar } from "react-icons/io";
const Produit = () => {
  return (
    <div>
      {/* premiére section */}
<section className='sectioN1'>
<div className='descriptionBoutique'>
  <div className='description1'>
  <h1>Frais et sains <br/>
  Aliments biologiques</h1>
  <button>acheté <FaArrowRight /></button>
  </div>
</div>
<div className='deux_image'>
  <div className='image_panier'>
    <img src={panierProduit} alt="" />
  </div>
  <div className='produit_desc'>
<h1>Produits 100%
sénégalais</h1>
  </div>
</div>
</section>
<section className='section2'>
<div className='catégorie'>
  <h1>Catégories</h1>
  <div className='liste_catégorie'>
<div className='catégorie1'>
<img src={catégoriImage} alt=""/>
<p>produit</p>
</div>
<div className='catégorie1'>
<img src={catégoriImage} alt=""/>
<p>produit</p>
</div>
<div className='catégorie1'>
<img src={catégoriImage} alt=""/>
<p>produit</p>
</div>
<div className='catégorie1'>
<img src={catégoriImage} alt=""/>
<p>produit</p>
</div>
<div className='catégorie1'>
<img src={catégoriImage} alt=""/>
<p>produit</p>
</div>
<div className='catégorie1'>
<img src={catégoriImage} alt=""/>
<p>produit</p>
</div>
  </div>
</div>
</section>
<div className='produit_plus_populaire'>
<div className='produit_populaire'>
<div className='produitPopu'>
  <h1>Produits  populaires</h1>
  <button>Voire plus <FaArrowRight size={20} color="#009444" /></button>
</div>
<div className='cartProduit'>
<img src={catégoriImage} alt=""/>
  <div className='elementcart'>
    <div className='porduitprix'>
  <p>Green Apple</p>
  <p>2000cfa</p>
  <p>
    <IoIosStar size={20} color="#FF8A00"/>
    <IoIosStar size={20} color="#FF8A00"/>
    <IoIosStar size={20} color="#FF8A00"/>
    <IoIosStar size={20} color="#FF8A00"/>
  </p>
    </div>
  <div className='action_cart'>
    <div className='action_cart1'>
    <div className='icone1'><FcLikePlaceholder size={24} /></div>
    <div className='icone2'><GrView size={24}/></div>
    </div>
      <div className='addcarte'>
      <SlHandbag size={20}/>
    </div>
  </div>
  </div>
</div>
</div>
</div>
    </div>
  )
}

export default Produit
