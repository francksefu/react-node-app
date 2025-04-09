
import { useContext, useEffect, useState } from "react";
import ExpensesContext from "../../context/expenses";
import ExpensesList from "./ExpensesList";

function Expense() {
    const {getExpenses, loading} = useContext(ExpensesContext);
  
    useEffect(() => {
      getExpenses();
    }, []);
  
    
  
      return (
        <>
            <div>
                <ExpensesList />
            </div>
          
        </>
        
      );
    
  }
  
  export default Expense;