import '../styles/MyBudgets.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import { BudgetCard } from '../components/Card.js';
import { useNavigate } from 'react-router-dom';

const MyBudgets = () => {

    const navigate = useNavigate();

    const [budgets, setBudgets] =  useState([]);

    const getBudgets = async () => {
        const {data} = await axios.get("http://localhost:8090/budgets");
        setBudgets(data);
    };

                                                // Pas d'actualisation de la page après suppression d'un budget (renvoi sur cette page)
    //Update FBZ, avec budget dans useEffect, actualisation ok, mais requete en boucle dans l'appli...
    useEffect( () => {
        getBudgets();
    }, [] );

    useEffect( () => {
        getBudgets();
    }, [budgets] );

    return (
        <>
            <h1>Mes budgets partagés</h1>
            
            <div className="grid-budget">

                <div className='add' 
                    onClick={ () => navigate("/savebudget" ) }>
                    <BudgetCard key='plus' name='Add budget' description='' />
                </div>

                {budgets.map(b => (
                                    <div key={b.id} onClick={ () => navigate("/budget" + b.id + "/expenses") }>
                                        <BudgetCard  
                                                name={b.name}
                                                description={b.description} 
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