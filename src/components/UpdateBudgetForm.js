import '../styles/Forms.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const UpdateBudgetForm = () => {

    const navigate = useNavigate();

    const params = useParams(); 
    const id_budget = params.id_budget;
    const id_user = params.id_user;

    const [inputName, setInputName] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [inputParticipantUser, setInputParticipantUser] = useState("");
    
    const [user, setUser] =  useState([]);
    const [participants, setParticipants] =  useState([]);
    const [budget, setBudget] =  useState([]);
    const [participantUser, setParticipantUser] = useState([]);


    const getUser = async () => {
        const {data} = await axios.get("http://localhost:8090/user/" + id_user);
        setUser(data);
    }

    const getParticipants = async () => {
        const {data} = await axios.get("http://localhost:8090/budget/" + id_budget + "/participants");
        setParticipants(data);
    };

    const getParticipantUser = async () => {
        const {data} = await axios.get("http://localhost:8090/user/" + id_user + "/budget/" + id_budget + "/participant");
        setParticipantUser(data);
        setInputParticipantUser(document.getElementById("username").value=data.username);
    };

    const updateParticipantUser = async (participantUserForm) => {
        const {data} = await axios.put("http://localhost:8090/updateparticipant", participantUserForm);
    };

    const getBudget = async () => {
        const {data} = await axios.get("http://localhost:8090/budget/" + id_budget);
        setBudget(data);
        setInputName(document.getElementById('name').value=data.name);
        setInputDescription(document.getElementById('description').value=data.description);
    };

    const updateBudget = async (budget) => {
        const {data} = await axios.put("http://localhost:8090/updatebudget", budget); 
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();
        const submitterButton = e.nativeEvent.submitter.id;
        const form = e.target;
        const budgetForm = {};

        const participantUserForm = {};

        participantUserForm["id"] = participantUser.id;
        participantUserForm["username"] = form[2].value;
        participantUserForm["budget"] = participantUser.budget;
        participantUserForm["user"] = participantUser.user;
        updateParticipantUser(participantUserForm);

        budgetForm["id"] = id_budget;
        budgetForm["name"] = form[0].value;
        budgetForm["description"] = form[1].value;
        budgetForm["membersBudget"] = participants;

        updateBudget(budgetForm);
        
        form[0].value = '';
        form[1].value = '';
        form[2].value = ''; 

        if (submitterButton === "modifBudget") {
            navigate("/user/" + id_user + "/budgets");
        } else {
            navigate("/user/" + id_user + "/updatebudget/" + id_budget + "/participants" )
        }
    }

    useEffect( () => {
        getBudget();
        getParticipants();
        getParticipantUser();
        setInputName();
        setInputDescription();
        setInputParticipantUser();
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
                    <button id='modifBudget' type='submit'>
                        Valider les modifications
                    </button>
                    </p>

                    <button id='modifParticiant'>
                        Accéder à la modifications des participants
                    </button>
                </form>
            </div>
        </>
    )
}

export default UpdateBudgetForm;