
import { useContext, useEffect, useState } from "react";
import CategoriesContext from "../../context/categories";
import CategoriesList from "./CategorieList";

function Categorie() {
    const {getCategories, loading} = useContext(CategoriesContext);
  
    useEffect(() => {
      getCategories();
    }, []);
  
    
  
      return (
        <>
          
            <div className="App m-4">
                <h1 className="text-3xl font-bold text-gray-500">
                Categories
                </h1>
                <CategoriesList />
            </div>
          
        </>
        
      );
    
  }
  
  export default Categorie;