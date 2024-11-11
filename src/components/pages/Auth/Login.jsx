/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import config from '/src/config';
import Swal from 'sweetalert2';
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
      const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        
        Swal.fire({
          title: 'Erreur!',
          text: 'email ou mot de passe incorrect',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return;
      }
  
      const result = await response.json();

      localStorage.setItem('token', result.token);
    
      localStorage.setItem('user', JSON.stringify(result.user));
       
      localStorage.setItem('user', JSON.stringify({
        isAuthenticated: true,
        role: result.user.role 
      }));

      setMessage('Connexion réussie !');
      setError('');
      const userRole=result.user.role;
      if(userRole ==='admin'){
        navigate('/dashboard');
      }else if(userRole==='producteur'){
        navigate('/statistics');
      }else{
        navigate('/'); 
       
      }
      const redirectPath = localStorage.getItem('redirectPath');
      if (redirectPath) {
          navigate(redirectPath); 
          localStorage.removeItem('redirectPath');
      }
      window.location.reload();
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
                <input 
                  type={showPassword ? "text" : "password"} // Changement dynamique du type d'input
                  placeholder="********" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                <i 
                  className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`} 
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer' }}
                ></i>
              </div>
            </div>

            <p className='already_account'>Pas de compte ?<NavLink to="/register" className="btn_compte">S&apos;inscrire</NavLink></p>
            <button type="submit">Se connecter</button>
          </div>
      </form>

      </div>
    </div>
  );
}



