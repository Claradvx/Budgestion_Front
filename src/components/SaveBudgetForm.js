import '../styles/Forms.css';
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState} from 'react';

const SaveBudgetForm = () => {

    const navigate = useNavigate();

    const params = useParams();
    const id_user = params.id_user;

    const [user, setUser] =  useState([]); 
    const [budget, setBudget] =  useState([]);

    let username = "";

    const getUser = async () => {
        const {data} = await axios.get("http://localhost:8090/user/" + id_user);
        setUser(data);
    }

    const createBudget = async (budgetForm) => {
        const {data} = await axios.post("http://localhost:8090/savebudget", budgetForm); 
        setBudget(data);
        const participantForm = {};
        participantForm["username"] = username;
        participantForm["user"] = user;
        participantForm["budget"] = data;
        createParticipantUser(participantForm);
    };

    const createParticipantUser = async (participantForm) => {
        const {data} = await axios.post("http://localhost:8090/saveparticipant", participantForm);
        navigate("/user/" + id_user + "/savebudget/" + data.budget.id + "/participants");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        username = form[2].value;

        const budgetForm = {};

        budgetForm["name"] = form[0].value;
        budgetForm["description"] = form[1].value;

        console.log("budget form : ", budgetForm);
        createBudget(budgetForm);
    }

    useEffect( () => {
        getUser();
        // getBudget();
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
                        <input type='text' id='description' />
                        <label htmlFor="description">Description</label>
                    </div>

                    <div className='field'>
                        <input type='text' id='username'/>
                        <label htmlFor='username'>Votre pseudo sur ce budget</label>
                    </div>
                    
                    <p>
                        <button type='submit'>OK</button>
                    </p>
                    </form>
                
            </div>
        </>
    )
}

export default SaveBudgetForm;