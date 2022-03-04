import '../styles/Forms.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ContentCutOutlined } from '@mui/icons-material';

const UpdateParticipantsForm = () => {

    const navigate = useNavigate();

    const newparticipant = {};

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
        participants.map(p => 
            setInputUsername(document.getElementById(p.id).value=p.username));
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
        const {data} = await axios.post("http://localhost:8090/saveparticipant", participant);
        setParticipant(data);
        const p = data;
    };

    useEffect( () => {
        getParticipants();
        getBudget();
    }, [participants.lenght]); 


    const SaveParticipant = (e) => {
        e.preventDefault();
        console.log(e);
        const form = e.target.form;
        
        console.log(form);
        console.log("input : " + form[form.length-3].value);
        newparticipant["username"] = form[form.length-3].value;
        newparticipant["budget"] = budget;
    //    setParticipant(newparticipant);
        createParticipant(newparticipant);
        
        e.target.value = '';
    }
 
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const participantForm =         {
            "id": null,
            "username": null,
            "budget": {}
        };
        console.log(e);
        console.log("coucou");

        for(let i = 0; i < form.length-1 ; i++) {
            const id = form[i].id;
            const username = form[i].value;
            participantForm["id"] = id;
            participantForm["username"] = username;
            participantForm["budget"] = budget;
            console.log(form[i].id + form[i].value);
            console.log(participantForm);
      //      newParticipants.push(participantForm);
            console.log(newParticipants);
      //     setParticipants(newParticipants);
        }

        const budgetForm = {};
        budgetForm["id"] = id_budget;
        budgetForm["membersBudget"] = newParticipants;
        console.log(newParticipants);
        updateBudget(budgetForm);

        // navigate("/budgets");
    }



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
                    <button type='submit'>OK</button>
                    </p>

                </form>
            </div>
        </>
    )
}

export default UpdateParticipantsForm;