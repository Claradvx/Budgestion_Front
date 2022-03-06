import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SaveParticipantsForm from '../components/SaveParticipantsForm';
import '../styles/Forms.css';

const SaveParticipants = () => {

    const [budget, setBudget] =  useState([]);

    const params = useParams();
    const id_budget = params.id_budget;

    const getBudget = () => {
        axios.get("http://localhost:8090/budget/" + id_budget)
            .then( res => setBudget(res.data) );
    };

    useEffect( () => {
        getBudget();
    }, []);

    return (
        <>
            <h1>Création des participants au budget</h1>
            <h2>{budget.name}</h2>

            <h3>Veuillez ajouter les différentes personnes participantes à ce budget</h3>

            <SaveParticipantsForm />

        </>
    )
}

export default SaveParticipants;