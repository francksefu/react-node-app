import { useContext } from "react";
import CategoriesContext from "../../context/categories";

const WarningDeleteCategorie = ({closeModalOfDeletion, categorieToDelete}) => {
    const { removeCategorie} = useContext(CategoriesContext);

    const handleDelete = () => {
        removeCategorie(categorieToDelete.id)
        closeModalOfDeletion();
    }
    return(
        <>
            <div className="p-4 text-slate-500">
                <p className="p-2">
                    Do you really want to delete this categories and all expenses associated on it? with name : <span className="text-red-300">{categorieToDelete.name}</span><br/>
                    witch have the id of <span className="text-red-300">{categorieToDelete.id}</span>?
                </p>
                <div className="justify-between">
                    <button className="m-2 bg-red-500 text-white p-2 rounded" onClick={handleDelete}>Delete</button>
                    <button className="text-white bg-slate-800 p-2 rounded" onClick={closeModalOfDeletion}>Cancel</button>
                </div>
            </div>
        </>
    );
}

export default WarningDeleteCategorie;