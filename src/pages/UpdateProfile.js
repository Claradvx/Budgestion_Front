import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UpdateProfileForm from '../components/UpdateProfileForm';
import '../styles/Forms.css';

const UpdateProfile = () => {

    const [user, setUser] = useState([[]]);

    const params = useParams();
    const id_budget = params.id_budget;
    const id_user = params.id_user;

    const getUser = async () => {
        const {data} = await axios.get("http://localhost:8090/user/" + id_user);
        setUser(data);
    }

    useEffect( () => {
        getUser();
    }, []);

    return (
        <>
            <h1>Modification du profil utilisateur "{user.name}"</h1>

            <p>Veuillez modifier les informations souhaitées</p>

            <UpdateProfileForm />
        </>
    )
}

export default UpdateProfile;