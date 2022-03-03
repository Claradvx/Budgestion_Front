import Btn from './Btn.js';
import '../styles/Forms.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const SignInForm = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState();

    const validateUser = async (userLogin) => {
        const {data} = await axios.post("http://localhost:8090/signin", userLogin);
        setUser(data);
    }


    const login = () => {



        navigate("/budgets")

    }

    return (
        <>
            <div className="box">
                <h2>Sign in</h2>
                <form onSubmit={login}>
                    <div className="field">
                        <input type="text" id="email-signin" />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="field">
                        <input type="password" id="pwd-signin" />
                        <label htmlFor="pwd">Password</label>
                    </div>
                    <p>
                    <Btn txt="OK" type="submit"></Btn>
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

    return (
        <>
            <div className = "box">
                <h2>Sign up</h2>
                <form >
                    <div className = "field">
                        <input type = "text" id = "firstname" />
                        <label htmlFor = "firstname" >Firstname</label>
                    </div>
                    <div className = "field">
                        <input type = "text" id = "lastname" />
                        <label htmlFor = "lastname" >Lastname</label>
                    </div>
                    <div className = "field">
                        <input type = "text" id = "email-signup" />
                        <label htmlFor = "email" >Email</label>
                    </div>
                    <div className = "field">
                        <input type = "password" id = "pwd-signup" />
                        <label htmlFor = "pwd" >Password</label>
                    </div>
                    <p>
                        <Btn txt = "Register" type = "submit" action = { () => navigate("/signin") }></Btn>
                    </p>
                </form>
            </div>
        </>
    )
}


// Form.PropTypes {

// }