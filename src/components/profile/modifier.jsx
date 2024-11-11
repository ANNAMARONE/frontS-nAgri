/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './profile.css'
import config from '/src/config';
const ModifierProfile = () => {
  const location = useLocation(); 
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    adresse: '',
    telephone: '',
    role: 'client',
    acteur: '',
    region: '',
    password: '',
    profile: null,
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.profile) {
      setProfile(location.state.profile); 
    } else {
      
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`${config.apiBaseUrl}/auth/me`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setProfile(response.data.user);
        } catch (error) {
          setMessage("Erreur lors du chargement du profil");
          console.log(error);
        }
      };
      fetchProfile();
    }
  }, [location.state?.profile]); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, profile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    formData.append('adresse', profile.adresse);
    formData.append('telephone', profile.telephone);
    formData.append('role', profile.role);
    formData.append('password', profile.password || '');

    if (profile.profile instanceof File) {
      formData.append('profile', profile.profile);
    }

    if (profile.role === 'producteur') {
      formData.append('acteur', profile.acteur);
      formData.append('region', profile.region);
    }

    try {
      const response = await axios.post(`${config.apiBaseUrl}/user/profile`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage("Profil mis à jour avec succès",response);
      setErrors({});
      navigate('/profileUse');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setMessage("Une erreur est survenue lors de la mise à jour du profil");
      }
    }
  };

  return (
    <div className='containerProfile'>
      <div className='profileHeader'>
               <p>{profile.name}</p>
               <img src={`${config.imageProfil}/${profile.profile}`} alt={profile.name} />
            </div>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
      <div className='inputeName'>  <div>
          <label>Nom :</label><br />
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            required
          />
          {errors.name && <span>{errors.name[0]}</span>}
        </div>
        <div>
          <label>Email :</label><br />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <span>{errors.email[0]}</span>}
        </div></div>
     <div className="setion2input">
     <div>
          <label>Adresse :</label><br />
          <input
            type="text"
            name="adresse"
            value={profile.adresse}
            onChange={handleInputChange}
            required
          />
          {errors.adresse && <span>{errors.adresse[0]}</span>}
        </div>
        <div>
          <label>Téléphone :</label> <br />
          <input
            type="text"
            name="telephone"
            value={profile.telephone}
            onChange={handleInputChange}
            required
          />
          {errors.telephone && <span>{errors.telephone[0]}</span>}
        </div>
     </div>
       <div className="setion3input">
       <div className='selectInput'>
          <label>Rôle :</label> <br />
          <select name="role" value={profile.role} onChange={handleInputChange}>
            <option value="client">Client</option>
            <option value="producteur">Producteur</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <span>{errors.role[0]}</span>}
        </div>
        
        {profile.role === 'producteur' && (
          <div className='selectInput'>
            <div>
              <label>Acteur :</label> <br />
              <select name="acteur" value={profile.acteur} onChange={handleInputChange}>
                <option value="Agriculteurs">Agriculteurs</option>
                <option value="Jardiniers">Jardiniers</option>
              </select>
              {errors.acteur && <span>{errors.acteur[0]}</span>}
            </div>
            <div>
              <label>Région :</label> <br />
              <select name="region" value={profile.region} onChange={handleInputChange}>
                <option value="Dakar">Dakar</option>
                <option value="Diourbel">Diourbel</option>
                <option value="Fatick">Fatick</option>
              </select>
              {errors.region && <span>{errors.region[0]}</span>}
            </div>
          </div>
        )}

        <div className='selectInput'>
          <label>Image de profil :</label><br />
          <input type="file" name="profile" onChange={handleFileChange} />
          {errors.profile && <span>{errors.profile[0]}</span>}
        </div>
       </div>

        <button type="submit">envoyer</button>
      </form>
    </div>
  );
};

export default ModifierProfile;
