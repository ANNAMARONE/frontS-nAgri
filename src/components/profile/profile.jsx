import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token'); // Assurez-vous que le token est bien enregistré

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/me', {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        });

        setUser(response.data); // Stocker les données de l'utilisateur
      } catch (error) {
        if (error.response) {
          // La requête a été faite et le serveur a répondu avec un statut différent de 2xx
          console.error('Erreur lors de la récupération du profil utilisateur :', error.response.data);
          setError(`Erreur ${error.response.status}: ${error.response.data.message || 'Erreur lors de la récupération des données utilisateur.'}`);
        } else if (error.request) {
          // La requête a été faite mais aucune réponse n'a été reçue
          console.error('Aucune réponse reçue de l\'API :', error.request);
          setError('Aucune réponse reçue de l\'API.');
        } else {
          // Quelque chose a déclenché une erreur lors de la configuration de la requête
          console.error('Erreur:', error.message);
          setError('Erreur inconnue lors de la récupération des données utilisateur.');
        }
      } finally {
        setLoading(false); // Arrêter le chargement même en cas d'erreur
      }
    };

    fetchUserProfile();
  }, [token]); // Exécuter à chaque fois que le token change

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Aucune information disponible.</div>;
  }

  return (
    <div>
      <h1>Profil Utilisateur</h1>
      <p>Nom: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Ajoutez d'autres informations selon la structure de vos données utilisateur */}
    </div>
  );
};

export default Profile;
