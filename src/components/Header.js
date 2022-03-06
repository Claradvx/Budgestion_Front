import { useParams, useNavigate } from 'react-router-dom';
import { default as logo } from '../assets/images/Budgestion_logo_fondBleu.svg';
import { default as backArrow } from '../assets/images/BackLeftArrow.svg';
import { IsConnected } from '../store/isConnected';
import '../styles/Header.css';


const Header = () => {

    const isConnected = false;
    const navigate = useNavigate();

    const params = useParams();
    const id_user = params.id_user;


    return (
        <header>

            <div className='backdiv'>
                <img className='back' src={backArrow} alt='Back navigation' onClick={ () => navigate(-1)} />
            </div>

            <img className='logo' 
                src={logo}
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