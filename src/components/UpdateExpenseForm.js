import '../styles/Forms.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const UpdateExpenseForm = () => {

    const navigate = useNavigate();

    const [state, setState] = useState({value: ""});

    const [checkedOne, setCheckedOne] = useState(false);
    const [inputName, setInputName] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [inputMontant, setInputMontant] = useState(0);
    const [payeur, setPayeur] =  useState([]);
    const [participants, setParticipants] =  useState([]);
    const [expense, setExpense] =  useState([]);
    
    const params = useParams(); 
    const id_budget = params.id_budget;
    const id_expense = params.id_expense;
    const id_user = params.id_user;

    const handleChangePayeur = (e) => {
        setState({value: e.target.value});
    };
  
    const handleChangeBeneficiaires = (e) => {
        setCheckedOne(!checkedOne);
    };

    const getParticipants = async () => {
        const {data} = await axios.get("http://localhost:8090/budget" + id_budget + "/participants");
        setParticipants(data);
    };

    const getPayeur = async (id_payeur) => {
        const {data} = await axios.get("http://localhost:8090/participant" + id_payeur);
        console.log(data);
        setPayeur(data);
    };

    const getExpense = async () => {
        const {data} = await axios.get("http://localhost:8090/expense" + id_expense);
        setExpense(data);
        setInputName(document.getElementById('name').value=data.name);
        setInputDescription(document.getElementById('description').value=data.description);
        setInputMontant(document.getElementById('montant').value=data.montant);
      //  setState(data.payeur.username);
        console.log("expense.payeur = " + data.payeur.username);
    };

    const updateExpense = async (expense) => {
        const {data} = await axios.put("http://localhost:8090/updateexpense", expense); 
        getExpense(data);
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const expenseForm = {};

        console.log(payeur);

        expenseForm["id"] = id_expense;
        expenseForm["name"] = form[0].value;
        expenseForm["description"] = form[1].value;
        expenseForm["montant"] = form[2].value;
        //récupérer l'id du payeur ave la liste déroulante?
        expenseForm["payeur"] = payeur;
        //participants.map (p => if checked alors push dans const beneficiaires)
        //modifier participants par bénéficiaires
        expenseForm["beneficiaires"] = participants;

        console.log(expenseForm);

        updateExpense(expenseForm);

        navigate("/user/" + id_user + "/budget" + id_budget + "/expenses");
    }

    useEffect( () => {
        getPayeur(state.value);
        getParticipants();
        getExpense();
    }, []); 


    return (
        <> 
            <div className='box'>
                <form onSubmit={handleSubmit}>
                
                    <div className='field'>
                        <input type='text' id='name' />
                        <label htmlFor="name">Nom de la dépense</label>
                    </div>

                    <div className='field'>
                        <input type='text' id='description'/>
                        <label htmlFor="description">Description</label>
                    </div>

                    <div className='field'>
                        <input type='text' id='montant'/>
                        <label htmlFor='username'>Montant de la dépense</label>
                    </div>

                    <label className='listeDeroulante' htmlFor='payeur'>Participant ayant payé la dépense</label>
                    <select value={state.value} onChange={handleChangePayeur}>
                         {participants.map( p => (
                                                    <option value={p.id} key={p.id}>{p.username}</option>
                                                 ))}
                    </select>
                    
                    <ul>
                        <FormGroup>
                            {participants.map( p => (
                                                     <li id='participants' key={p.id}>
                                                    <FormControlLabel key={p.id} control={<Checkbox  value={checkedOne} id={p.username}
                                                     onChange={handleChangeBeneficiaires} />} label={p.username} />
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