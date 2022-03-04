import '../styles/Card.css'

export const BudgetCard = ({name, description}) => {

    return (
        <>
            <div className='budget-card'>
                <h3 className='name'>{name}</h3>
                <p className='description'>{description}</p>
            </div>
        </>
    )
}

export const ExpenseCard = ({name, description}) => {

    return (
        <>
            <div className='expense-card'>
                <h3 className='name'>{name}</h3>
                <p className='description'>{description}</p>
            </div>

        </>
    )
}


export const ScaleCard = ({payeur, montant, beneficiaire}) => {

    return (
        <>
            <div className='scale-card'>
                <h3 className='name'>{payeur} doit  {montant.toFixed(2)}€ à {beneficiaire}</h3>
            </div>

        </>
    )
}