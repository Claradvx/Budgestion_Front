import Btn from './Btn.js';
import '../styles/Forms.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const UpdateBudgetForm = () => {

    const navigate = useNavigate();

    const [inputName, setInputName] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [inputUser, setInputUser] = useState("");
    
    const [participants, setParticipants] =  useState([]);
    const [budget, setBudget] =  useState([]);
    const [participant, setParticipant] =  useState([]);

    const [budgetName, setBudgetName] =  useState([]);
    
    const params = useParams(); 
    const id_budget = params.id_budget;

    const getParticipants = async () => {
        const {data} = await axios.get("http://localhost:8090/budget" + id_budget + "/participants");
        setParticipants(data);
    };

    const getBudget = async () => {
        const {data} = await axios.get("http://localhost:8090/budget" + id_budget);
        setBudget(data);
        setInputName(document.getElementById('name').value=data.name);
        setInputDescription(document.getElementById('description').value=data.description);
        setInputUser(document.getElementById("username").value='En attente de la gestion des users');
    };

    
    const updateParticipant = async (budget) => {
        const {data} = await axios.put("http://localhost:8090/updateparticipant", budget); 
    
    };
    const updateBudget = async (budget) => {
        const {data} = await axios.put("http://localhost:8090/updatebudget", budget); 
        getBudget(data);
    };

    // const getParticipant = async () => {
    //         const {data} = await axios.get(saveparticipant_url);
    //         setParticipant(data);
    // };

    const createParticipant = (participant) => {
        axios.post("http://localhost:8090/saveparticipant", participant);
    };


    /*Pour le bouton + : 
    * fonction qui crée un participant 
    l'actualisation se fera automatiquement avec le useEffect 
    */
    const SaveParticipant = (e) => {
        
        const newparticipant = {};
        newparticipant["username"] = document.getElementById("participant").value;
        newparticipant["budget"] = budget;
        createParticipant(newparticipant);
    }

    const validateUpdateBudget = (e) => {
        e.preventDefault();
        const form = e.target;
        const budgetForm = {};
        console.log("coucou");
        console.log(form[0].id + form[0].value);
        console.log(form[1].id + form[1].value);
        budgetForm["id"] = id_budget;
        budgetForm["name"] = form[0].value;
        budgetForm["description"] = form[1].value;
        budgetForm["membersBudget"] = participants;

        updateBudget(budgetForm);
        
        form[0].value = '';
        form[1].value = '';
        form[2].value = ''; 
    }
 
    const handleSubmit = (e) => {
        validateUpdateBudget(e);
        navigate("/budgets");
    }

    useEffect( () => {
        getParticipants();
        getBudget();
        setInputName();
        setInputDescription();
    }, []); 


    return (
        <> 
            <div className='box'>
                <form onSubmit={handleSubmit}>
                
                    <div className='field'>
                        <input type='text' id='name' />
                        <label htmlFor="name">Nom du budget</label>
                    </div>

                    <div className='field'>
                        <input type='text' id='description'/>
                        <label htmlFor="description">Description</label>
                    </div>

                    <div className='field'>
                        <input type='text' id='username'/>
                        <label htmlFor='username'>Votre pseudo sur ce budget</label>
                    </div>
                    
                                           

                    <p>
                    <Btn txt='Valider les modifications' type='submit'></Btn>
                    </p>
                    <button classeName='button' onClick={ () => {
                        navigate("/updatebudget" + id_budget + "/participants" )} }>Accéder à la modifications des participants</button>
                </form>


            </div>
        </>
    )
}

export default UpdateBudgetForm;