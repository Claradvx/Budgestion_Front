import '../styles/Forms.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const UpdateProfileForm = () => {

    const navigate = useNavigate();

    const params = useParams();
    const id_user = params.id_user;

    const [user, setUser] = useState([]);

    const [inputFirstname, setInputFirstname] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputAge, setInputAge] = useState(0);


    const getUser = async () => {
        const {data} = await axios.get("http://localhost:8090/user/" + id_user);
        setUser(data);

        setInputFirstname(document.getElementById('firstname').value=data.firstname);
        setInputName(document.getElementById('name').value=data.name);
        setInputEmail(document.getElementById('username').value=data.username);
        setInputPassword(document.getElementById('password').value=data.password);
        setInputAge(document.getElementById('age').value=data.age);

    }

    const updateUser = async (userForm) => {
        const {data} = await axios.put("http://localhost:8090/updateuser", userForm);
        setUser(data);
    }

 
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const userForm = {};

        userForm["id"] = id_user;
        userForm["firstname"] = form[0].value;
        userForm["name"] = form[1].value;
        userForm["username"] = form[2].value;
        userForm["password"] = form[3].value;
        userForm["age"] = form[4].value;
        console.log(userForm);

        updateUser(userForm);

        navigate("/user/" + id_user + "/budgets");
    }

    useEffect( () => {
        getUser();
    }, []); 


    return (
        <> 
            <div className='box'>
                <form onSubmit={handleSubmit}>
                
                    <div className='field'>
                        <input type='text' id='firstname' />
                        <label htmlFor="firstname">Prénom</label>
                    </div>

                    <div className='field'>
                        <input type='text' id='name' />
                        <label htmlFor="name">Nom</label>
                    </div>

                    <div className='field'>
                        <input type='text' id='username'/>
                        <label htmlFor="username">E-mail</label>
                    </div>

                    <div className='field'>
                        <input type='text' id='password'/>
                        <label htmlFor='password'>Mot de passe</label>
                    </div>  

                    <div className='field'>
                        <input type='text' id='age'/>
                        <label htmlFor='age'>Âge</label>
                    </div> 

                    <p>
                    <button type='submit'>Valider les modifications</button>
                    </p>
                </form>
            </div>
        </>
    )
}

export default UpdateProfileForm;