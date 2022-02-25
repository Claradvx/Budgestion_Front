import { BudgetForm } from '../components/Form';
import '../styles/Forms.css';

const SaveBudget = () => {

    return (
        <>
            <h1>Création d'un budget</h1>

            <p>Veuillez saisir les informations ci-dessous :</p>

            <BudgetForm />
        </>
    )
}

export default SaveBudget;