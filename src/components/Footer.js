import { useNavigate, useParams } from "react-router-dom";
import "../styles/Footer.css"

export const  BudgetFooter = ({idBudget, deleteAction}) => {

    const navigate = useNavigate();

    const params = useParams();
    const id_user = params.id_user;

    const onDeleteClick = () => {
        deleteAction();
        navigate("/user/" + id_user + "/budgets");
    }

    return (
        <>
            <div className='footer' >
                <button className='modifbutton'
                        onClick={ () => navigate("/user/" + id_user + "/updatebudget/" + idBudget) }>
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

    const params = useParams();
    const id_user = params.id_user;

    const onDeleteClick = () => {
        deleteAction();
        navigate("/user/" + id_user + "/budget/" + idBudget + "/expenses");
    }

    return (
        <>
            <div className='footer' >
                <button className='modifbutton'
                        onClick={ () => navigate("/user/" + id_user + "/budget/" + idBudget + "/updateexpense/" + idExpense) }>
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