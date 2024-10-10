/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './verification.css'; 
import config from '/src/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const VerificationOpt = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [email, setEmail] = useState(localStorage.getItem('email') || "");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join(''); 
    const otpInt = parseInt(otpString, 10); 

    if (isNaN(otpInt)) {
      setError("L'OTP doit être un nombre valide.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${config.apiBaseUrl}/auth/verifier-otp`, { 
        email: email, 
        otp: otpInt 
      });
      console.log('Vérification réussie:', response.data);
      Swal.fire({
        title: "Sweet!",
        text: "Vérification réussie",
        imageUrl: "images/thumbs-up.jpg",
        imageWidth: 400, 
        imageHeight: 200, 
        imageAlt: "Thumbs up",
      });
      navigate('/produit'); 
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'Erreur de vérification');
        console.error('Erreur de réponse:', error.response.data);
      } else {
        console.error('Erreur lors de la requête:', error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className='authOpt'>
        <div className='login'>
          <div className='title-auth'>
            <h5>OTP Authentication</h5>
            <p>Saisissez l&apos;OTP à 6 chiffres envoyé à votre adresse email.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className='otp-form'>
          {otp.map((data, index) => (
            <input 
              key={index}
              className='otp'
              type='text'
              name='otp'
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              required
            />
          ))}
          {error && <p className="error-message">{error}</p>}
          <input 
            type="submit"
            value={isSubmitting ? "Vérification en cours..." : "Vérifier"}
            className='btn'
            disabled={otp.includes("") || isSubmitting}
          />
        </form>
        <div className='auth-footer'>
          <p>Je n&apos;ai pas reçu d&apos;OTP <a className="resend-btn" href="#">Renvoyer</a></p>
        </div>
      </section>
    </div>
  );
}

export default VerificationOpt;
