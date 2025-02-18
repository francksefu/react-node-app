import { useContext, useState } from "react"
import CategoriesContext from "../../context/categories";

const CreateCategorie = ({closeModal ,editCategorieItem = null}) => {
    const [id, setId] = useState(editCategorieItem ? editCategorieItem.id : null);
    const [name, setName] = useState(editCategorieItem ? editCategorieItem.name : '');
    const [isHaveLimit, setisHaveLimit] = useState(editCategorieItem ? editCategorieItem.isHaveLimit : false);
    const [amountLimit, setAmountLimit] = useState(editCategorieItem ? editCategorieItem.amountLimit : null);
    
    const { createCategorie, changeCategorie } = useContext(CategoriesContext);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editCategorieItem) {
            changeCategorie(name, isHaveLimit, amountLimit, id);
        } else {
            createCategorie(name, isHaveLimit, amountLimit );
        }
        closeModal();
    }

    return(
        <>
        <form className="max-w-sm mx-auto">
            <div className="mb-5">
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount Budget Limit</label>
                <input
                    type="number"
                    range="0.001"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={amountLimit}
                    onChange={(e) => setAmountLimit(e.target.value)}
                />

                <button type="submit" onClick={handleSubmit} className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
        </form>
        </>
    );
}

export default CreateCategorie;