import '../styles/Forms.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const UpdateExpenseForm = () => {

    const navigate = useNavigate();

    const [inputName, setInputName] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [inputMontant, setInputMontant] = useState(0);
    const [payeur, setPayeur] =  useState([]);
    const [participants, setParticipants] =  useState([]);
    const [beneficiaires, setBeneficiaires] =  useState([]);
    const [id_payeur, setIdPayeur] =  useState(0);
    const [state, setState] = useState({value: ""});
    
    const params = useParams(); 
    const id_budget = params.id_budget;
    const id_expense = params.id_expense;
    const id_user = params.id_user;

    const handleChangePayeur = (e) => {
        setState({value: e.target.value});
        setIdPayeur(e.target.value);
        getPayeur(e.target.value);
    };
  

    const getParticipants = async () => {
        const {data} = await axios.get("http://localhost:8090/budget/" + id_budget + "/participants");
        setParticipants(data);
    };

    const getExpense = async () => {
        const {data} = await axios.get("http://localhost:8090/expense/" + id_expense);
        setInputName(document.getElementById('name').value=data.name);
        setInputDescription(document.getElementById('description').value=data.description);
        setInputMontant(document.getElementById('montant').value=data.montant);
        setBeneficiaires(data.beneficiaires);
        setState({value: data.payeur.id});     
    };

    const getPayeur = async (id_payeur) => {
        const {data} = await axios.get("http://localhost:8090/participant/" + id_payeur);
        setPayeur(data);
    };

    const updateExpense = async (expenseForm) => {
        const {data} = await axios.put("http://localhost:8090/updateexpense", expenseForm); 
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();

        const beneficiaires_selected = ([]);

        const form = e.target;
        const expenseForm = {};
       
        expenseForm["id"] = id_expense;
        expenseForm["name"] = form[0].value;
        expenseForm["description"] = form[1].value;
        expenseForm["montant"] = form[2].value;

        if (payeur.id != undefined) {
            expenseForm["payeur"] = payeur;
        }

        participants.map( p => {
            for(let i = 4; i < form.length-1 ; i++) {
                if (p.username === form[i].id && form[i].checked) {
                    beneficiaires_selected.push(p);
                }
            }
        })
        expenseForm["beneficiaires"] = beneficiaires_selected;

        updateExpense(expenseForm);

        navigate("/user/" + id_user + "/budget/" + id_budget + "/expenses");
    }

    useEffect( () => {
        getParticipants();
        getExpense();
    }, []); 


    return (
        <> 
            <div className='box'>
                <form onSubmit={handleSubmit}>
                
                    <div className='field'>
                        <input type='text' id='name' />
                        <label htmlFor="name">Nom de la d??pense</label>
                    </div>

                    <div className='field'>
                        <input type='text' id='description'/>
                        <label htmlFor="description">Description</label>
                    </div>

                    <div className='field'>
                        <input type='text' id='montant'/>
                        <label htmlFor='username'>Montant de la d??pense</label>
                    </div>

                    <label className='listeDeroulante' htmlFor='payeur'>Participant ayant pay?? la d??pense</label>
                    <select value={state.value} onChange={handleChangePayeur}>
                         {participants.map( p => (
                                                    <option value={p.id} key={p.id}>{p.username}</option>
                                                 ))}
                    </select>
                    
                    <ul>
                        <FormGroup>
                            {participants.map( p => (
                                <li id='participants' key={p.id}>
                                    <FormControlLabel key={p.id} control={
                                        <Checkbox  id={p.username}
                                                defaultChecked />
                                        } 
                                        label={p.username} />
                                </li> 
                            ))}
                        </FormGroup>
                        </ul>   

                    <p>
                    <button type='submit'>Valider les modifications</button>
                    </p>
                </form>
            </div>
        </>
    )
}

export default UpdateExpenseForm;