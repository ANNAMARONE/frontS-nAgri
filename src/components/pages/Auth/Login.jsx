/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate(); 

  const validateForm = () => {
    let isValid = true;

    // Réinitialiser les messages d'erreur
    setEmailError('');
    setPasswordError('');

    // Validation de l'email
    if (!email) {
      setEmailError('L\'email est requis.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Veuillez entrer un email valide.');
      isValid = false;
    }

    // Validation du mot de passe
    if (!password) {
      setPasswordError('Le mot de passe est requis.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Erreur lors de la connexion');
        setMessage('');
        return;
      }
  
      const result = await response.json();
      
      // Stocker le token et les informations de l'utilisateur
      localStorage.setItem('token', result.token);
    
      localStorage.setItem('user', JSON.stringify(result.user));
       

      setMessage('Connexion réussie !');
      setError('');
      const userRole=result.user.role;
      if(userRole ==='admin'){
        navigate('/dashboard');
      }else if(userRole==='producteur'){
        navigate('/dashboardProducteur');
      }else{
        navigate('/'); 
      }
      
    } catch (err) {
      console.log('Erreur:', err);
      setError('Erreur lors de la connexion');
      setMessage('');
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  return (
    <div className='bannier_connexion'>
      <div className="section_form">
        <div className="col-sm-6">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="contenu">
            <div className='titre_des'>
              <h1>Bienvenue sur <span>SénAgri</span></h1>
            </div>
            <h1>Se connecter</h1>
            <div className="form-group">
              <label>Entre votre adresse email: </label><br />
              <div className="input-icon">
                <i className="fas fa-envelope"></i>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                 {emailError && <p style={{ color: 'red' }}>{emailError}</p>} 
              </div>
            </div>
            <div className="form-group">
              <label>Entre votre mot de passe: </label><br />
              <div className="input-icon">
                <i className="fas fa-lock"></i>
               
                  <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                  {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                <i 
                  className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer'}}
                ></i>
              </div>
            </div>
            <p>Pas de compte ?<NavLink to="/register" className='span'>S&apos;inscrire</NavLink></p>
            <button type="submit">Se connecter</button>
          </div>
      </form>
        </div>
      </div>
    </div>
  );
}



