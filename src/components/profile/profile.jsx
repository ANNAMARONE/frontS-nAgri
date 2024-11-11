import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '/src/config';
import './profile.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${config.apiBaseUrl}/auth/me`, {
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
        return <div>Chargement</div>;
    }

    // Fonction pour gérer le clic du bouton modifier
    const handleEditClick = () => {
        navigate('/modifier-profile',{ state: { profile } }); 
    };

    return (
        <div className='containerProfile'>
           <div className='MonProfile'>
           <div className='profileHeader'>
               <p>{profile.name}</p>
               <img src={`${config.imageProfil}/${profile.profile}`} alt={profile.name} />
            </div>

            <table className='table'>
                <tr>
                    <td>Adresse</td>
                    <td>{profile.adresse}</td>
                </tr>
                <tr>
                    <td>Téléphone</td>
                    <td>{profile.telephone}</td>
                </tr>
                <tr>
                    <td>Rôle</td>
                    <td>{profile.role}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{profile.email}</td>
                </tr>
            </table>

            <button onClick={handleEditClick}>Modifier</button>
           </div>
        </div>
    );
};

export default Profile;
