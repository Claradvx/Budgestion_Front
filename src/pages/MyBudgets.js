import '../styles/MyBudgets.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import { BudgetCard } from '../components/Card.js';
import { useNavigate } from 'react-router-dom';

const MyBudgets = () => {

    const navigate = useNavigate();

    // Création d'une fonction de parcours d'un fichier json recensant 
    // les(s) budget(s) d'une personne 
    // const api_url = "http://localhost:4000/budget";
    const budgets_url = "http://localhost:8090/budgets"
    const [budgets, setBudget] =  useState([]);

    const getBudget = async () => {
        const {data} = await axios.get(budgets_url);
        setBudget(data);
    };

    // Pas d'actualisation de la page après suppression d'un budget (renvoi sur cette page)
    useEffect( () => {
        getBudget();
    }, [] );

    return (
        <>
            <h1>Mes budgets partagés</h1>
            <div className = "grid-budget">

                <div className='add' 
                    onClick = { () => navigate("/savebudget" ) }>
                    <BudgetCard key='plus' name='Add budget' description='' />
                </div>

                {budgets.map(b => (
                                    <div onClick = { () => navigate("/budget" + b.id + "/expenses") }>
                                        <BudgetCard key = {b.id} 
                                                name = {b.name}
                                                description = {b.description} 
                                                />
                                    </div>
                                )
                            )
                } 

            </div>
        </>
    )
}

export default MyBudgets;