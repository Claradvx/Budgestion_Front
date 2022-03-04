import '../styles/Forms.css';
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect} from 'react';

const SaveBudgetForm = () => {

    const navigate = useNavigate();

    const params = useParams();
    const id_user = params.id_user;

    const createBudget = async (budget) => {
        const {data} = await axios.post("http://localhost:8090/savebudget/", budget); 
        navigate("/user/" + id_user + "/savebudget/" + data + "/participants");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const budgetForm = {};
        
        for(let i = 0; i < form.length-1 ; i++) {
            const input = form[i];
            budgetForm[input.id] = input.value;
        }
        createBudget(budgetForm);
    }

    // useEffect( () => {
     
    // }, []);

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
                    
                    <p>
                        <button type='submit'>OK</button>
                    </p>
                    </form>
                
            </div>
        </>
    )
}

export default SaveBudgetForm;