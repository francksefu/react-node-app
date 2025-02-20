import { useContext, useState } from "react"

import Modal from "react-modal";
import CreateCategorie from "./CreateAndEditCategorie";
import WarningDeletecategorie from "./WarningDeleteCategorie";

const CategorieShow = ({categorie}) => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalOfDeletion, setModalOfDeletion] = useState(false);

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
                    {categorie.name}
                    </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    <span className={categorie.isHaveLimit ? "bg-green-700 text-white rounded" : "bg-slate-400 text-white rounded"}>{categorie.isHaveLimit}</span>
                    </p>
                </td>
                {categorie.isHaveLimit ? 
                <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {categorie.amountLimit}
                    </p>
                </td> : <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {'No amount Limit set for this categorie'}
                    </p>
                </td>
                }
                
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
                <CreateCategorie closeModal={closeModal} editcategorieItem={categorie}/>
            </Modal>

            <Modal
                isOpen={modalOfDeletion}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModalOfDeletion}
                style={customStylesDeletion}
                contentLabel="Example"
            >
                <WarningDeletecategorie closeModalOfDeletion={closeModalOfDeletion} categorieToDelete={categorie}/>
            </Modal>
        </>
    );
    
}
export default CategorieShow;