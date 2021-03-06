import '../styles/Forms.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const SignInForm = () => {

    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [user, setUser] = useState([]);

    let id_user;
    const validateUser = async (userLogin) => {
        try {
            const {data} = await axios.post("http://localhost:8090/signin", userLogin);
            id_user =  data.id;
            setUser(data);
        } catch (error) {
            setError("Votre nom d'utilisateur / mot de passe est incorrect");
        }
    }

    const login = (e) => {
        e.preventDefault();
        const form = e.target;

        const userForm = {};
        userForm["username"] = form[0].value;
        userForm["password"] = form[1].value;
        
        validateUser(userForm)
        .then(() => {
            console.log(user);
        if (id_user){
        navigate("/user/" + id_user + "/budgets")
        } else {
                setError("Votre nom d'utilisateur / mot de passe est incorrect");
    
        }});
    }

    useEffect( () => {
        setUser();
    }, [user] );
    
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
                    { (error != "") ?
                        (<p className ="error" >{error}</p>) : ""
                    }
                    <p>
                    <button type='submit'>OK</button>

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