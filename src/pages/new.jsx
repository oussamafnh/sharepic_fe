import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../css/new.css";
import Nav from './nav';

const New = () => {

    const accessToken = localStorage.getItem('accessToken');
    const isAuthenticated = !!accessToken;


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handletitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleimageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handledescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'lh703mgk');

        try {
            setIsLoading(true); // Set loading state to true

            const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dq7kjds8s/image/upload', {
                method: 'POST',
                body: formData,
            });

            const cloudinaryData = await cloudinaryResponse.json();
            const imageUrl = cloudinaryData.secure_url;

            await fetch('http://127.0.0.1:8000/api/photos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    image_path: imageUrl,
                    description,
                    user_id: localStorage.getItem('id'),
                }),
            });

            setIsLoading(false); // Set loading state to false
            navigate('/');
        } catch (error) {
            console.error('Error creating photo:', error);
            setIsLoading(false); // Set loading state to false (in case of error)
        }
    };

    return (
        <>
            <Nav />
            {isAuthenticated ?
                <div className='new'>
                    <div className="new_content">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input type="text" id="title" value={title} onChange={handletitleChange} placeholder='Titre' />
                            </div>
                            <div>
                                <input type="file" id="image" onChange={handleimageChange} placeholder='image' />
                            </div>
                            <div>
                                <input type="text" id="description" value={description} onChange={handledescriptionChange} placeholder='Description' />
                            </div>
                            <button type="submit">create</button>
                            {isLoading && <p className="loader">en cour...</p>}
                        </form>
                    </div>
                </div>
                : <div className='new'>
                    <div className="new_content"> <p>T'es pas encore connecter ,<Link to="/login">Connectez-vous ici</Link></p>
                    </div>
                </div>
            }
        </>
    );
};

export default New;
