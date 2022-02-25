import Btn from './Btn.js';
import '../styles/Forms.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
//import propTypes from 'prop-types';

export const SignInForm = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className = "box">
                <h2>Sign in</h2>
                <form>
                    <div className = "field">
                        <input type = "text" id = "email-signin" />
                        <label htmlFor = "email" > Email </label>
                    </div>
                    <div className = "field">
                        <input type = "password" id = "pwd-signin" />
                        <label htmlFor = "pwd" > Password </label>
                    </div>
                    <p>
                    <Btn txt = "OK" type = "submit" action = { () => navigate("/budgets") }></Btn>
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
                <form>
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

export const BudgetForm = () => {

    const navigate = useNavigate();

    const url = "http://localhost:8090/budget";
    const savebudget_url = "http://localhost:8090/savebudget";
    
    const [participants, setParticipant] =  useState([]);
    const [budget, setBudget] =  useState([]);
    
    const params = useParams(); // Récupère un objet avec les paramètres
    const id = params.id_budget; // ou const {id} = useParams(); récupérant la données id de useParams

    const getParticipant = async () => {
        const {data} = await axios.get(url + id + "/participants");
        setParticipant(data);
    }

    const getBudget = async () => {
        const {data} = await axios.get(url);
        setBudget(data);
    };

    useEffect( () => {
        getParticipant();
        getBudget();
    }, [] );


    /*Pour le bouton + : 
    * fonction qui crée un participant 
    l'actualisation se fera automatiquement avec le useEffect 
    */

    const createBudget = (budget) => {
        const {data} = axios.post(savebudget_url, budget); // postera dans api-url l'objet user
        getBudget(); // relance la requete pour afficher les users 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form[0]
        const description = form[1];
        const budget = {name, description};
        createBudget(budget);
        form[0].value = '';
        form[1].value = '';
    }

    return (
        <>
            <div className = "box">
                <form  >

                    <div className = "field">
                        <input type = "text" id = "name" />
                        <label htmlFor = "name" > Nom du budget </label>
                    </div>

                    <div className = "field">
                        <input type = "text" id = "description" />
                        <label htmlFor = "description" > Description </label>
                    </div>

                    <div className = "field">
                        <input type = "text" id = "username" />
                        <label htmlFor = "username" > Votre pseudo sur ce budget </label>
                    </div>
                    
                    <div className = "participants" >
                        <ul>
                            {participants.map( p => <li>{p.username}</li> )}
                            <li>
                                <div className = "addparticipant">
                                    <input type = "text" id = "participant" />
                                    <button  > + </button> {/* a ajouter onClick = {} */}
                                </div>
                            </li>
                        </ul>
                        
                    </div>                        

                    <p>
                    <Btn txt = "OK" type = "submit" action = { () => navigate("/budgets") }></Btn>
                    </p>

                </form>
            </div>
        </>
    )
}



// Form.PropTypes {

// }