import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Btn from '../components/Btn';

const Expense = () => {

    const navigate = useNavigate();

    const url = "http://localhost:8090/expense";
    const [expense, setExpense] =  useState([]);

    const params = useParams(); // Récupère un objet avec les paramètres
    const id_budget = params.id_budget;
    const id_expense = params.id_expense;

    const getExpense = async () => {
        const {data} = await axios.get(url + id_expense);
        setExpense(data);
    };

    useEffect( () => {
        getExpense();
    }, [] );

    return (
        <>
            <h1>La dépense : {expense.name} </h1>





            <div className='footer' >
                <Btn txt="Modifier la dépense" action={ () => navigate("/budget" + id_budget + "saveexpense" + id_expense) } />
                <Btn txt="Supprimer la dépense" /> {/* acction = fonction de suppression de dépense */}
            </div>
        
        </>

    )
}

export default Expense;