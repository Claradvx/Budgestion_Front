import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UpdateParticipantsForm from '../components/UpdateParticipantsForm';
import '../styles/Forms.css';

const UpdateParticipants = () => {

    const params = useParams();
    const id = params.id_budget;
    const [budget, setBudget] =  useState([]);

    const getBudget = async () => {
        const {data} = await axios.get("http://localhost:8090/budget" + id);
        setBudget(data);
    };

    useEffect( () => {
        getBudget();  
    }, []);

    return (
        <>
            <h1>Modification du budget "{budget.name}"</h1>

            <p>Veuillez modifier les informations souhaitées</p>

            <UpdateParticipantsForm />
        </>
    )
}

export default UpdateParticipants;