import axios from 'axios';
import { useEffect, useState } from 'react';
import SaveBudgetForm from '../components/SaveBudgetForm';
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
        console.log(budgetMaxId.id);
    }, []);

    return (
        <>
            <h1>Création des participants du budget "{budgetMaxId.name}"</h1>

            <p>Veuillez ajouter les participants au budget :</p>
            <p>Vous devez cocher le nom du participant correspondant à votre compte.</p>

            <SaveParticipantsForm />

        </>
    )
}

export default SaveParticipants;