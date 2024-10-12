/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './registe.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import profil from '/src/assets/images/2579132.png';
import config from '/src/config';
import Swal from 'sweetalert2';
export default function Register() {
  const [name, setName] = useState('');
  const [profile, setProfile] = useState(null);
  const [adresse, setAdresse] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('client');
  const [acteur, setActeur] = useState('');
  const [region, setRegion] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    adresse: '',
    telephone: '',
    email: '',
    password: '',
    acteur: '',
    region: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Reset des erreurs
    setValidationErrors({
      name: '',
      adresse: '',
      telephone: '',
      email: '',
      password: '',
      acteur: '',
      region: '',
    });
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('profile', profile);
    formData.append('adresse', adresse);
    formData.append('telephone', telephone);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
  
    if (role === 'producteur') {
      formData.append('acteur', acteur);
      formData.append('region', region);
    }
  
    // Validation basique
    let hasError = false;
  
    if (!name) {
      setValidationErrors((prev) => ({ ...prev, name: 'Le nom est requis.' }));
      hasError = true;
    }
    if (!adresse) {
      setValidationErrors((prev) => ({ ...prev, adresse: "L'adresse est requise." }));
      hasError = true;
    }
    if (!telephone) {
      setValidationErrors((prev) => ({ ...prev, telephone: 'Le numéro de téléphone est requis.' }));
      hasError = true;
    } else if (!/^\d+$/.test(telephone)) {
      setValidationErrors((prev) => ({ ...prev, telephone: 'Le numéro de téléphone doit contenir uniquement des chiffres.' }));
      hasError = true;
    }
    if (!email) {
      setValidationErrors((prev) => ({ ...prev, email: 'L\'email est requis.' }));
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setValidationErrors((prev) => ({ ...prev, email: "Le format de l'email est invalide." }));
      hasError = true;
    }
    if (!password) {
      setValidationErrors((prev) => ({ ...prev, password: 'Le mot de passe est requis.' }));
      hasError = true;
    } else if (password.length < 6) {
      setValidationErrors((prev) => ({ ...prev, password: 'Le mot de passe doit contenir au moins 6 caractères.' }));
      hasError = true;
    }
  
    if (role === 'producteur' && !acteur) {
      setValidationErrors((prev) => ({ ...prev, acteur: "L'acteur est requis." }));
      hasError = true;
    }
    if (role === 'producteur' && !region) {
      setValidationErrors((prev) => ({ ...prev, region: 'La région est requise.' }));
      hasError = true;
    }
  
    if (hasError) {
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/register', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
  
      const result = await response.json();
      
      // Si l'inscription échoue
      if (!response.ok) {
        const errorMessages = result.errors ? Object.values(result.errors).flat().join(', ') : result.message;
        setError(errorMessages || "Une erreur est survenue lors de l'inscription.");
        Swal.fire({
          title: 'Erreur!',
          text: errorMessages || 'Une erreur est survenue lors de l\'inscription.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      } else {
        setMessage("Inscription réussie !");
        Swal.fire({
          title: 'Succès!',
          text: 'Votre inscription a réussi.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        setError('');
  
        // Réinitialiser les champs
        setName('');
        setProfile(null);
        setAdresse('');
        setTelephone('');
        setEmail('');
        setPassword('');
        setRole('client');
        setActeur('');
        setRegion('');
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError("Erreur lors de l'inscription");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setProfile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='bannier_connexion'>
      <div className="section_form">
        <div className="col-sm-6">
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="contenu">
            <h1>S&apos;inscrire</h1>
       {/* Image */}
       <div className='profil'>
          <div className="input-icon">
            <img 
              src={profileImage || profil} 
              alt="Profil" 
              style={{ width: '100px', height: '100px', borderRadius: '50%', cursor: 'pointer' }} 
              onClick={handleImageClick}
            />
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*" 
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Champs du formulaire */}
        <div className='from_group1'>
          <div className="form-group">
            <label>Prenom et nom:</label><br />
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            {validationErrors.name && <p className="validation-error">{validationErrors.name}</p>}
          </div>
          <div className="form-group">
            <label>Adresse:</label><br />
            <input 
              type="text" 
              value={adresse} 
              onChange={(e) => setAdresse(e.target.value)}   
            />
            {validationErrors.adresse && <p className="validation-error">{validationErrors.adresse}</p>}
          </div>
        </div>

        <div className="form-group">
          <label>Numéro de téléphone:</label><br />
          <input 
            type="text" 
            value={telephone} 
            onChange={(e) => setTelephone(e.target.value)}  
          />
          {validationErrors.telephone && <p className="validation-error">{validationErrors.telephone}</p>}
        </div>
        <div className="form-group">
          <label>Entrez votre adresse email:</label><br />
          <div className="input-icon">
            <i className="fas fa-envelope"></i>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            {validationErrors.email && <p className="validation-error">{validationErrors.email}</p>}
          </div>
        </div>

        <div className="form-group">
          <label>Entrez votre mot de passe:</label><br />
          <div className="input-icon">
            <i className="fas fa-lock"></i>
            <input 
              type={showPassword ? 'text' : 'password'} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <i 
              className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} 
              style={{ cursor: 'pointer' }} 
              onClick={togglePasswordVisibility}
            ></i>
            {validationErrors.password && <p className="validation-error">{validationErrors.password}</p>}
          </div>
        </div>

        <div className="form-group">
          <label>Vous êtes:</label><br />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="client">Client</option>
            <option value="producteur">Producteur</option>
          </select>
        </div>

        {role === 'producteur' && (
          <>
            <div className="form-group">
              <label>Acteur:</label><br />
              <select value={acteur} onChange={(e) => setActeur(e.target.value)}>
                <option value="">Sélectionnez un acteur</option>
                <option value="Agriculteurs">Agriculture</option>
                <option value="Jardiniers">Jardinier</option>
              </select>
              {validationErrors.acteur && <p className="validation-error">{validationErrors.acteur}</p>}
            </div>

            <div className="form-group">
              <label>Région:</label><br />
              <select value={region} onChange={(e) => setRegion(e.target.value)}>
                <option value="">Sélectionnez une région</option>
                <option value="Dakar">Dakar</option>
                <option value="Thiès">Thiès</option>
                <option value="Saint-Louis">Saint-Louis</option>
                <option value="Diourbel">Diourbel</option>
                <option value="Kaffrine">Kaffrine</option>
                <option value="Kaolack">Kaolack</option>
                <option value="Kédougou">Kédougou</option>
                <option value="Louga">Louga</option>
                <option value="Matam">Matam</option>
                <option value="Tambacounda">Tambacounda</option>
                <option value="Ziguinchor">Ziguinchor</option>
              </select>
              {validationErrors.region && <p className="validation-error">{validationErrors.region}</p>}
            </div>
          </>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
        </button>
          <p className="already_account">
            Vous avez déjà un compte?{" "}
            <NavLink to="/connexion" className="btn_compte">
              Connectez-vous
            </NavLink>
          </p>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
