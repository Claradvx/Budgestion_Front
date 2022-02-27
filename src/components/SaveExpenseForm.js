import '../styles/Forms.css';
import Btn from './Btn.js';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
//import { FormControlLabel, FormGroup } from '@mui/material';



const SaveExpenseForm = () => {

    const navigate = useNavigate();

    const [state, setState] = useState({value: ""});
  
    const handleChangePayeur = (e) => {
      setState({value: e.target.value});
    }
    
    const params = useParams(); 
    const id = params.id_budget; 


    const [checkedOne, setCheckedOne] = useState(false);
  
    const handleChangeBeneficiaires = (e) => {
        setCheckedOne(!checkedOne);
    };

    const [payeur, setPayeur] =  useState([]);
    const [participants, setParticipants] =  useState([[]]);
  //  const [expense, setExpense] =  useState([[]]);
    const [budget, setBudget] =  useState([]);

    const getParticipants = async () => {
        const {data} = await axios.get("http://localhost:8090/budget" + id + "/participants");
        setParticipants(data);
    };

    const getPayeur = async (id_payeur) => {
        const {data} = await axios.get("http://localhost:8090/participant" + id_payeur);
        setPayeur(data);
    };

    const getBudget = async () => {
        const {data} = await axios.get("http://localhost:8090/budget" + id);
        setBudget(data);
    };

    const createExpense = async (budget) => {
        const {data} = await axios.post("http://localhost:8090/saveexpense", budget); 
        console.log("data" + data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const expenseForm = {};
        
        for(let i = 0; i < 3 ; i++) {
            const input = form[i];
            expenseForm[input.id] = input.value;
        }
        expenseForm["budget"] = budget;
        expenseForm["payeur"] = payeur;
        createExpense(expenseForm);
        navigate("/budget" +id + "/expenses")
    }

    useEffect( () => {
        getPayeur(state.value);
        getParticipants();
        getBudget();
    }, [state.value]);

    return (
        <> 
            <div className='box'>
                <form onSubmit={handleSubmit}>

                    <div className='field'>
                        <input type='text' id='name' />
                        <label htmlFor="name">Nom de la dépense</label>
                    </div>

                    <div className='field'>
                        <input type='text' id='description' />
                        <label htmlFor="description">Description</label>
                    </div>

                    <div className='field'>
                        <input type='text' id='montant' />
                        <label htmlFor='montant'>Montant</label>
                    </div>
                    
                    <label className='listeDeroulante' htmlFor='payeur'>Participant ayant payé la dépense</label>
                    <select value={state.value} onChange={handleChangePayeur}>
                         {participants.map( p => (
                                                    <option value={p.id}>{p.username}</option>
                                                 ))}
                    </select>
                    
                    <label className='participants' htmlFor='payeur'>Participants ayant bénéficié de la dépense</label>
                        <ul>
                        <FormGroup>
                            {participants.map( p => (
                                                     <li id='participants' key={p.id}>
                                                    <FormControlLabel  control={<Checkbox  value={checkedOne} id={p.id}
                                                     onChange={handleChangeBeneficiaires} />} label={p.username} />
                                                     </li> 
                                                     ))}
                        </FormGroup>
                        </ul>                       

                    <p>
                    <Btn txt='OK' type='submit'></Btn>
                    </p>

                </form>
            </div>
        </>
    )
}

export default SaveExpenseForm;