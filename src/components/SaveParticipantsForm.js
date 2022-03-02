import axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/Forms.css';

const SaveParticipantsForm = () => {
    
    const [participants, setParticipants] = useState([]);
    
    // const getparticipants = () => {
    //     setParticipants(participants);
    // }

    const addParticipants = (e) => {
        e.preventDefault();
        const form = e.target.form;
        

        participants.push(form[0].value);
        console.log(participants);
        
        // getparticipants();
    }

    const handleChange = (e) => {
        setParticipants(e.target.value);
    }

    const validateParticipants = (e) => {
        // Fonction récupérant la liste des participant entrée
        // Créant chacun des participants (ou dans une autre fonction)
        // Assignant l'id de l'user au participant qu'il a choisi  
        e.preventDefault();

        console.log("boutton submit");

    }

    useEffect(() => {
        // getparticipants();
    }, [] );

    return (
            <div className='box'>
                <form onSubmit={validateParticipants}>
                    
                    <ul>
                        {(participants.length !== 0) &&
                            (
                                <>
                                    {participants.map( p => <input value={p} onChange={handleChange} /> )
                                    // participants.map( p => <li key={p}>{p}</li> )
                                    }
                                </>
                            )}
                    </ul>
                    
                    
                    <div>
                        <input id='username' name='username'/>
                        <button onClick={addParticipants}>+</button>
                    </div>
                    
                    <button type='submit'>OK</button>
                </form>
            </div>  
    )

}

export default SaveParticipantsForm;