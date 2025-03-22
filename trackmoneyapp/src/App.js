import { useContext, useEffect, useState } from "react";
import ExpensesContext from "./context/expenses";
import ExpensesList from "./components/expenses/ExpensesList";
import Navbar from "./components/features/Navbar";
function App() {
  const {getExpenses, loading} = useContext(ExpensesContext);

    return (
      <>
        <Navbar />
        <div className="App m-4">
          <h1 className="text-3xl font-bold text-gray-500">
            Expenses1
          </h1>
          <ExpensesList />
        </div>
        
      </>
      
    );
  
}

export default App;
