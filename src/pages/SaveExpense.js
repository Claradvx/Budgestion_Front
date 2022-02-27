import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SaveExpenseForm from '../components/SaveExpenseForm';
import '../styles/Forms.css';

const SaveExpense = () => {

    const params = useParams();
    const id = params.id_budget;

    const url = "http://localhost:8090/budget";

    const [budget, setBudget] =  useState([]);

    const getBudget = async () => {
        const {data} = await axios.get(url + id);
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