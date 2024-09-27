/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './registe.css';
import AuthUser from './AuthUser';
import '@fortawesome/fontawesome-free/css/all.min.css';
import profil from '/src/assets/images/2579132.png'

export default function Register(){
 

  const [name, setName] = useState('');
  const [profile, setProfile] = useState(null);
  const [adresse, setAdresse] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('client'); // Valeur par défaut
  const [acteur, setActeur] = useState('');
  const [region, setRegion] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // État pour stocker les messages de validation
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

    // Réinitialiser les messages d'erreur
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
      setValidationErrors(prev => ({ ...prev, name: 'Le nom est requis.' }));
      hasError = true;
    }
    if (!adresse) {
      setValidationErrors(prev => ({ ...prev, adresse: 'L\'adresse est requise.' }));
      hasError = true;
    }
    if (!telephone) {
      setValidationErrors(prev => ({ ...prev, telephone: 'Le numéro de téléphone est requis.' }));
      hasError = true;
    } else if (!/^\d+$/.test(telephone)) {
      setValidationErrors(prev => ({ ...prev, telephone: 'Le numéro de téléphone doit contenir uniquement des chiffres.' }));
      hasError = true;
    }
    if (!email) {
      setValidationErrors(prev => ({ ...prev, email: 'L\'email est requis.' }));
      hasError = true;
    }
    if (!password) {
      setValidationErrors(prev => ({ ...prev, password: 'Le mot de passe est requis.' }));
      hasError = true;
    }
    if (role === 'producteur' && !acteur) {
      setValidationErrors(prev => ({ ...prev, acteur: 'L\'acteur est requis.' }));
      hasError = true;
    }
    if (role === 'producteur' && !region) {
      setValidationErrors(prev => ({ ...prev, region: 'La région est requise.' }));
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/register', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData); 

        let errors = '';
        for (const key in errorData) {
          errors += `${key}: ${errorData[key][0]} \n`;
        }

        setError(errors);
        setMessage('');
        return;
      }

      const result = await response.json();
      setMessage('Inscription réussie !');
      setError(''); 

      // Réinitialiser les champs du formulaire
      setName('');
      setProfile(null);
      setAdresse('');
      setTelephone('');
      setEmail('');
      setPassword('');
      setRole('client');
      setActeur('');
      setRegion('');

    } catch (err) {
      console.log('Erreur:', err); 
      setError('Erreur lors de l\'inscription'); 
      setMessage(''); 
    }
  };
  


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
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <form onSubmit={handleSubmit}>
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
          onChange={(e) => setProfile(e.target.files[0])}
        />
      </div>
    </div>
    {/* ============================== */}
            <div className='from_group1'>
            <div className="form-group">
              <label>Prenom et nom: </label><br />
              <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          {validationErrors.name && <p className="validation-error">{validationErrors.name}</p>}
            </div>
            <div className="form-group">
              <label>Adresse: </label><br />
              <input 
            type="text" 
            value={adresse} 
            onChange={(e) => setAdresse(e.target.value)}   
          />
          {validationErrors.adresse && <p className="validation-error">{validationErrors.adresse}</p>}
            </div>
           
            </div>
            <div className="form-group">
              <label>Numéro de téléphone: </label><br />
              <input 
            type="text" 
            value={telephone} 
            onChange={(e) => setTelephone(e.target.value)}  
          />
          {validationErrors.telephone && <p className="validation-error">{validationErrors.telephone}</p>}
            </div>
            <div className="form-group">
              <label>Entre votre adresse email: </label><br />
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
              <label>Entre votre mot de passe: </label><br />
              <div className="input-icon">
                <i className="fas fa-lock"></i>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  id="pwd" 
                />
              {validationErrors.password && <p className="validation-error">{validationErrors.password}</p>}
                <i 
                  className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer'}}
                ></i>
              </div>
              <div className="form-group">
              <label>acteur: </label><br />
              <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            required
          >
            <option value="client">Client</option>
            <option value="producteur">Producteur</option>
            <option value="admin">Admin</option>
          </select>
            </div>
              {/* Champs conditionnels pour le rôle producteur */}
        {role === 'producteur' && (
          <>
            <div>
              <label>Acteur</label>
              <select 
                value={acteur} 
                onChange={(e) => setActeur(e.target.value)} 
                required
              >
                <option value="">Sélectionnez un acteur</option>
                <option value="Agriculteurs">Agriculteurs</option>
                <option value="Jardiniers">Jardiniers</option>
              </select>
              {validationErrors.acteur && <p className="validation-error">{validationErrors.acteur}</p>}
            </div>

            <div>
              <label>Région</label>
              <select 
                value={region} 
                onChange={(e) => setRegion(e.target.value)} 
                required
              >
                <option value="">Sélectionnez une région</option>
                <option value="Dakar">Dakar</option>
                <option value="Diourbel">Diourbel</option>
                <option value="Fatick">Fatick</option>
                {/* Ajoutez les autres régions ici */}
              </select>
              {validationErrors.region && <p className="validation-error">{validationErrors.region}</p>}
            </div>
          </>
        )}
            </div>
            <p>j&apos;ai déjà un compte?<NavLink to="/login" className='span'>S&apos;inscrire</NavLink></p>
            <button type="submit">S'inscrire</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}



//   return (
//     <div>
//       <h1>Inscription</h1>
      
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Nom</label>
//           <input 
//             type="text" 
//             value={name} 
//             onChange={(e) => setName(e.target.value)} 
//           />
//           {validationErrors.name && <p className="validation-error">{validationErrors.name}</p>}
//         </div>

//         <div>
//           <label>Profile (Image)</label>
//           <input 
//             type="file" 
//             onChange={(e) => setProfile(e.target.files[0])} 
            
//           />
//         </div>

//         <div>
//           <label>Adresse</label>
//           <input 
//             type="text" 
//             value={adresse} 
//             onChange={(e) => setAdresse(e.target.value)} 
            
//           />
//           {validationErrors.adresse && <p className="validation-error">{validationErrors.adresse}</p>}
//         </div>

//         <div>
//           <label>Téléphone</label>
//           <input 
//             type="text" 
//             value={telephone} 
//             onChange={(e) => setTelephone(e.target.value)} 
            
//           />
//           {validationErrors.telephone && <p className="validation-error">{validationErrors.telephone}</p>}
//         </div>

//         <div>
//           <label>Email</label>
//           <input 
//             type="email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
            
//           />
//           {validationErrors.email && <p className="validation-error">{validationErrors.email}</p>}
//         </div>

//         <div>
//           <label>Mot de passe</label>
//           <input 
//             type="password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
            
//           />
//           {validationErrors.password && <p className="validation-error">{validationErrors.password}</p>}
//         </div>

//         <div>
//           <label>Rôle</label>
//           <select 
//             value={role} 
//             onChange={(e) => setRole(e.target.value)} 
//             required
//           >
//             <option value="client">Client</option>
//             <option value="producteur">Producteur</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>

//         {/* Champs conditionnels pour le rôle producteur */}
//         {role === 'producteur' && (
//           <>
//             <div>
//               <label>Acteur</label>
//               <select 
//                 value={acteur} 
//                 onChange={(e) => setActeur(e.target.value)} 
//                 required
//               >
//                 <option value="">Sélectionnez un acteur</option>
//                 <option value="Agriculteurs">Agriculteurs</option>
//                 <option value="Jardiniers">Jardiniers</option>
//               </select>
//               {validationErrors.acteur && <p className="validation-error">{validationErrors.acteur}</p>}
//             </div>

//             <div>
//               <label>Région</label>
//               <select 
//                 value={region} 
//                 onChange={(e) => setRegion(e.target.value)} 
//                 required
//               >
//                 <option value="">Sélectionnez une région</option>
//                 <option value="Dakar">Dakar</option>
//                 <option value="Diourbel">Diourbel</option>
//                 <option value="Fatick">Fatick</option>
//                 {/* Ajoutez les autres régions ici */}
//               </select>
//               {validationErrors.region && <p className="validation-error">{validationErrors.region}</p>}
//             </div>
//           </>
//         )}

//         <button type="submit">S'inscrire</button>
//       </form>
//     </div>
//   );
// };

// export default Register;

