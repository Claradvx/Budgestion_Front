import axios from 'axios';
import { useEffect, useState } from 'react';
import SaveParticipantsForm from '../components/SaveParticipantsForm';
import '../styles/Forms.css';

const SaveParticipants = () => {

    const [budgetMaxId, setBudgetMaxId] =  useState([]);

    const getBudgetMaxId = () => {
        axios.get("http://localhost:8090/budgetmax")
            .then( res => setBudgetMaxId(res.data) );
    };

    useEffect( () => {
        getBudgetMaxId();
    }, []);

    return (
        <>
            <h1>Création des participants au budget</h1>
            <h2>{budgetMaxId.name}</h2>

            <h3>Veuillez ajouter les différentes personnes participantes à ce budget</h3>
            <p>Qui êtes vous ? </p>
            <p>Cochez le pseudo vous correspondant</p>

            <SaveParticipantsForm />

        </>
    )
}

export default SaveParticipants;