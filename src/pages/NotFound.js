import { useLocation, useNavigate } from "react-router-dom";


const NotFound = () => {

    const navigate = useNavigate();

    const location = useLocation(); // hook de react-router-dom qui retourne un objet location

    return (
        <div>
            <h1>Oupsi ! </h1>
            <h2>R U Lost ?</h2>
            <img src = 'images/Budgestion_slogan_fondBlanc.png' 
                alt = 'Budgestion' 
                onClick = { () => navigate("/") } />
            <p> Le chemin <i>{location.pathname}</i> n'existe pas !</p>
            {/* Possibilité de code un algo proposant le chemin le plus proche ou que l'utilisateur cherchait*/}
        </div>
    )
}

export default NotFound;