import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Scale.css';

const Scale = () => {

    const params = useParams();
    const id = params.id_budget;

    const [balance, setBalance] = useState([]);
    const [budget, setBudget] =  useState([]);


    const getBalanceByIdBudget = async () => {
        const {data} = await axios.get("http://localhost:8090/budget"+ id +"/balance");
        setBalance(data);
    }

    const getBudget = async () => {
        const {data} = await axios.get("http://localhost:8090/budget" + id);
        setBudget(data);
    };

    useEffect( () => {
        getBudget();
        getBalanceByIdBudget();
    }, [] );

    return (
        <>
            <h1>Balance des dépenses du budget "{budget.name}"</h1>

            <div className='scale'>
                {balance.map (b => ( 
                        <p key={b.id}>{b.payeur} doit {(b.montant).toFixed(2)}€ à {b.beneficiaire}</p>))}
            </div>
        </>
    )
}

export default Scale;