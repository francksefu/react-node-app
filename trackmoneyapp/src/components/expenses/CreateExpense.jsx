import { useContext, useEffect, useState } from "react"
import ExpensesContext from "../../context/expenses";
import CategoriesContext from "../../context/categories";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateExpense = ({closeModal ,editExpenseItem = null}) => {
    const [id, setId] = useState(editExpenseItem ? editExpenseItem.id : null);
    const [idCategorie, setIdCategorie] = useState(editExpenseItem ? editExpenseItem.idCategorie : null);
    const { createExpense, changeExpense } = useContext(ExpensesContext);
    const {categories,getCategories} = useContext(CategoriesContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
        getCategories();
    }, [isMenuOpen])
    const options = categories.map((categori) => {return {value: categori.id, label: categori.name}})
    const formik = useFormik({
        initialValues: {
          amount: editExpenseItem ? editExpenseItem.name : '',
          dateT: editExpenseItem ? editExpenseItem.date.slice(0, 16) : new Date().toISOString().slice(0, 16),
          description: editExpenseItem ? editExpenseItem.amountLimit : '',
        },
        validationSchema: Yup.object({
          amount: Yup.number()
            .required('This field is required'),
          dateT: Yup.date()
            .required('Required'),
          description: Yup.string()
                 
        }),
        onSubmit: values => {
            if(idCategorie) {
                if (editExpenseItem) {
                    changeExpense(values.amount, values.dateT, values.description, idCategorie, id);
                } else {
                    createExpense(values.dateT, values.amount, values.description, idCategorie );
                }
            }
            closeModal();
          },
      });

    return(
        <>
        <form className="max-w-sm mx-auto">
            <div className="mb-5">
                <label htmlFor="dateT" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                <input
                    type="datetime-local"
                    id="dateT"
                    name="dateT"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={formik.values.dateT}
                    onChange={formik.handleChange}
                />
                {formik.errors.dateT ? (
                    <div><small className="text-red-500">{formik.errors.dateT}</small></div>
                ) : null}
                <div>
                    <label>Set categorie</label>
                    <Select
                        name="idCategorie"
                        id="idCategorie"
                        value={options.filter((categ) => categ.value == idCategorie)[0]}
                        onChange={(e) => setIdCategorie(e.value)}
                        options={options}
                        onMenuOpen={() => setIsMenuOpen(true)}
                        onMenuClose={() => setIsMenuOpen(false)}
                    />
                    {!(idCategorie) ? (
                    <div><small className="text-red-500">You must choose something</small></div>
                ) : null}
                    
                </div>
                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                <input
                    type="number"
                    id="amount"
                    range="0.001"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                />
                {formik.errors.amount ? (
                    <div><small className="text-red-500">{formik.errors.amount}</small></div>
                ) : null}

                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                <textarea
                    id="message"
                    rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."
                    defaultValue={formik.values.description}
                    onChange={formik.handleChange}
                >
                </textarea>
                {formik.errors.description ? (
                    <div><small className="text-red-500">{formik.errors.description}</small></div>
                ) : null}

                <button type="submit" onClick={formik.handleSubmit} className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
        </form>
        </>
    );
}

export default CreateExpense;