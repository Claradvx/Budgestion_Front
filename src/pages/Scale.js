import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScaleCard } from '../components/Card';

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

            <div className='grid-scale'>

                {(scale.length > 0) 
                ? 
                scale.map (s => ( 
                        <ScaleCard key={s.id} payeur={s.payeur} montant={s.montant} beneficiaire={s.beneficiaire} />
                        ) )
                : 
                <p>Aucune balance à afficher pour ce budget</p>
                }
            </div>
        </>
    )
}

export default Scale;