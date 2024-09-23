/* eslint-disable no-unused-vars */
import React from 'react'
import './Accueil.css'
import ImageAbout from '/src/assets/images/about10.png.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player';
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
          <button className='ensavoire'>En savoire plus</button>
          </div>
        </div>
        {/* section numero 1 */}
        <section className='section1'>
          <div className='container'>
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
<section className='container-fluid'>
  <h1>Nos service</h1>
  <div className='hrtr'></div>
<div className='nos_service'>
  <div className='container'>
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
</section>
   </div>
  )
}
export default Accueil
