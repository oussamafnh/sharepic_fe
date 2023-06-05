import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import "../css/profil.css";
import Nav from './nav';


export default function Profil() {
    const [photos, setPhotos] = useState([]);
    const Id = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const accessToken = localStorage.getItem('accessToken');


    useEffect(() => {
        // Fetch photos from the API
        fetch(`http://127.0.0.1:8000/api/users/${Id}/photos`)
            .then(response => response.json())
            .then(data => setPhotos(data.reverse())) // Reverse the order of photos
            .catch(error => console.error('Error fetching photos:', error));

    }, []);
    const handleDelete = () => {
        fetch('http://127.0.0.1:8000/api/destroy', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then(response => {
                if (response.ok) {
                    localStorage.clear();
                    window.location.reload();
                } else {
                    throw new Error('Failed to delete account');
                }
            })
    };
    return (
        <>
            <Nav />
            <div className="photos_component">
                <div className='profil_component'>
                    <p><span>Nom : </span>{name}</p>
                    <p><span>email : </span>{email}</p>
                    {/* <Link to="/profil" >Edit profile</Link> */}
                    <Link onClick={handleDelete} style={{ color: '#FF0000' ,cursor:'pointer' ,whiteSpace:'auto'}}>Suprimer mon compte</Link>
                </div>
                <p>Mes photos :</p>
                <div className="photos">
                    {photos.map(photo => (
                        <div key={photo.id} className="photo-item">
                            <Link to={`/view/${photo.id}`}>
                                <img src={photo.image_path} alt={photo.title} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
