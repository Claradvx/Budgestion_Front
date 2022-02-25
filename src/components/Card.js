import '../styles/Card.css'

export const BudgetCard = ({key, name, description}) => {

    return (
        <>
            <div key={key} className="budget-card">
                <h2 className="name">{name}</h2>
                <p className="description">{description}</p>
            </div>
        </>
    )

}

export const ExpenseCard = ({key, name, description}) => {

    return (
        <>
            <div key={key} className="expense-card">
                <h2 className="name">{name}</h2>
                <p className="description">{description}</p>
            </div>

        </>
    )
    
}