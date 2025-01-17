import { useContext } from "react"
import ExpensesContext from "../../context/expenses"
import ExpenseShow from "./ExpenseShow";

const ExpensesList = () => {
    const {expenses} = useContext(ExpensesContext);

    const renderedExpenses = expenses.map((expense) => {
        return <ExpenseShow expense={expense} />;
    });

    return(
        <>
            <div className="p-6 px-0 overflow-scroll">
                <table className="w-full text-left table-auto min-w-max">
                <thead>
                    <tr>
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Date
                            </p>
                        </th>
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Amount
                            </p>
                        </th>
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Description
                            </p>
                        </th>
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Categorie
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {renderedExpenses}
                </tbody>
                </table>
            </div>
        </>
    );
}

export default ExpensesList;