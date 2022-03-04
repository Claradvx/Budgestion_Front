import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Scale.css';

const Scale = () => {

    const [scale, setScale] = useState([]);
    const [budget, setBudget] =  useState([]);

    const params = useParams();
    const id_budget = params.id_budget;

    const getScaleByIdBudget = async () => {
        const {data} = await axios.get("http://localhost:8090/budget/"+ id_budget +"/scale");
        setScale(data);
    };

    const getBudget = async () => {
        const {data} = await axios.get("http://localhost:8090/budget/" + id_budget);
        setBudget(data);
    };

    useEffect( () => {
        getBudget();
        getScaleByIdBudget();
    }, [] );

    return (
        <>
            <h1>Balance des dépenses du budget "{budget.name}"</h1>

            <div className='scale'>

                {(scale.length > 0) ? 
                scale.map (b => ( 
                        <p key={b.id}>{b.payeur} doit {(b.montant).toFixed(2)}€ à {b.beneficiaire}</p>))
                : <p>Aucune balance à afficher pour ce budget</p>}
            </div>
        </>
    )
}

export default Scale;