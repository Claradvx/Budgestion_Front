import '../styles/Card.css'

export const BudgetCard = ({name, description}) => {

    return (
        <>
            <div className='budget-card'>
                <h2 className='name'>{name}</h2>
                <p className='description'>{description}</p>
            </div>
        </>
    )
}

export const ExpenseCard = ({name, description}) => {

    return (
        <>
            <div className='expense-card'>
                <h2 className='name'>{name}</h2>
                <p className='description'>{description}</p>
            </div>

        </>
    )
}


export const BalanceCard = ({payeur, montant, beneficiaire}) => {

    return (
        <>
            <div className='balance-card'>
                <p className='tour'>{{payeur} + " doit " + {montant} + "€ à " + {beneficiaire}}</p>
            </div>

        </>
    )
}