import Home from "./Home";
import { useEffect, useContext, useState } from "react";
import ExpensesContext from "./context/expenses";
import CategoriesContext from "./context/categories";
function App() {
  const {getExpensesAll, loadingAllExpenses} = useContext(ExpensesContext);
  const { getCategories} = useContext(CategoriesContext);
  useEffect(() => {
    getExpensesAll();
    getCategories();
  }, []);
  return(
    <Home />
  );
}

export default App;
