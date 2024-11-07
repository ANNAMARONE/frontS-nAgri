/* eslint-disable no-unused-vars */
import React from 'react'
import './Accueil.css'
import ImageAbout from '/src/assets/images/about10.png'
import ImagePerson from '/src/assets/images/main.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player';
import { MdDateRange } from "react-icons/md";
import { FaComments } from "react-icons/fa";
const Accueil = () => {
  return (
     <div className='contenue'>
      {/* section banniére */}
        <div className='banner'>
          <div className='description'>
      <h1>Bienvenue sur <span>SénAgri</span></h1>
      <p>SénAgri est une plateforme qui connecte les acteurs du secteur agricole sénégalais à
         travers des solutions technologiques innovantes. Elle vise à moderniser l&apos;agriculture et à promouvoir
          une croissance durable au service des producteurs locaux.</p>
         
          </div>
        </div>
        {/* section numero 1 */}
        <section className='section1'>
          <div className='container'>
            <div className='container_un'>
        <div> 
          <img src={ImageAbout} alt="à propos" style={{ width: '570px', height: '475px' }} />
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
<section className='container-fluid'>
  <div className='cardExplique'>

 
<div className='player-wrapper'>
      <ReactPlayer
        className='react-player'
        url='https://youtu.be/GEplt9E7IOg'
        width='100%'
        height='100%'
        controls={true}
      />
    </div>
    <div className='section_explique'>
          <div className='titreApropos'>
          <div className='trh1'></div>
          <h6>Ce que nous faisons</h6>
          </div>
          <h1>Nous sommes différents des autres pour fournir des services</h1>
          <div className='descriptionApropos'>
          <p>Chez SénAgri, nous révolutionnons le secteur agricole en combinant innovation technologique et
             savoir-faire local. Nous offrons une plateforme qui connecte agriculteurs, investisseurs et
              consommateurs pour faciliter la commercialisation des produits agricoles, l&apos;accès au financement,
               et la gestion des exploitations agricoles. Grâce à nos services, nous permettons aux acteurs du secteur
                d&apos;optimiser leurs performances, d&apos;accroître leur rentabilité et de contribuer au développement durable de 
                l&apos;agriculture au Sénégal.</p>
             
          </div>
         
        </div>
        </div>
</section>

{/* section numéro 3 */}
<section className='container'>
<div className='section_service'>
<div className='titre1'>
  <h1>Nos service</h1>
  <div className='hrtr'></div>
  </div>
 
<div className='nos_service'>
  <div className='container'>
  <div className='liste_cart_service'>
<div className='cart_service'>
  <h1>colaboration</h1>
  <p>Lorem ipsum dolor sit amet consectetur. Fames odio sit consequat
     amet habitant tempor. Accumsan amet nibh egestas fusce scelerisque consequat ut vel. 
     Erat neque dui morbi condimentum quis ultrices vulputate vel lectus. Facilisis morbi morbi leo
      ornare ut eu in magnis. Semper donec aliquam facilisi vitae. Sodales.</p>
  <button>En savoir plus</button>
</div>
<div className='cart_service'>
  <h1>colaboration</h1>
  <p>Lorem ipsum dolor sit amet consectetur. Fames odio sit consequat
     amet habitant tempor. Accumsan amet nibh egestas fusce scelerisque consequat ut vel. 
     Erat neque dui morbi condimentum quis ultrices vulputate vel lectus. Facilisis morbi morbi leo
      ornare ut eu in magnis. Semper donec aliquam facilisi vitae. Sodales.</p>
  <button>En savoir plus</button>
</div>
<div className='cart_service'>
  <h1>colaboration</h1>
  <p>Lorem ipsum dolor sit amet consectetur. Fames odio sit consequat
     amet habitant tempor. Accumsan amet nibh egestas fusce scelerisque consequat ut vel. 
     Erat neque dui morbi condimentum quis ultrices vulputate vel lectus. Facilisis morbi morbi leo
      ornare ut eu in magnis. Semper donec aliquam facilisi vitae. Sodales.</p>
  <button>En savoir plus</button>
</div>
</div>
</div>
</div>
</div>
</section>
{/* section numéro 4 */}
<section className='container'>
  <div className='sectionCe_que_Nous_ferons'>
    
<div className='description_service'>

<div className='titre1'>
  <h1>Ce que nous offrons</h1>
  <div className='hrtr'></div>
  <p>SénAgri propose une gamme complète de solutions pour soutenir les agriculteurs et les
     entrepreneurs du secteur agricole. Nous mettons à disposition une plateforme innovante pour faciliter la vente en circuit court,
     l&apos;accès à des financements participatifs, et la mise en relation avec des investisseurs.</p>
  </div>
</div>
<div className='liste_product-card'>
<div className="product-card">
    <div className="image-container">
        <img src={"https://th.bing.com/th/id/R.69f3e7cea180a68e950da3b2afae12ee?rik=GQq7RYbq4frGxw&pid=ImgRaw&r=0"} alt="Morning Set"/>
        <span className="favorite-star"></span>
    </div>
    <div className="product-info">
        <h2>Vente en ligne</h2>
        <p>Facilitez la commercialisation de vos produits grâce à notre plateforme intuitive et sécurisée.</p>
    </div>
</div>
<div className="product-card">
    <div className="image-container">
        <img src={"https://th.bing.com/th/id/R.b2071e77322a3566bef292354f250da3?rik=9o%2bpX3UjLAku%2fw&pid=ImgRaw&r=0"} alt="Morning Set"/>
        <span className="favorite-star"></span>
    </div>
    <div className="product-info">
        <h2>mise en relation</h2>
        <p>Facilitez la commercialisation de vos produits grâce à notre plateforme intuitive et sécurisée.</p>
    </div>
</div>
<div className="product-card">
    <div className="image-container">
        <img src={"https://th.bing.com/th/id/R.5b3693053a0b19492584da15c8ec8394?rik=A2z6WQY%2bzaqS5Q&pid=ImgRaw&r=0"} alt="Morning Set"/>
        <span className="favorite-star"></span>
    </div>
    <div className="product-info">
        <h2>Vente en ligne</h2>
        <p>Facilitez la commercialisation de vos produits grâce à notre plateforme intuitive et sécurisée.</p>
    </div>
</div>
</div>
  </div>
</section>
{/* section numéro cinq */}
<section className='container'>
<div className='sectionArticle'>
<div className='titre1'>
  <h1>Articles</h1>
  <div className='hrtr'></div>
  </div>
<div className='list_cate_article'>
<div className='carte_article'>
  <img src={"https://th.bing.com/th/id/R.69f3e7cea180a68e950da3b2afae12ee?rik=GQq7RYbq4frGxw&pid=ImgRaw&r=0"}/>
  <div className='titreArticle'>
          <div className='trh1'></div>
          <h6>À propos de SénAgri</h6>
          </div>
    <h4>Se connecter avec les agriculteurs pour améliorer leurs moyens de subsistance</h4>
  <div className='comment'>
  <div>23/02/2023 <MdDateRange size={20} color="#009444"/></div>
  <div>Commentaire  <FaComments size={20} color="#009444" /></div>
</div>
</div>
    <div className='carte_article'>
      <img src={"https://th.bing.com/th/id/R.69f3e7cea180a68e950da3b2afae12ee?rik=GQq7RYbq4frGxw&pid=ImgRaw&r=0"}/>
      <div className='titreArticle'>
              <div className='trh1'></div>
              <h6>À propos de SénAgri</h6>
              </div>
        <h4>Se connecter avec les agriculteurs pour améliorer leurs moyens de subsistance</h4>
      <div className='comment'>
      <div>23/02/2023 <MdDateRange size={20} color="#009444"/></div>
      <div>Commentaire  <FaComments size={20} color="#009444" /></div>
    </div>
    </div>
        <div className='carte_article'>
      <img src={"https://th.bing.com/th/id/R.69f3e7cea180a68e950da3b2afae12ee?rik=GQq7RYbq4frGxw&pid=ImgRaw&r=0"}/>
      <div className='titreArticle'>
              <div className='trh1'></div>
              <h6>À propos de SénAgri</h6>
              </div>
        <h4>Se connecter avec les agriculteurs pour améliorer leurs moyens de subsistance</h4>
      <div className='comment'>
      <div>23/02/2023 <MdDateRange size={20} color="#009444"/></div>
      <div>Commentaire  <FaComments size={20} color="#009444" /></div>
    </div>
    </div>
</div>
</div>
</section>
{/* section numéro sixe */}
<section className='container_fluid'>
<div className='section_choose'>
  <div className='section_choose1'>
  <h1>Pourquoi nous choisir?</h1>
  <div className='hrtr'></div>
  </div>
  <div className='list_cart_choose'>
  <div className='cart_choose1'>
  <div className='icone'>
       <img src={ImagePerson} alt="à propos" style={{ width: '50px', height: '50px' }} />
  </div> 
  <div>
    <h1>SIMPLICITÉ</h1>
    <p>Explorez facilement notre plateforme et nos outils intuitifs pour un parcours d &apos;investissement agricole sans stress.</p>
  </div>
</div>
<div className='cart_choose2'>
  <div className='icone'>
       <img src={ImagePerson} alt="à propos" style={{ width: '50px', height: '50px' }} />
  </div> 
  <div>
    <h1>SIMPLICITÉ</h1>
    <p>Explorez facilement notre plateforme et nos outils intuitifs pour un parcours d &apos;investissement agricole sans stress.</p>
  </div>
</div>
<div className='cart_choose3'>
  <div className='icone'>
       <img src={ImagePerson} alt="à propos" style={{ width: '50px', height: '50px' }} />
  </div> 
  <div>
    <h1>SIMPLICITÉ</h1>
    <p>Explorez facilement notre plateforme et nos outils intuitifs pour un parcours d &apos;investissement agricole sans stress.</p>
  </div>
</div>
  </div>

</div>
</section>

   </div>
  )
}
export default Accueil
