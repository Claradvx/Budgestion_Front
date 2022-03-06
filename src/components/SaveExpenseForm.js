import '../styles/Forms.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';



const SaveExpenseForm = () => {

    const navigate = useNavigate();

    const [participants, setParticipants] =  useState([]);
    const [payeur, setPayeur] =  useState([]);
    const [budget, setBudget] =  useState([]);
    const [id_payeur, setIdPayeur] =  useState(0);
    const [state, setState] = useState({value: ""});
    
    const params = useParams(); 
    const id_budget = params.id_budget;
    const id_user = params.id_user;

    const handleChangePayeur = (e) => {
        setState({value: e.target.value});
        setIdPayeur(e.target.value);
        getPayeur((e.target.value));
    };
  
    const getParticipants = async () => {
        const {data} = await axios.get("http://localhost:8090/budget/" + id_budget + "/participants");
        setParticipants(data);
        getPayeur(data[0].id);
    };

    const getPayeur = async (id_payeur) => {
        const {data} = await axios.get("http://localhost:8090/participant/" + id_payeur);
        setPayeur(data);
    };

    const getBudget = async () => {
        const {data} = await axios.get("http://localhost:8090/budget/" + id_budget);
        setBudget(data);
    };

    const saveExpense = async (expenseForm) => {
        const {data} = await axios.post("http://localhost:8090/saveexpense", expenseForm); 
        navigate("/user/" + id_user + "/budget/" + id_budget + "/expenses");
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();
        const beneficiaires = ([]);
        const form = e.target;

        const expenseForm = {};
       
        expenseForm["name"] = form[0].value;
        expenseForm["description"] = form[1].value;
        expenseForm["montant"] = form[2].value;
        expenseForm["payeur"] = payeur;
        expenseForm["budget"] = budget;
        console.log(expenseForm);
        participants.map( p => {
            for(let i = 4; i < form.length-1 ; i++) {
                if (p.username === form[i].id && form[i].checked) {
                    beneficiaires.push(p);
                }
            }
        })
   
        expenseForm["beneficiaires"] = beneficiaires;
        saveExpense(expenseForm);        
    }

    useEffect( () => {
        getBudget();
        getParticipants();
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
                                                    <FormControlLabel key={p.id} control={<Checkbox  id={p.username}
                                                    defaultChecked/>} label={p.username} />
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

export default SaveExpenseForm;