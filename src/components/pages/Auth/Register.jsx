/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './registe.css';
import AuthUser from './AuthUser';
import '@fortawesome/fontawesome-free/css/all.min.css';
import profil from '/src/assets/images/2579132.png'

export default function Register(){
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  // Fonction pour gérer le changement d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fonction pour déclencher l'input file en cliquant sur l'image
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
 
  return (
    <div className='bannier_connexion'>
      <div className="section_form">
        <div className="col-sm-6">
          <div className="contenu">
            <h1>S&apos;inscrire</h1>
       {/* image */}
       <div className='profil'>
      <div className="input-icon">
        {/* Affichage de l'image de profil (par défaut ou nouvelle image) */}
        <img 
          src={profileImage || profil} 
          alt="Profil" 
          style={{ width: '100px', height: '100px', borderRadius: '50%', cursor: 'pointer' }} 
          onClick={handleImageClick} 
        />
        <input 
          type="file" 
          id="profile-upload" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept="image/*" 
          onChange={handleImageChange}
        />
      </div>
    </div>
    {/* ============================== */}
            <div className='from_group1'>
            <div className="form-group">
              <label>Prenom et nom: </label><br />
                <input type="text" placeholder="entre votre nom" id="name" />
            </div>
            <div className="form-group">
              <label>Adresse: </label><br />
                <input type="text" placeholder="entre votre adresse" id="adresse" />
            </div>
           
            </div>
            <div className="form-group">
              <label>Numéro de téléphone: </label><br />
                <input type="text" placeholder="entre votre numéro de tél" id="telephone" />
            </div>
            <div className="form-group">
              <label>Entre votre adresse email: </label><br />
              <div className="input-icon">
                <i className="fas fa-envelope"></i>
                <input 
                  type="email" 
                  placeholder="example@gmail.com"
                  
                  id="email" 
                />
              </div>
            </div>
            <div className="form-group">
              <label>Entre votre mot de passe: </label><br />
              <div className="input-icon">
                <i className="fas fa-lock"></i>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  onChange={e => setPassword(e.target.value)}
                  id="pwd" 
                />
                <i 
                  className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer'}}
                ></i>
              </div>
              <div className="form-group">
              <label>acteur: </label><br />
              <select name="acteur" id="">
                <option value="client">client</option>
                <option value="producteur">producteur</option>
              </select>
            </div>
            </div>
            <p>j&apos;ai déjà un compte?<NavLink to="/login" className='span'>S&apos;inscrire</NavLink></p>
            <button type="button" >Se connecter</button>
          </div>
        </div>
      </div>
    </div>
  );
}


