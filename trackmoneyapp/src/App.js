import { useContext, useEffect, useState } from "react";
import ExpensesContext from "./context/expenses";
import ExpensesList from "./components/expenses/ExpensesList";
import Loading from "./components/features/Loading";
import Modal from "react-modal";

function App() {
  const {getExpenses, loading} = useContext(ExpensesContext);

  useEffect(() => {
    getExpenses();
  }, []);

  const [modalIsOpen, setIsOpen] = useState(true);

  

    return (
      <>
        <div className="App m-4">
          <h1 className="text-3xl font-bold text-gray-500">
            Expenses
          </h1>
          <ExpensesList />
        </div>
        
      </>
      
    );
  
}

export default App;
