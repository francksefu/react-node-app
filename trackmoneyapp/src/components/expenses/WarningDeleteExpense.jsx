import { useContext } from "react";
import ExpensesContext from "../../context/expenses";

const WarningDeleteExpense = ({closeModalOfDeletion, expenseToDelete}) => {
    const { removeExpense} = useContext(ExpensesContext);

    const handleDelete = () => {
        removeExpense(expenseToDelete.id)
        closeModalOfDeletion();
    }
    return(
        <>
            <div className="p-4 text-slate-500">
                <p className="p-2">
                    Do you really want to delete the expense recorded at <span className="text-red-300">{expenseToDelete.date}</span><br/>
                    witch contain the amount of <span className="text-red-300">{expenseToDelete.amount}</span>, look this is his id {expenseToDelete.id}?
                </p>
                <div className="justify-between">
                    <button className="m-2 bg-red-500 text-white p-2 rounded" onClick={handleDelete}>Delete</button>
                    <button className="text-white bg-slate-800 p-2 rounded" onClick={closeModalOfDeletion}>Cancel</button>
                </div>
            </div>
        </>
    );
}

export default WarningDeleteExpense;