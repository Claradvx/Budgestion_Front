import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SaveExpenseForm from '../components/SaveExpenseForm';
import '../styles/Forms.css';

const SaveExpense = () => {

    const [budget, setBudget] =  useState([]);
    const params = useParams();
    const id_budget = params.id_budget;

    const getBudget = async () => {
        const {data} = await axios.get("http://localhost:8090/budget/" + id_budget);
        setBudget(data);
    };

    useEffect( () => {
        getBudget();  
    }, []);

    return (
        <>
            <h1>Création d'une dépense pour le budget "{budget.name}"</h1>

            <p>Veuillez saisir les informations ci-dessous :</p>

            <SaveExpenseForm />

        </>
    )
}

export default SaveExpense;