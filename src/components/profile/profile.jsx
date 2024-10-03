import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '/src/config';
import './profile.css';
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
        <div className='containerProfile'>
           <div className='profileHeader'>
           <p>{profile.name}</p>
            <img src={`${config.imageProfil}/${profile.profile}`} alt={profile.nam} />
            
            </div>
            <p>adresse : {profile.adresse}</p>
            <p>telephone : {profile.telephone}</p>
            <p>role : {profile.role}</p>
            <p>Email : {profile.email}</p>

            <table className='table'>
                <tr>
                    <td>adresse</td>
                    <td>{profile.adresse}</td>
                </tr>
                <tr>
                    <td>telephone </td>
                    <td>{profile.telephone}</td>
                </tr>
                <tr>
                    <td>role</td>
                    <td>{profile.adresse}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{profile.email}</td>
                </tr>
            </table>
        </div>
    );
};

export default Profile;
