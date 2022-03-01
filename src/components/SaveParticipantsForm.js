import { Message } from '@mui/icons-material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Forms.css';
import Btn from './Btn';
import Checkbox from './Checkbox';

const SaveParticipantsForm = () => {

    const params = useParams();
    const id_budget = params.id_budget;

    const navigate = useNavigate();

    const [checkedOne, setCheckedOne] = useState(false);
  
    const handleChangeOne = () => {
        setCheckedOne(!checkedOne);
    };

    const [budget, setBudget] =  useState([]);
    const [participants, setParticipants] =  useState([{}]);
    const [user, setUser] = useState([]);
    let listParticipant = [];


    const getBudget = () => {
        axios.get("http://localhost:8090/budget" + id_budget)
            .then( res => setBudget(res.data) )
            .then(getParticipants());
    }

    const getParticipants = async () => {
        const {data} = await axios.get("http://localhost:8090/budget" + id_budget + "/participants");
        setParticipants(data);};

    useEffect( () => {

        getBudget();
        
    //id User en dur en attendant la gestion des Users
        const getUser = async () => {
            const{data} = await axios.get("http://localhost:8090/user1");
            setUser(data);
        }
        getUser();
    }, []);

    const createParticipant = (participant) => {
        axios.post("http://localhost:8090/saveparticipant", participant);
    };

    const updateParticipant = (participant) => {
        axios.post("http://localhost:8090/updateparticipant", participant);
    };

    const addParticipantToList = (e) => {
        e.preventDefault();
        console.log("target" + e.target);
        const form = e.target;
        const participantForm = {};
        participantForm["username"] = form[0].value;
        participantForm["budget"] = id_budget;
    
        listParticipant.push(participantForm);
        createParticipant(participantForm);

        form[0].value = "";
        participantForm["username"] = "";
    }

    const participantCheck = [];

    // ne fonctionne pas a voir comment récupérer les checkbox checkées....
//    const toggleCheckbox = key => {   
//        if (this.selectedCheckboxes) {
//          participantCheck.add(key);
//      }
//    }

    const validateParticipants = () => {
/*        toggleCheckbox();
        if (participantCheck.length > 1) {
            Message("Vous ne devez cocher qu'un seul participant lié à votre compte d'utilisateur pour ce budget");
        } else if (participantCheck.length < 1) {
            Message("Vous devez cocher un participant lié à votre compte d'utilisateur pour ce budget");
        } 
        else {*/
            const participantUser=[];
            participantUser["id"] = participantCheck[0];
            participantUser["user"] = user;
            updateParticipant(participantUser);
            navigate("/budgets");
//        }
    }   
    
    useEffect( () => {
        getParticipants();
    }, [listParticipant]);

    return (

             <div className='box'>
                    <ul>
                    {(participants.length != 0) ?
                                              (<ul>
                                               {participants.map( p => (
                                                                        <li id='participants' key={p.id}>
                                                                        <Checkbox
                                                                        key={p.id}        
                                                                        label={" " + p.username}
                                                                        value={checkedOne}
                                                                        onChange={handleChangeOne}/></li> 
                                                                        ))}
                   
                                             </ul>)
                        : <li id='participants'>Aucun participant n'a été créé pour le budget "{budget.name}"</li>
                    }
                    <li>
                        <form className='addparticipant' onSubmit={addParticipantToList}>
                                <input type='text' id='username' />
                                <button type='submit'>Ajouter un participant</button>
                        </form>
                    </li>
                    </ul> 
                    <p>
                    <Btn txt="J'ai fini!" action={validateParticipants}></Btn>
                    </p>
            </div>  
    )

}

export default SaveParticipantsForm;