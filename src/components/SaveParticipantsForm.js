import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Forms.css';

const SaveParticipantsForm = () => {
    
    const navigate = useNavigate();

    // const [inputUsername, setInputUsername] =  useState("");
    const [participants, setParticipants] =  useState([]);
    const [budget, setBudget] =  useState([]);
    
    const params = useParams(); 
    const id_budget = params.id_budget;
    const id_user = params.id_user;

    useEffect( () => {
        getParticipants();
        getBudget();
    }, []); 

    useEffect( () => {
        getParticipants();
    }, [participants.lenght]); 

    const getParticipants = async () => {
        const {data} = await axios.get("http://localhost:8090/budget/" + id_budget + "/participants");
        setParticipants(data);
        // participants.map(p => {
        //     setInputUsername(document.getElementById(p.id).value=p.username)});
    };

    const getBudget = async () => {
        const {data} = await axios.get("http://localhost:8090/budget/" + id_budget);
        setBudget(data);
    };

    const updateBudget = async (budget) => {
        const {data} = await axios.put("http://localhost:8090/updatebudget", budget); 
        getBudget(data);
    };

    const updateParticipant = async (participantForm) => {
        const {data} = await axios.put("http://localhost:8090/updateparticipant", participantForm);
    };

    const createParticipant = async (participant) => {
        const {data} = await axios.post("http://localhost:8090/saveparticipant/", participant);
        setParticipants(participants);
    };



    const SaveParticipant = (e) => {
        e.preventDefault();
        const form = e.target.form;
        const newparticipant = {};

        newparticipant["username"] = form[0].value;
        newparticipant["budget"] = budget;
        participants.push(newparticipant);
        createParticipant(newparticipant);
        getParticipants();
        
        form[0].value = '';
    }
 
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const participantForm =         {
            "id": null,
            "username": null,
            "budget": {}
        };

        for(let i = 0; i < form.length-1 ; i++) {
            participantForm["id"] = form[i].id;
            participantForm["username"] = form[i].value;
            participantForm["budget"] = budget;
            console.log(form[i].id + form[i].value);
            console.log(participantForm);
            updateParticipant(participantForm);
        }

        const budgetForm = {};
        budgetForm["id"] = id_budget;
        budgetForm["membersBudget"] = participants;
        updateBudget(budgetForm)
        .then(() => navigate("/user/" + id_user + "/budgets"));
    }

    return (
        <> 
            <div className='box'>
                <form onSubmit={handleSubmit}>
                    
                    <ul>
                            {participants.map( p => (
                                                     <li className='participants' key={p.id}>
                                                         {p.username}
                                                         {/* <input type='text' id={p.id}/> */}
                                                     </li>
                                                     ))}
                        </ul>                      

                    <p>
                    <button type='submit'>OK</button>
                    </p>

                </form>
            </div>


            <div className='box'>
                <form onSubmit={handleSubmit}>
                    
                    <div className='field'>
                    <ul>         
                            <li id='participants'>
                            <div className='addparticipant'>
                                    <input type='text' />
                                    <button onClick={SaveParticipant}>Ajouter un participant</button>
                            </div>
                            </li>
                        </ul>
                        
                    </div>                        

                </form>
            </div>
        </>
    )

}

export default SaveParticipantsForm;