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
            <div className="box">
                <h2>Sign in</h2>
                <form>
                    <div className="field">
                        <input type="text" id="email-signin" />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="field">
                        <input type="password" id="pwd-signin" />
                        <label htmlFor="pwd">Password</label>
                    </div>
                    <p>
                    <Btn txt="OK" type="submit" action={ () => navigate("/budgets") }></Btn>
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
    const saveparticipant_url = "http://localhost:8090/saveparticipant";
    const budgetMax_url = "http://localhost:8090/budgetmax";
    
    const [participants, setParticipants] =  useState([]);
    const [budget, setBudget] =  useState([]);
    const [participant, setParticipant] =  useState([]);
    const [budgetMax, setBudgetMax] =  useState([]);
    
    const params = useParams(); // Récupère un objet avec les paramètres
    const id = params.id_budget; // ou const {id} = useParams(); récupérant la données id de useParams

    const getParticipants = async () => {
        const {data} = await axios.get(url + id + "/participants");
        setParticipants(data);
    }

    const getBudget = async () => {
        const {data} = await axios.get(url + id);
        setBudget(data);
    };

    const getParticipant = async () => {
        const {data} = await axios.get(saveparticipant_url);
        setParticipant(data);
    }

    const getBudgetMax = async () => {
        const {data} = await axios.get(budgetMax_url);
        setBudgetMax(data);
        createParticipant
    };

    /*Pour le bouton + : 
    * fonction qui crée un participant 
    l'actualisation se fera automatiquement avec le useEffect 
    */

    const createBudget = async (budget) => {
        const {data} = await axios.post(savebudget_url, budget); 
        getBudget(data); // relance la requete pour afficher les users 
    };

    const createParticipant = (participant) => {
            axios.post(saveparticipant_url, participant)
                .then(getParticipant());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const budgetForm = {};
        
        for(let i = 0; i < form.length-1 ; i++) {
            const input = form[i];
            budgetForm[input.id] = input.value;
        }
        
        
        createBudget(budgetForm);
        const participantForm = {};
        
        participantForm[form[2].id] = form[2].value; // SetUsername du participant dans la BDD
        console.log(budgetMax);
        getBudgetMax();
        participantForm["budget"] = budgetMax;
        console.log(participantForm);
        createParticipant(participantForm)
        
        form[0].value = '';
        form[1].value = '';
        form[2].value = '';

        
        navigate("/budgets");
    }

    

    useEffect( () => {
        getParticipants();
        getBudget();
    }, [] );

    return (
        <> 
            <div className='box'>
                <form onSubmit={handleSubmit}>

                    <div className='field'>
                        <input type='text' id='name' />
                        <label htmlFor="name">Nom du budget</label>
                    </div>

                    <div className='field'>
                        <input type='text' id='description' />
                        <label htmlFor="description">Description</label>
                    </div>

                    <div className='field'>
                        <input type='text' id='username' />
                        <label htmlFor='username'>Votre pseudo sur ce budget</label>
                    </div>
                    
                    <div className='participants'>
                        <ul>
                            {participants.map( p => <li>{p.username}</li> )}
                            <li>
                                <div className='addparticipant'>
                                    <input type='text' id='participant' />
                                    <button>+</button> {/* a ajouter onClick = {} */}
                                </div>
                            </li>
                        </ul>
                        
                    </div>                        

                    <p>
                    <Btn txt='OK' type='submit'></Btn>
                    </p>

                </form>
            </div>
        </>
    )
}



// Form.PropTypes {

// }