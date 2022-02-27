import SaveBudgetForm from '../components/SaveBudgetForm';
import '../styles/Forms.css';

const SaveBudget = () => {

    return (
        <>
            <h1>Création d'un budget</h1>

            <p>Veuillez saisir les informations ci-dessous :</p>

            <SaveBudgetForm />
        </>
    )
}

export default SaveBudget;