import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../css/login.css";
import Nav from './nav';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform login request using email and password
        // You can use fetch or an HTTP client library like axios
        setIsLoading(true);
        // Example using fetch
        fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Invalid response');
              }
            })
            .then((data) => {
              localStorage.setItem('accessToken', data.access_token);
              localStorage.setItem('id', data.user.id);
              localStorage.setItem('name', data.user.name);
              localStorage.setItem('email', data.user.email);
          
              setIsLoading(false);
              // navigate('/');
              window.location.reload();

            })
            .catch((error) => {
              console.error('Login failed', error);
              setIsLoading(false);
              setErrorMessage("Oops ! Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
            });
          
    };


    return <>
        <Nav />
        <div className='login'>
            <div className="login_content">
                <form onSubmit={handleSubmit}>
                    {isLoading && <p >Connexion...</p>}
                    {errorMessage && <p style={{ color: '#FF0000' }}>{errorMessage}</p>}
                    <div>
                        <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder='Email' />
                    </div>
                    <div>
                        <input type="password" id="password" value={password} onChange={handlePasswordChange} placeholder='Mot de passe' />
                    </div>
                    <button type="submit">CONNEXION</button>
                    <p>Vous n'avez pas encore un compte? :
                        <Link to="/register"> S'inscrire ici</Link>
                    </p>
                </form>
            </div>
        </div>

    </>
};

export default Login;