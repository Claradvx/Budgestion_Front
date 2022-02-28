import Btn from './Btn.js';
import '../styles/Forms.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const UpdateBudgetForm = () => {

    const navigate = useNavigate();
    
    const [participants, setParticipants] =  useState([]);
    const [budget, setBudget] =  useState([]);
    const [participant, setParticipant] =  useState([]);

    const [budgetName, setBudgetName] =  useState([]);
    
    const params = useParams(); 
    const id = params.id_budget;

    const getParticipants = async () => {
        const {data} = await axios.get("http://localhost:8090/budget" + id + "/participants");
        setParticipants(data);
    };

    const getBudget = async () => {
        const {data} = await axios.get("http://localhost:8090/budget" + id);
        setBudget(data);
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

    const handleChangeinput = (e) => {
        
    }
 
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const budgetForm = {};
        console.log("coucou");
        for(let i = 0; i < form.length-1 ; i++) {
            const input = form[i];
            budgetForm[input.id] = input.value;
        }

        updateBudget(budgetForm);
        
        const participantForm = {};
        participantForm["username"] = form[2].value;
        // participantForm[form[2].id] = form[2].value; // SetUsername du participant dans la BDD
        updateParticipant(participantForm);
        
        form[0].value = '';
        form[1].value = '';
        form[2].value = ''; 
        // navigate("/budgets");
    }

    useEffect( () => {
        getParticipants();
        getBudget();
    }, []);

    return (
        <> 
            <div className='box'>
                <form onSubmit={handleSubmit}>
                
                    <div className='field'>
                        <input type='text' id='name' placeholder={budget.name} onChange={(e) => setBudgetName(e.target.value)}/>
                        <label htmlFor="name">Nom du budget</label>
                    </div>

                    <div className='field'>
                        <input type='text' id='description' placeholder={budget.description}/>
                        <label htmlFor="description">Description</label>
                    </div>

                    <div className='field'>
                        <input type='text' id='username' placeholder={budget.description}/>
                        <label htmlFor='username'>Votre pseudo sur ce budget</label>
                    </div>
                    
                    <div className='participants'>
                        <ul>
                            {participants.map( p => <li id='participants' key={p.id}>{p.username}</li> )}
                            <li>
                            <div className='addparticipant'>
                                    <input type='text' id='participant' />
                                    <button onClick={SaveParticipant}>Ajouter un participant</button>
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

export default UpdateBudgetForm;