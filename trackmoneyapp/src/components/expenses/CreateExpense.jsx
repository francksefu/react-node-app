import { useContext, useEffect, useState } from "react"
import ExpensesContext from "../../context/expenses";
import CategoriesContext from "../../context/categories";
import Select from "react-select";
import AsyncSelect from 'react-select/async';

const CreateExpense = ({closeModal ,editExpenseItem = null}) => {
    const [id, setId] = useState(editExpenseItem ? editExpenseItem.id : null);
    const [dateT, setDate] = useState(editExpenseItem ? editExpenseItem.date.slice(0, 16) : new Date().toISOString().slice(0, 16));
    const [amount, setAmount] = useState(editExpenseItem ? editExpenseItem.amount : 0);
    const [description, setDescription] = useState(editExpenseItem ? editExpenseItem.description : '');
    const [idCategorie, setIdCategorie] = useState(editExpenseItem ? editExpenseItem.idCategorie : null);
    const { createExpense, changeExpense } = useContext(ExpensesContext);
    const {categories,getCategories} = useContext(CategoriesContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
        getCategories();
    }, [isMenuOpen])
    const options = categories.map((categori) => {return {value: categori.id, label: categori.name}})
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editExpenseItem) {
            changeExpense(amount, dateT, description, idCategorie, id);
        } else {
            createExpense(dateT, amount, description, idCategorie );
        }
        closeModal();
    }

    return(
        <>
        <form className="max-w-sm mx-auto">
            <div className="mb-5">
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                <input
                    type="datetime-local"
                    id="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={dateT}
                    onChange={(e) => setDate(e.target.value)}
                />
                <div>
                    <label>Set categorie</label>
                    <Select
                        value={options.filter((categ) => categ.value == idCategorie)[0]}
                        onChange={(e) => {setIdCategorie(e.value);}}
                        options={options}
                        onMenuOpen={() => setIsMenuOpen(true)}
                        onMenuClose={() => setIsMenuOpen(false)}
                    />
                    
                </div>
                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                <input
                    type="number"
                    id="amount"
                    range="0.001"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                <textarea
                    id="message"
                    rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                >
                </textarea>

                <button type="submit" onClick={handleSubmit} className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
        </form>
        </>
    );
}

export default CreateExpense;