import '../styles/Forms.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { setUseProxies } from 'immer';

const UpdateParticipantsForm = () => {

    const navigate = useNavigate();

    const newparticipant = {};

    const [inputUsername, setInputUsername] =  useState([]);
    const [participants, setParticipants] =  useState([]);
    const [budget, setBudget] =  useState([]);
    const [user, setUser] =  useState([]);
    const [participant, setParticipant] =  useState([]);
    const [participantUser, setParticipantUser] = useState([]);
    
    const params = useParams(); 
    const id_budget = params.id_budget;
    const id_user = params.id_user;

    const getUser = async () => {
        const {data} = await axios.get("http://localhost:8090/user/" + id_user);
        setUser(data);
    }

    const getParticipants = async () => {
        const {data} = await axios.get("http://localhost:8090/budget/" + id_budget + "/participants");
        setParticipants(data);
        participants.map(p => 
            setInputUsername(document.getElementById(p.id).value=p.username));
    };

    const getBudget = async () => {
        const {data} = await axios.get("http://localhost:8090/budget/" + id_budget);
        setBudget(data);
    };

    const updateBudget = async (budget) => {
        const {data} = await axios.put("http://localhost:8090/updatebudget", budget); 
        getBudget(data);
    };

    const createParticipant = async (participant) => {
        const {data} = await axios.post("http://localhost:8090/saveparticipant/", participant);
        setParticipant(data);
        const p = data;
    };

    useEffect( () => {
        getUser();
        getParticipants();
        getBudget();
    }, [participants.lenght]); 


    const SaveParticipant = (e) => {
        e.preventDefault();
        const form = e.target.form;

        newparticipant["username"] = form[0].value;
        newparticipant["budget"] = budget;
        participants.push(newparticipant);
        createParticipant(newparticipant);
        
        form[0].value = '';
    }
 
    const handleSubmit = (e) => {
        e.preventDefault();
        // const form = e.target;
        // const participantForm =         {
        //     "id": null,
        //     "username": null,
        //     "budget": {}
        // };
        console.log(e);
        console.log("coucou");

    //     for(let i = 0; i < form.length-1 ; i++) {
    //         const id = form[i].id;
    //         const username = form[i].value;
    //         participantForm["id"] = id;
    //         participantForm["username"] = username;
    //         participantForm["budget"] = budget;
    //         console.log(form[i].id + form[i].value);
    //         console.log(participantForm);
    //   //      newParticipants.push(participantForm);
    //         console.log(newParticipants);
    //   //     setParticipants(newParticipants);
    //     }

        const budgetForm = {};
        budgetForm["id"] = id_budget;
        budgetForm["membersBudget"] = participants;
        updateBudget(budgetForm);

        // navigate("/budgets");
    }



    return (
        <> 
            <div className='box'>
                <form onSubmit={handleSubmit}>
                    
                    <ul>
                        <FormGroup>
                            {participants.map( p => (
                                                     <li id='participants'>
                                                    <FormControlLabel key={p.id} control={<Checkbox id={p.username}
                                                            // defaultChecked={(p.user.id === id_user) ? 
                                                            // true : false}
                                                    />} 
                        label={p.username} />
                                                     </li> 
                                                     ))}
                        </FormGroup>

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
                                    <input type='text' id='participant' />
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

export default UpdateParticipantsForm;