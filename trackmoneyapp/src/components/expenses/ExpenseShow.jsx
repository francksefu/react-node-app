import { useContext, useState } from "react"

import Modal from "react-modal";
import CreateExpense from "./CreateExpense";
import WarningDeleteExpense from "./WarningDeleteExpense";

const ExpenseShow = ({expense}) => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalOfDeletion, setModalOfDeletion] = useState(false);

    /*const handleDelete = (e) => {
        removeExpense(expense.id);
    }*/

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

    const customStylesDeletion = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width: window.innerWidth > 768 ? '50%' : '80%',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

    function openModal() {
        setIsOpen(true);
    }

    function openModalOfDeletion() {
        setModalOfDeletion(true);
    }

    function closeModalOfDeletion() {
        setModalOfDeletion(false);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function afterOpenModal() {
        console.log('debug purpose');
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
                    <button className="m-2 bg-red-500 text-white p-2 rounded" onClick={openModalOfDeletion}>Delete</button>
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

            <Modal
                isOpen={modalOfDeletion}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModalOfDeletion}
                style={customStylesDeletion}
                contentLabel="Example"
            >
                <WarningDeleteExpense closeModalOfDeletion={closeModalOfDeletion} expenseToDelete={expense}/>
            </Modal>
        </>
    );
    
}
export default ExpenseShow;