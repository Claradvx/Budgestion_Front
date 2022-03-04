import '../styles/Forms.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const SignInForm = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState([]);

    const validateUser = async (userLogin) => {
        const {data} = await axios.post("http://localhost:8090/signin", userLogin);
        setUser(data);
    }

    const login = (e) => {
        e.preventDefault();
        const form = e.target;

        user["username"] = form[0].value;
        user["password"] = form[1].value;
    
        validateUser(user);
        navigate("/user/" + user.id + "/budgets");
    }

    return (
        <>
            <div className='box'>
                <h2>Sign in</h2>
                <form onSubmit={login}>
                    <div className='field'>
                        <input type='text' id='email-signin' />
                        <label htmlFor='email'>Email</label>
                    </div>
                    <div className='field'>
                        <input type='password' id='pwd-signin' />
                        <label htmlFor='pwd'>Password</label>
                    </div>
                    <p>
                    <button type='submit'>OK</button>
                    {/* Si connexion est correct il faudra changer la variable isConnected en true !
                    Ce qui changera dans header vers le bouton Profile !*/}
                    </p>
                </form>
            </div>
        </>
    )
}

export const SignUpForm = () => {

    const navigate = useNavigate();

    const createUser = async (user) => {
        await axios.post("http://localhost:8090/saveuser", user);
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        const form = e.target;

        const user = {};
        user["firstname"] = form[0].value;
        user["name"] = form[1].value;
        user["username"] = form[2].value;
        user["password"] = form[3].value;

        console.log(user);
        createUser(user);
        navigate("/signin");
    };

    
    return (
        <>
            <div className = 'box'>
                <h2>Sign up</h2>
                <form onSubmit={handleRegistration}>
                    <div className = 'field'>
                        <input type = 'text' id = 'firstname' />
                        <label htmlFor = 'firstname' >Firstname</label>
                    </div>
                    <div className = 'field'>
                        <input type = 'text' id = 'lastname' />
                        <label htmlFor = 'lastname' >Lastname</label>
                    </div>
                    <div className = 'field'>
                        <input type = 'text' id = 'email-signup' />
                        <label htmlFor = 'email' >Email</label>
                    </div>
                    <div className = 'field'>
                        <input type = 'password' id = 'pwd-signup' />
                        <label htmlFor = 'pwd' >Password</label>
                    </div>
                    <p>
                        <button type = 'submit' >Register</button>
                    </p>
                </form>
            </div>
        </>
    )
}


// Form.PropTypes {

// }