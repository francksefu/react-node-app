import { useContext, useEffect, useState } from "react";
import ExpensesContext from "./context/expenses";
import ExpensesList from "./components/expenses/ExpensesList";
import Navbar from "./components/features/Navbar";
function App() {
  const {getExpenses, loading} = useContext(ExpensesContext);

    return (
      <>
        <div className="mx-auto py-4 px-6">
          <h1 className="text-5xl text-slate-700 py-4 text-center">Hello everyone, welcome Mr name</h1>
          <div className="grid grid-cols-2 px-4">
            <p className="border-gray-500 border p-4 rounded-lg mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:me-3 first-letter:float-start">
              Hello mr user, this is your dashbord where you can see your differents expenses, you can add them, delete them and track them
              don't forget to give us your feed back about this application. Thank you a lot
            </p>
            <div id="chart" className="px-4">
              
            </div>
          </div>
          <h2 className="text-3xl p-5">
            Enjoy!
          </h2>
        </div>
      </>
      
    );
  
}

export default App;
