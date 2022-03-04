import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UpdateExpenseForm from '../components/UpdateExpenseForm';
import '../styles/Forms.css';

const UpdateExpense = () => {

    const [expense, setExpense] =  useState([]);
    
    const params = useParams();
    const id_expense = params.id_expense;

    const getExpense = async () => {
        const {data} = await axios.get("http://localhost:8090/expense/" + id_expense);
        setExpense(data);
    };

    useEffect( () => {
        getExpense();  
    }, []);

    return (
        <>
            <h1>Modification de la dépense "{expense.name}"</h1>

            <p>Veuillez modifier les informations souhaitées</p>

            <UpdateExpenseForm />
        </>
    )
}

export default UpdateExpense;