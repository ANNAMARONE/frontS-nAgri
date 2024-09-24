/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './login.css';
import AuthUser from './AuthUser';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Login() {
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = () => {
    // API call
    http.post('/login', { email: email, password: password }).then((res) => {
      setToken(res.data.user, res.data.access_token);
    });
  };

  return (
    <div className='bannier_connexion'>
      <div className="section_form">
        <div className="col-sm-6">
          <div className="contenu">
            <div className='titre_des'>
              <h1>Bienvenue sur <span>SénAgri</span></h1>
            </div>
            <h1>Se connecter</h1>
            <div className="form-group">
              <label>Entre votre adresse email: </label><br />
              <div className="input-icon">
                <i className="fas fa-envelope"></i>
                <input 
                  type="email" 
                  placeholder="example@gmail.com"
                  onChange={e => setEmail(e.target.value)}
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
            </div>
            <p>Pas de compte ?<NavLink to="/register" className='span'>S&apos;inscrire</NavLink></p>
            <button type="button" onClick={submitForm}>Se connecter</button>
          </div>
        </div>
      </div>
    </div>
  );
}
