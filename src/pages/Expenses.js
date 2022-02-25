import '../styles/Expenses.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ExpenseCard } from '../components/Card';
import Btn from '../components/Btn';

const Expenses = () => {

    const navigate = useNavigate();

    const expenses_url = "http://localhost:8090/budget";
    
    const [expenses, setExpense] =  useState([]);
    const params = useParams(); // Récupère un objet avec les paramètres
    const id = params.id_budget; // ou const {id} = useParams(); récupérant la données id de useParams

    const [budget, setBudget] = useState([]);


    const getExpense = async () => {
        const {data} = await axios.get(expenses_url + id + "/expenses");
        setExpense(data);
    };

    const getBudget = async () => {
        const {data} = await axios.get(expenses_url + id);
        setBudget(data);
    };


    useEffect( () => {
        getExpense();
        getBudget();
    }, [] );


    return (
        <>
            <h1>Les dépenses du budget {budget.name}</h1>
            <div className='grid-expense'>
                <div className='add'
                    onClick={ () => navigate("/budget" + id + "/saveexpense0" ) }>
                    <ExpenseCard key="plus" name = "+" description = "" />
                </div>
                
                {expenses.map(e => (
                                    <div onClick={ () => navigate("/budget" + id + "/expense" + e.id) }>
                                        <ExpenseCard key={e.id} 
                                                name={e.name}
                                                description={e.description} 
                                                />
                                    </div>
                                )
                            )
                } 
            
            </div>


            <div className='footer' >
                <Btn txt="Modifier le budget" action={ () => navigate("/savebudgets" + id) } />
                <Btn txt="Supprimer le budget" /> {/* acction = fonction de suppression du budget */}
            </div>

        </>
    )
}

export default Expenses;