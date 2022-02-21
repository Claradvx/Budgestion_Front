import '../styles/Expenses.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ExpenseCard } from '../components/Card';

const Expenses = () => {

    const expenses_url = "http://localhost:8090/home/budget";
    const [expenses, setExpense] =  useState([]);
    const params = useParams(); // Récupère un objet avec les paramètres
    const id = params.id; // ou const {id} = useParams(); récupérant la données id de useParams

    const getExpense = async () => {
        const {data} = await axios.get(expenses_url + id + "/expenses");
        setExpense(data);
    };

    useEffect( () => {
        getExpense();
    }, [] );

    return (
        <>
            <h1>Les dépenses du budget</h1>
            <div className = "grid">
                {expenses.map(e => (
                                    <div>
                                        <ExpenseCard key = {e.id} 
                                                name = {e.name}
                                                description = {e.description} 
                                                />
                                    </div>
                                )
                            )
                } 

            </div>
        </>
    )
}

export default Expenses;