// /* eslint-disable no-unused-vars */
// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import './login.css';
// import AuthUser from './AuthUser';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// export default function Login() {
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };



//   return (
//     <div className='bannier_connexion'>
//       <div className="section_form">
//         <div className="col-sm-6">
//           <div className="contenu">
//             <div className='titre_des'>
//               <h1>Bienvenue sur <span>SénAgri</span></h1>
//             </div>
//             <h1>Se connecter</h1>
//             <div className="form-group">
//               <label>Entre votre adresse email: </label><br />
//               <div className="input-icon">
//                 <i className="fas fa-envelope"></i>
//                 <input 
//                   type="email" 
//                   placeholder="example@gmail.com"
                  
//                   id="email" 
//                 />
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Entre votre mot de passe: </label><br />
//               <div className="input-icon">
//                 <i className="fas fa-lock"></i>
//                 <input 
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="********"
//                   onChange={e => setPassword(e.target.value)}
//                   id="pwd" 
//                 />
//                 <i 
//                   className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
//                   onClick={togglePasswordVisibility}
//                   style={{ cursor: 'pointer'}}
//                 ></i>
//               </div>
//             </div>
//             <p>Pas de compte ?<NavLink to="/register" className='span'>S&apos;inscrire</NavLink></p>
//             <button type="button" >Se connecter</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate(); // Initialisation de useNavigate

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

    // Validation du formulaire
    if (!validateForm()) {
      return; // Arrête l'exécution si le formulaire n'est pas valide
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
      localStorage.setItem('token', result.token);
      setMessage('Connexion réussie !');
      setError('');
      navigate('/'); 
    } catch (err) {
      console.log('Erreur:', err);
      setError('Erreur lors de la connexion');
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>} 
        </div>

        <div>
          <label>Mot de passe</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </div>

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;

