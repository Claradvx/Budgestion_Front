import { useNavigate } from "react-router-dom";
import "../styles/Footer.css"

export const  BudgetFooter = ({idBudget, deleteAction}) => {

    const navigate = useNavigate();
    
    const onDeleteClick = () => {
        deleteAction();
        navigate("/budgets");
    }

    return (
        <>
            <div className='footer' >
                <button className='modifbutton'
                        onClick={ () => navigate("/updatebudget" + idBudget) }>
                    Modifier budget
                </button>
                
                <button className='deletebutton'
                        onClick={onDeleteClick}>
                Supprimer budget
                </button>

            </div>
        </>
    )
}

export const  ExpenseFooter = ({idBudget, idExpense, deleteAction}) => {

    const navigate = useNavigate();

    const onDeleteClick = () => {
        deleteAction();
        navigate("/budget"+ idBudget +"/expenses");
    }

    return (
        <>
            <div className='footer' >
                <button className='modifbutton'
                        onClick={ () => navigate("/budget" + idBudget + "/updateexpense" + idExpense) }>
                    Modifier dépense
                </button>
                
                <button className='deletebutton'
                        onClick={onDeleteClick} >
                Supprimer dépense
                </button>

            </div>
        </>
    )
}