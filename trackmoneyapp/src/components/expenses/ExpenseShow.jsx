import { useContext, useState } from "react"
import ExpensesContext from "../../context/expenses";
import Modal from "react-modal";
import CreateExpense from "./CreateExpense";

const ExpenseShow = ({expense}) => {
    const { removeExpense} = useContext(ExpensesContext);
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleDelete = (e) => {
        removeExpense(expense.id);
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width: '80%',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function afterOpenModal() {
        console.log('I am open');
    }

    return(
        <>
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
                    <button className="m-2 bg-red-500 text-white p-2 rounded" onClick={handleDelete}>Delete</button>
                    <button className="bg-blue-500 text-white p-2 rounded" onClick={openModal}>Edit</button>
                </td>
            </tr>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <CreateExpense closeModal={closeModal} editExpenseItem={expense}/>
            </Modal>
        </>
    );
    
}
export default ExpenseShow;