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
            changeCategorie(name, isHaveLimit, amountLimit, editCategorieItem.id);
        } else {
            createCategorie(name, isHaveLimit, amountLimit );
        }
        closeModal();
    }

    return(
        <>
        <form className="max-w-sm mx-auto">
            <div className="mb-5">
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <p className="m-2 ">Is it a limit budget ?</p>
                <div className="flex gap-10">
                    <div className="inline-flex items-center pb-1">
                        <label className="relative flex items-center cursor-pointer p-2" htmlFor="blue-600">
                        <input
                            name="color"
                            type="radio"
                            checked={isHaveLimit === false || isHaveLimit === 0}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-blue-400 transition-all"
                            id="blue-600"
                            onChange={() => setisHaveLimit(false)}
                        />
                        <span className="p-2 absolute bg-blue-600 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                        </label>
                        No
                    </div>
                    <div className="inline-flex items-center">
                        <label className="relative flex items-center cursor-pointer p-2" htmlFor="green-600">
                        <input
                            name="color"
                            type="radio"
                            checked={isHaveLimit === true || isHaveLimit === 1}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-green-400 transition-all"
                            id="green-600"
                            onChange={() => setisHaveLimit(true)}
                        />
                        <span className="absolute bg-green-600 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                        </label>
                        Yes
                    </div>
                </div>
                
                {(isHaveLimit !== 0) && isHaveLimit && 
                <>
                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount Budget Limit</label>
                    <input
                        type="number"
                        range="0.001"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={amountLimit}
                        onChange={(e) => setAmountLimit(e.target.value)}
                    />
                </>
                }
                <button type="submit" onClick={handleSubmit} className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
        </form>
        </>
    );
}

export default CreateCategorie;