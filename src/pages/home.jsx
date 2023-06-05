import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/home.css'; // Add a CSS file for styling
import Nav from './nav';

export default function Home() {
    const [photos, setPhotos] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const isAuthenticated = !!accessToken;

    useEffect(() => {
        // Fetch photos from the API
        fetch('http://127.0.0.1:8000/api/photos')
            .then(response => response.json())
            .then(data => setPhotos(data.reverse())) // Reverse the order of photos
            .catch(error => console.error('Error fetching photos:', error));
    }, []);

    
    return (
        <>
        <Nav />
            {isAuthenticated ?
                <div className="photos_component">
                    <div className="explore">
                        <Link to="/add_photo">créer un nouveau post</Link>
                    </div>
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
                : <div className="home2">
                    <div className="content_home2">
                        <p>PARTAGEZ VOS PHOTOS AVEC LE MONDE</p>
                        <Link to="/register">commencez maintenant</Link>
                    </div>
                </div>}
        </>
    );
}
