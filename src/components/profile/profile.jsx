import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '/src/config';
const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');  
        axios.get('http://127.0.0.1:8000/api/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            setProfile(response.data);
        })
        .catch(error => {
            setError(error.response ? error.response.data : "Erreur de connexion");
        });
    }, []);

    if (error) {
        return <div>Erreur: {error}</div>;
    }

    if (!profile) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <h1>Profil de utilisateur</h1>
            <img src={`${config.imageProfil}/${profile.profile}`} alt={profile.nam} />
            <p>Nom : {profile.name}</p>
            <p>adresse : {profile.adresse}</p>
            <p>telephone : {profile.telephone}</p>
            <p>role : {profile.role}</p>
            <p>Email : {profile.email}</p>
        </div>
    );
};

export default Profile;
