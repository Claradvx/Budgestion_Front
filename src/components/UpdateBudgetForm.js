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

    const updateBudget = async (budget) => {
        const {data} = await axios.put("http://localhost:8090/updatebudget", budget); 
        getBudget(data);
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const submitterButton = e.nativeEvent.submitter.id;
        console.log(submitterButton);
        const budgetForm = {};

        budgetForm["id"] = id_budget;
        budgetForm["name"] = form[0].value;
        budgetForm["description"] = form[1].value;
        budgetForm["membersBudget"] = participants;

        updateBudget(budgetForm);
        
        form[0].value = '';
        form[1].value = '';
        form[2].value = ''; 

        if (submitterButton === "modifBudget") {
            navigate("/budgets");
        } else {
            navigate("/updatebudget" + id_budget + "/participants" )
        }
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
                    <button id='modifBudget' 
                            type='submit'>
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