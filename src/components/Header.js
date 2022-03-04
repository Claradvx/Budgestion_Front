<<<<<<< HEAD
import { useNavigate, useParams } from 'react-router-dom';
=======
import { useParams, useNavigate } from 'react-router-dom';
>>>>>>> 70aa0a6f3226e25f0efd94783d764bf6b38e5ea3
import '../styles/Header.css';

const Header = () => {

    let isConnected = false;
    const navigate = useNavigate();

<<<<<<< HEAD
    const params = useParams(); 
=======
    const params = useParams();
>>>>>>> 70aa0a6f3226e25f0efd94783d764bf6b38e5ea3
    const id_user = params.id_user;

    return (
        <header>

            <div className='backdiv'>
                <img className='back' src='images/BackLeftArrow.svg' alt='Back navigation' onClick={ () => navigate(-1)} />
            </div>

            <img className='logo' 
                src='images/Budgestion_logo_fondBleu.svg' 
                alt='Budgestion' 
                onClick={ () => navigate("/") } />

            {(!isConnected) ? 
                <div className='connection'>
                    <button onClick={ () => navigate("/signin") } >Sign in</button>
                    <button onClick={ () => navigate("/signup") } >Sign up</button>
                </div>
                :
                <div className='connection'>
                    <button onClick={ () => navigate("/user/" + id_user + "/profile") } >Profile</button>
                </div>
            }
             
        </header>
    )

}

export default Header;