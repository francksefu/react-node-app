import { useContext, useState } from "react"
import CategoriesContext from "../../context/categories"
import CategorieShow from "./CategorieShow";
import CreateCategorie from "./CreateAndEditCategorie";
import Modal from "react-modal";
import Loading from "../features/Loading";

const CategoriesList = () => {
    const {categories, loading} = useContext(CategoriesContext);
    const renderedCategories = categories.map((categorie) => {
        return <CategorieShow key={categorie.id} categorie={categorie} />;
    });
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

    Modal.setAppElement('#root');
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpenLoad, setIsOpenLoad] = useState(true);
    //
    const customStylesLoad = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width: '50%',
          border: '0',
          overflow: 'hidden',
          padding: '0 22.5%',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

    //

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function afterOpenModal() {
        console.log('I am open');
    }

    if (loading) {
    
        return (
          <Modal
              isOpen={modalIsOpenLoad}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStylesLoad}
              contentLabel="Example Modal"
            >
              <Loading />
            </Modal>
        );
    
      }

    return(
        <>
            <button className=" mx-auto m-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={openModal}>Create new categories</button>
            <div className="p-6 px-0 overflow-scroll">
                <table className="w-full text-left table-auto min-w-max">
                <thead>
                    <tr>
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Name
                            </p>
                        </th>
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Limit budget?
                            </p>
                        </th>
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Amount limit budget
                            </p>
                        </th>
                        
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Action
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {renderedCategories}
                </tbody>
                </table>
            </div>
            
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <CreateCategorie closeModal={closeModal}/>
            </Modal>
        </>
    );
}

export default CategoriesList;