import { useLocation } from "react-router-dom";

const NotFound = () => {

    const location = useLocation(); // hook de react-router-dom qui retourne un objet location
    console.log(location)

    return (
        <div>
            <h1>Oupsi ! </h1>
            <h2>R U Lost ?</h2>
            <img alt = "404 : page not found" src = "https://img.buzzfeed.com/buzzfeed-static/static/2016-02/1/11/enhanced/webdr07/anigif_enhanced-21255-1454345675-2.gif" />
            <p> Le chemin <i>{location.pathname}</i> n'existe pas !</p>
            {/* Possibilité de code un algo proposant le chemin le plus proche ou que l'utilisateur cherchait*/}
        </div>
    )
}

export default NotFound;