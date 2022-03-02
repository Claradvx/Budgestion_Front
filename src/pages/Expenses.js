import '../styles/Expenses.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ExpenseCard } from '../components/Card';
import { BudgetFooter } from '../components/Footer';

const Expenses = () => {

    const navigate = useNavigate();

    const [expenses, setExpense] =  useState([]);
    const params = useParams(); // Récupère un objet avec les paramètres
    const id_budget = params.id_budget; // ou const {id} = useParams(); récupérant la données id de useParams

    const [budget, setBudget] = useState([]);


    const getExpense = async () => {
        const {data} = await axios.get("http://localhost:8090/budget" +  id_budget + "/expenses");
        setExpense(data);
    };

    const getBudget = async () => {
        const {data} = await axios.get("http://localhost:8090/budget" + id_budget);
        setBudget(data);
    };

    const deleteBudget = async () => {
        const{data} = await axios.delete("http://localhost:8090/deletebudget" + id_budget);
    }

    // Pas d'actualisation de la page MyBudgets après suppression d'un budget 
    useEffect( () => {
        getExpense();
        getBudget();
    }, [] );

 
    return (
        <>
            <h1>Les dépenses du budget "{budget.name}"</h1>

            <div className='scale'>
                <button onClick={ () => navigate("/budget" + id_budget + "/scale") }>Balance du budget</button>
            </div>
            
            <div className='grid-expense'>
                <div className='add'
                    onClick={ () => navigate("/budget" + id_budget + "/saveexpense" ) }>
                    <ExpenseCard key="plus" name = "+" description = "" />
                </div>
                
                {expenses.map(e => (
                                    <div onClick={ () => navigate("/budget" + id_budget + "/expense" + e.id) }>
                                        <ExpenseCard key={e.id} 
                                                name={e.name}
                                                description={e.description} 
                                                />
                                    </div>
                                )
                            )
                } 
            
            </div>

            <BudgetFooter idBudget={id_budget} deleteAction={deleteBudget} />

        </>
    )
}

export default Expenses;