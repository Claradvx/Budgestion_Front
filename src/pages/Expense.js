import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExpenseFooter } from '../components/Footer';
import ShowExpense from '../components/ShowExpense';

const Expense = () => {

    const [expense, setExpense] =  useState([]);

    const params = useParams(); // Récupère un objet avec les paramètres
    const id_budget = params.id_budget;
    const id_expense = params.id_expense;

    const getExpense = async () => {
        const {data} = await axios.get("http://localhost:8090/expense/" + id_expense);
        setExpense(data);
    };

    const deleteExpense = async () => {
        const{data} = await axios.delete("http://localhost:8090/deleteexpense/" + id_expense);
        getExpense();
    }

    useEffect( () => {
        getExpense();
    }, [] );

    return (
        <>
            <h1>La dépense : "{expense.name}" </h1>

            <ShowExpense />

            <ExpenseFooter idBudget={id_budget} idExpense={id_expense} deleteAction={deleteExpense} />
        
        </>

    )
}

export default Expense;