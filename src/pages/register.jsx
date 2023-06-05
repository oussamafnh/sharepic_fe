import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../css/register.css";
import Nav from './nav';


const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Invalid response');
                }
            })
            .then((data) => {
                console.log(data.message);
                setIsLoading(false);
                navigate('/login');
            })

            .catch((error) => {
                setIsLoading(false);
                setErrorMessage("Oops ! Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
                console.error('Registration failed', error);
            });
    };

    return <>
        <Nav />
        <div className='register'>
            <div className="register_content">
                <form onSubmit={handleSubmit}>
                    {isLoading && <p >Inscription...</p>}
                    {errorMessage && <p style={{ color: '#FF0000' }}>{errorMessage}</p>}
                    <div>
                        <input type="text" id="name" value={name} onChange={handleNameChange} placeholder='Nom' />
                    </div>
                    <div>
                        <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder='Email' />
                    </div>
                    <div>
                        <input type="password" id="password" value={password} onChange={handlePasswordChange} placeholder='Mot de passe' />
                    </div>
                    <div>
                        <input type="password" id="password_confirmation" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} placeholder='Verifier votre mots de passe' />
                    </div>
                    <button type="submit">INSCRIPTION</button>
                    <p>Vous avez deja un compte? <Link to="/login">Connectez-vous ici</Link></p>
                </form>
            </div>
        </div>
    </>
};

export default Register;
