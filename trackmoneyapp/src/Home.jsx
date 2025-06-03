import { useEffect, useContext } from "react";
import ExpensesContext from "./context/expenses";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import CategoriesContext from "./context/categories";
import BarChart from "./components/features/barchart";
import UsersContext from "./context/user";

export default function Home() {
  const {getExpensesAll, loadingAllExpenses, expensesAll} = useContext(ExpensesContext);
  const { getCategories, categories, loading} = useContext(CategoriesContext);
  const {token} = useContext(UsersContext);
  useEffect(() => {
    getExpensesAll();
    getCategories();
  }, []);

  function expenseToCalculateForChart() {
    let dataExpenses = [];
    let expenseFilterByCategori = [];
    categories.map((categorie) => {
      expenseFilterByCategori = expensesAll.filter((expense) => categorie.id === expense.idCategorie)
      let arrayToReduce = [];
      if (expenseFilterByCategori.length === 0) {
        arrayToReduce.push(0)
      } else {
        for (let i = 0; i < expenseFilterByCategori.length; i++) {
          arrayToReduce.push(expenseFilterByCategori[i].amount)
        }
      }
      
      dataExpenses.push(arrayToReduce.reduce((acc, current) => acc + current))
    })
    return dataExpenses;
  }
  const chartData = {
    labels: categories.map((data) => data.name), 
    datasets: [
      {
        label: "Total expenses related to this categorie",
        data: expenseToCalculateForChart(),
        backgroundColor: [
          "rgba(75,192,192,1)",
          
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  };
    if (loading && loadingAllExpenses) {
       return (
        <div>
          wait ..
        </div>
       )
    }
    Chart.register(CategoryScale);
    return (
      <section className="mx-auto p-2 content-center">
        <div className="mx-auto py-4 px-6 grid grid-cols-1 sm:grid-cols-3">
          <div className="col-span-1 grid grid-rows-1 sm:grid-rows-3">
          <div className="row-span-1"></div>
          <h1 className="text-5xl sm:row-span-2 row-span-1  font-bold text-slate-700 py-4 text-center">Hello everyone, Welcome here!<br/> Track your money easily with us</h1>
          </div>
          {token ? (
            <div id="chart" className="px-4 col-span-1 sm:col-span-2 h-50">
              <BarChart BarChart={chartData} />
            </div>
          ) : ''}
          
        </div>
        <div className="grid sm:grid-cols-3 grid-cols-1 content-center p-3">
          <div className="max-w-sm sm:animate-bounce hover:animate-none p-6 bg-gray-300 border border-green-200 rounded-lg shadow-lg ">
              <svg className="w-7 h-7 text-black dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
              </svg>
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-black">Track my money app</h5>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">You don't need to be an accountant men to track all your expenses you know, just write it here by category and track them</p>
          </div>
          <div className="max-w-sm p-6 bg-orange-300 border border-green-200 rounded-lg shadow-lg ">
              <svg className="w-7 h-7 text-black dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
              </svg>
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-black">How to use <span className="text-3xl">🤔</span></h5>
              <p className="mb-3 font-normal text-black ">After login or create a simple account, add a category, and after that add differents expenses linked to your category and let the app do the math for you!<span className="text-3xl">⚡</span></p>
          </div>
          <div className="max-w-sm p-6 bg-gray-300 border border-green-200 rounded-lg shadow-lg ">
              <svg className="w-7 h-7 text-black dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
              </svg>
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-black">Track my money app</h5>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400"><span className="text-3xl">👌</span>Enjoy dude !<span className="text-4xlxs">🔥</span></p>
          </div>
        </div>
      </section>
    );
  
}