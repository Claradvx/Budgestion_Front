import { useNavigate, useParams } from "react-router-dom";
import "../styles/Footer.css"

export const  BudgetFooter = ({idBudget, deleteAction}) => {

    const navigate = useNavigate();

    const params = useParams();
    const id_user = params.id_user;

    const onDeleteClick = () => {
        deleteAction().then(() => navigate("/user/" + id_user + "/budgets"));
    }

    return (
        <>
            <div className='footer' >
                <button className='modifbutton'
                        onClick={ () => navigate("/user/" + id_user + "/updatebudget/" + idBudget) }>
                    Modifier budget
                </button>

                <button className='retourbutton'
                        onClick={ () => navigate("/user/" + id_user + "/budgets") }>
                    Retour aux budgets
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
        deleteAction().then(() => navigate("/user/" + id_user + "/budget/" + idBudget + "/expenses"));
    }

    return (
        <>
            <div className='footer' >
                <button className='modifbutton'
                        onClick={ () => navigate("/user/" + id_user + "/budget/" + idBudget + "/updateexpense/" + idExpense) }>
                    Modifier dépense
                </button>

                <button className='retourbutton'
                        onClick={ () => navigate("/user/" + id_user + "/budget/" + idBudget + "/expenses") }>
                    Retour aux dépenses
                </button>
                
                <button className='deletebutton'
                        onClick={onDeleteClick} >
                Supprimer dépense
                </button>

            </div>
        </>
    )
}

export const  UserFooter = ({iduser}) => {

    const navigate = useNavigate();

    const params = useParams();
    const id_user = params.id_user;

    const logout = () => {
        //is connected => false
        navigate("/signin");
    }

    return (
        <>
            <div className='footer' >
                <button className='modifbutton'
                        onClick={ () => navigate("/user/" + iduser + "/updateprofile") }>
                    Modifier mon profil
                </button>

                <button className='retourbutton'
                        onClick={ () => navigate("/user/" + id_user + "/budgets") }>
                    Retour aux budgets
                </button>
                
                <button className='logout'
                        onClick={logout} >
                Déconnection
                </button>

            </div>
        </>
    )
}