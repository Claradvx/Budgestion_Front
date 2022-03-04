import '../styles/Forms.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const SignInForm = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState();

    const user_id = 1;

    const getUser = async (username) => {
        const {data} = await axios.get("http://localhost:8090/test/" + username);
        setUser(data);
    //    user_id = data.id;
        console.log( data);
    }




    const login = (e) => {
        e.preventDefault();
        const form = e.target;
        const signinForm = {};

        // for(let i = 0; i < 3 ; i++) {
        //     const input = form[i];
        //     signinForm["username"] = form[0].value;
        //     signinForm["password"] = form[1].value;
        // }
        console.log("coucou");
        console.log(form[0].value);
        getUser(form[0].value);
        console.log(user_id);
        
       navigate("/user/" + user_id + "/budgets")
    }

    return (
        <>
            <div className='box'>
                <h2>Sign in</h2>
                <form onSubmit={login}>
                    <div className="field">
                        <input type="text" id="email" />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="field">
                        <input type="password" id="pwd" />
                        <label htmlFor="pwd">Password</label>
                    </div>
                    <p>
                    <button type="submit">OK</button>
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
            <div className = 'box'>
                <h2>Sign up</h2>
                <form >
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
                        <button type = "submit" action = { () => navigate("/signin") }>Register</button>
                    </p>
                </form>
            </div>
        </>
    )
}


// Form.PropTypes {

// }