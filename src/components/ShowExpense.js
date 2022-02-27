import '../styles/Forms.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ShowExpenseForm = () => {

    const navigate = useNavigate();

    const params = useParams(); 
    const id_budget = params.id_budget; 
    const id_expense = params.id_expense;

    const [participants, setParticipants] =  useState([[]]);
    const [expense, setExpense] =  useState(
        {
            "id": 1,
            "name": "Essence aller",
            "description": "250km",
            "montant": 60.0,
            "payeur": {
                "id": 1,
                "username": "FannyB",
                "user": {
                    "id": 1,
                    "name": "BARTHEZ",
                    "firstname": "Fanny",
                    "username": "fanny.barthez@hotmail.fr",
                    "password": "FBpassword",
                    "age": 37,
                    "enabled": false,
                    "credentialsNonExpired": false,
                    "accountNonExpired": false,
                    "authorities": null,
                    "accountNonLocked": false
                }
            },
            "beneficiaires": [
                {
                    "id": 1,
                    "username": "FannyB",
                    "user": {
                        "id": 1,
                        "name": "BARTHEZ",
                        "firstname": "Fanny",
                        "username": "fanny.barthez@hotmail.fr",
                        "password": "FBpassword",
                        "age": 37,
                        "enabled": false,
                        "credentialsNonExpired": false,
                        "accountNonExpired": false,
                        "authorities": null,
                        "accountNonLocked": false
                    }
                },
                {
                    "id": 4,
                    "username": "Cailloux",
                    "user": {
                        "id": 2,
                        "name": "DEVAUX",
                        "firstname": "Clara",
                        "username": "clara.devaux31@outlook.fr",
                        "password": "CDpassword",
                        "age": 25,
                        "enabled": false,
                        "credentialsNonExpired": false,
                        "accountNonExpired": false,
                        "authorities": null,
                        "accountNonLocked": false
                    }
                },
                {
                    "id": 5,
                    "username": "TomTom",
                    "user": {
                        "id": 3,
                        "name": "MENDOLA",
                        "firstname": "Thomas",
                        "username": "thomasmendola@outlook.fr",
                        "password": "TMpassword",
                        "age": 36,
                        "enabled": false,
                        "credentialsNonExpired": false,
                        "accountNonExpired": false,
                        "authorities": null,
                        "accountNonLocked": false
                    }
                },
                {
                    "id": 7,
                    "username": "MarieC",
                    "user": {
                        "id": 4,
                        "name": "CHANEL",
                        "firstname": "Marie",
                        "username": "marie-benedicte.chanel@wanadoo.fr",
                        "password": "MCpassword",
                        "age": 36,
                        "enabled": false,
                        "credentialsNonExpired": false,
                        "accountNonExpired": false,
                        "authorities": null,
                        "accountNonLocked": false
                    }
                },
                {
                    "id": 10,
                    "username": "Thaïs",
                    "user": {
                        "id": 5,
                        "name": "REVILLON",
                        "firstname": "Thaïs",
                        "username": "trevillon@jehann.fr",
                        "password": "TRpassword",
                        "age": 28,
                        "enabled": false,
                        "credentialsNonExpired": false,
                        "accountNonExpired": false,
                        "authorities": null,
                        "accountNonLocked": false
                    }
                }
            ]
        }
    );

    const [budget, setBudget] =  useState([]);

    const getParticipants = async () => {
        const {data} = await axios.get("http://localhost:8090/budget" + id_budget + "/participants");
        setParticipants(data);
    };

    const getBudget = async () => {
        const {data} = await axios.get("http://localhost:8090/budget" + id_budget);
        setBudget(data);
    };

    const getExpense = async () => {
        const {data} = await axios.get("http://localhost:8090/expense" + id_expense); 
        setExpense(data);
    };


    useEffect( () => {
        getExpense();
        getBudget();
        console.log(expense);
    }, []);

    return (
        <> 
            <div className='showbox'>
                <form>

                    <div className='field'>
                        <label htmlFor="description">Description :</label>
                        <p className='data'>{expense.description}</p>
                    </div>

                    <div className='field'>
                        <label htmlFor='montant'>Montant :</label>
                        <p className='data'>{expense.montant} €</p>
                    </div>
                    
                    <div className='field'>
                        <label htmlFor='montant'>Participant ayant payé la dépense :</label>
                        <p className='data'>{expense.payeur.username}</p>
                    </div>
                    
                    <div>
                    <label className='participants' htmlFor='payeur'>Participants ayant bénéficié de la dépense :</label> 
                        <ul>
                            {expense.beneficiaires.map( b => (
                                                     <li id='participants' key={b.id}>{b.username}</li> 
                                                     ))}
                        </ul>    
                    </div>                   
                </form>
            </div>
        </>
    )
}

export default ShowExpenseForm;