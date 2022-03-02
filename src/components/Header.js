import { iconButtonClasses } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import Btn from './Btn.js';

const Header = () => {

    let isConnected = false;
    const navigate = useNavigate();

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
                    <Btn txt={"Sign in"} 
                        action={ () => navigate("/signin") }></Btn>
                    <Btn txt={"Sign up"} 
                        action={ () => navigate("/signup")} ></Btn>
                </div>
                :
                <div className='connection'>
                    <Btn txt={"Profile"} action={ () => navigate("/profile") } ></Btn>
                </div>
            }
             
        </header>
    )

}

export default Header;