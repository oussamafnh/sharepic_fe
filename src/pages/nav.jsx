import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import "../css/nav.css";


export default function Nav() {

    const accessToken = localStorage.getItem('accessToken');
    const isAuthenticated = !!accessToken;

    const id = localStorage.getItem('id');


    const name = localStorage.getItem('name')
    const handleLogout = () => {
        // Remove the access token from Local Storage
        localStorage.clear();
        // Perform any other necessary logout actions

        window.location.reload();
    };

    return <>
        {isAuthenticated ?
            <nav className="navbar">
                <Link to="/"><img src={logo} alt="sharepic" /></Link>
                <div className="logindiv">
                    {/* <Link to={`/profil/${id}`}>{name}</Link> */}
                    <Link to="/profil" >{name}</Link>
                    <a href="" onClick={handleLogout} style={{ color: '#FF0000' }}>DÉCONNECTER</a>
                </div>
            </nav>
            : <nav className="navbar">
                <a href="/"><img src={logo} alt="sharepic" /></a>
                <div className="logindiv">
                    <Link to="/login">CONNEXION</Link>
                    <Link to="/register">INSCRIPTION</Link>
                </div>
            </nav>}
    </>
}