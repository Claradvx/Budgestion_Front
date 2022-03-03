import Btn from './Btn.js';
import '../styles/Forms.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const UpdateParticipantsForm = () => {

    const navigate = useNavigate();

    let newparticipant = {};
    const [newParticipants, setNewParticipants] =  useState([]);

    const [inputUsername, setInputUsername] =  useState([]);
    
    const [participants, setParticipants] =  useState([]);
    const [budget, setBudget] =  useState([]);
    const [participant, setParticipant] =  useState([]);
    
    const params = useParams(); 
    const id_budget = params.id_budget;

    const getParticipants = async () => {
        const {data} = await axios.get("http://localhost:8090/budget" + id_budget + "/participants");
        setParticipants(data);
        data.map(p => 
        setInputUsername(document.getElementById(p.id).value=p.username)
        );
        
    };

    const getBudget = async () => {
        const {data} = await axios.get("http://localhost:8090/budget" + id_budget);
        setBudget(data);
    };

    const updateBudget = async (budget) => {
        const {data} = await axios.put("http://localhost:8090/updatebudget", budget); 
        getBudget(data);
    };

    const createParticipant = async (participant) => {
        const {data} = axios.post("http://localhost:8090/saveparticipant", participant);
        setParticipant(data);
        participants.push(data);
        console.log("data : " + data);
        console.log("save participant");
        console.log("p" , participants);
    };


    const SaveParticipant = (e) => {
        e.preventDefault();
        console.log(e);
        const form = e.target.form;
        
        console.log(form);
        console.log("input : " + form[0].value);
        newparticipant["username"] = form[0].value;
        newparticipant["budget"] = budget;
        setParticipant(newparticipant);
        createParticipant(newparticipant);
        e.target.value = '';
    }
 
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const participantForm = {};
        
        console.log("coucou");
        console.log(form[0].id + form[0].value);
        console.log(form[1].id + form[1].value);

        for(let i = 0; i < form.length-1 ; i++) {
            participantForm["id"] = form[0].id;
            participantForm["username"] = form[0].value;
            newParticipants.push(participantForm);
        setParticipant(newParticipants);
        }

        const budgetForm = {};
        budgetForm["id"] = id_budget;
        budgetForm["membersBudget"] = newParticipants;
        
        updateBudget(budgetForm);

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
                        <ul>
                            {participants.map( p => 
                            <li id='participants' key={p.id}>
                                <input type='text' id={p.id}/>
                            </li> )}
                            <li id='participants'>
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

export default UpdateParticipantsForm;