import Home from "./Home";
import { useEffect, useContext, useState } from "react";
import ExpensesContext from "./context/expenses";
import CategoriesContext from "./context/categories";
import UsersContext from "./context/user";
function App() {
  const {token, setToken} = useContext(UsersContext);
  const {getExpensesAll, loadingAllExpenses} = useContext(ExpensesContext);
  const { getCategories} = useContext(CategoriesContext);
  
  return(
    <Home />
  );
}

export default App;
