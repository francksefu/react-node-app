import { useContext, useState } from "react"
import ExpensesContext from "../../context/expenses";

const ExpenseShow = ({expense}) => {
    const [showEdit, setShowEdit] = useState(false);
    const { removeExpense, changeExpense } = useContext(ExpensesContext);

    const handleDelete = (e) => {
        removeExpense(expense.id);
    }

    const handleEdit = (e) => {
        setShowEdit(!showEdit);
    }

    const handleSubmit = (id, amount, date, description, idCategorie) => {
        changeExpense(id, amount, date, description, idCategorie);
        setShowEdit(false);
    }

    if (showEdit) {
        return(
            <tr>
                <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        <input type="date" value={expense.date}/>
                    </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        <input type="number" range="0.01" value={expense.amount}/>
                    </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        <textarea>{expense.description}</textarea>
                    </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                    <button onClick={handleSubmit}>Done</button>
                </td>
            </tr>
        );
    } else {
        return(
           <tr>
                <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {expense.date}
                    </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {expense.amount}
                    </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {expense.description}
                    </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {expense.idCategorie}
                    </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleEdit}>Edit</button>
                </td>
           </tr> 
        );
    }
}
export default ExpenseShow;