import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/view.css";
import Nav from "./nav";

export default function View() {
    const { photoId } = useParams();
    const [photo, setPhoto] = useState(null);
    const [owner_name, setOwner_name] = useState(null);

    useEffect(() => {
        // Fetch photo from the API
        fetch(`http://127.0.0.1:8000/api/photos/${photoId}`)
            .then(response => response.json())
            .then(data => {
                setPhoto(data);
                // Fetch owner information
                return fetch(`http://127.0.0.1:8000/api/photos/user/${photoId}`);
            })
            .then(response => response.json())
            .then(data => setOwner_name(data))
            .catch(error => console.error('Error fetching photo:', error));
    }, [photoId]);
    // Function to format the date in "YYYY-MM-DD" format
    const formatDate = date => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <Nav />
            <div className="view">
                {photo && (
                    <>
                        <div className="image_view">
                            <img src={photo.image_path} alt="" />
                        </div>
                        <div className="description_view">
                            <p className="title">{photo.title}</p>
                            <div className="view_header">
                                {owner_name && <p className="author">par : {owner_name.owner}</p>}
                                <p className="date">{formatDate(photo.created_at)}</p>
                            </div>
                            <p className="description">{photo.description}</p>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
