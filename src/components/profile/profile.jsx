import axios from 'axios';
import { useEffect, useState } from 'react';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');  
        axios.get('http://localhost:8000/api/auth/profile', {
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
            <p>Nom : {profile.name}</p>
            <p>Email : {profile.email}</p>
        </div>
    );
};

export default Profile;
