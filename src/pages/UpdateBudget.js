import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UpdateBudgetForm from '../components/UpdateBudgetForm';
import '../styles/Forms.css';

const UpdateBudget = () => {

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
            <h1>Modification du budget "{budget.name}"</h1>

            <p>Veuillez modifier les informations souhaitées</p>

            <UpdateBudgetForm />
        </>
    )
}

export default UpdateBudget;