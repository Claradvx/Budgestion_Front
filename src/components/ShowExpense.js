import '../styles/Forms.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ShowExpenseForm = () => {

    const navigate = useNavigate();

    const params = useParams(); 
    const id_budget = params.id_budget; 
    const id_expense = params.id_expense;

    const [participants, setParticipants] =  useState([[]]);
    const [expense, setExpense] =  useState(
        {
            "id": null,
            "name": null,
            "description": null,
            "montant": null,
            "payeur": {},
            "beneficiaires": []
        }
    );

    const [budget, setBudget] =  useState([]);

    const getParticipants = async () => {
        const {data} = await axios.get("http://localhost:8090/budget" + id_budget + "/participants");
        setParticipants(data);
    };

    const getBudget = async () => {
        const {data} = await axios.get("http://localhost:8090/budget" + id_budget);
        setBudget(data);
    };

    const getExpense = async () => {
        const {data} = await axios.get("http://localhost:8090/expense" + id_expense); 
        setExpense(data);
    };


    useEffect( () => {
        getExpense();
        getBudget();
    }, []);

    return (
        <> 
            <div className='showbox'>
                <form>

                    <div className='field'>
                        <label htmlFor="description">Description</label>
                        <p className='data'>{expense.description}</p>
                    </div>

                    <div className='field'>
                        <label htmlFor='montant'>Montant</label>
                        <p className='data'>{expense.montant} €</p>
                    </div>
                    
                    <div className='field'>
                        <label htmlFor='montant'>Participant ayant payé la dépense</label>
                        <p className='data'>{expense.payeur.username}</p>
                    </div>
                    
                    <div>
                    <label className='participants' htmlFor='payeur'>Participant(s) concerné(s) par la dépense</label> 
                        <ul>
                            {expense.beneficiaires.map( b => (
                                                     <li id='participants' key={b.id}>{b.username}</li> 
                                                     ))}
                        </ul>    
                    </div>                   
                </form>
            </div>
        </>
    )
}

export default ShowExpenseForm;