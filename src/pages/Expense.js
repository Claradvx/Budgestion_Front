import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Btn from '../components/Btn';
import ShowExpenseForm from '../components/ShowExpense';

const Expense = () => {

    const navigate = useNavigate();

    const [expense, setExpense] =  useState([]);

    const params = useParams(); // Récupère un objet avec les paramètres
    const id_budget = params.id_budget;
    const id_expense = params.id_expense;

    const getExpense = async () => {
        const {data} = await axios.get("http://localhost:8090/expense" + id_expense);
        setExpense(data);
    };

    const deleteExpense = async () => {
        const{data} = await axios.delete("http://localhost:8090/deleteexpense" + id_expense);
    }

    useEffect( () => {
        getExpense();
    }, [] );

    return (
        <>
            <h1>La dépense : "{expense.name}" </h1>


            <ShowExpenseForm />


            <div className='footer' >
                <Btn txt="Modifier la dépense" action={ () => navigate("/budget" + id_budget + "saveexpense" + id_expense) } />
                <Btn txt="Supprimer la dépense" action={ () =>  {
                                                                 deleteExpense(); 
                                                                 navigate("/budget"+ id_budget +"/expenses") }} />
            </div>
        
        </>

    )
}

export default Expense;