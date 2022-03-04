import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UpdateBudgetForm from '../components/UpdateBudgetForm';
import '../styles/Forms.css';

const UpdateBudget = () => {
    
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
            <h1>Modification du budget "{budget.name}"</h1>

            <p>Veuillez modifier les informations souhaitées</p>

            <UpdateBudgetForm />
        </>
    )
}

export default UpdateBudget;