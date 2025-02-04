import  { createContext, useState } from 'react';

const ExpensesContext = createContext();

const Provider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    let port = '3001';
    const getExpenses = async () => {
        const url = `http://localhost:${port}/expenses`;
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Network was not good');

            const storedExpenses = await response.json();
            //update the expenses
            
            if (storedExpenses) {
                setLoading(false);
                setExpenses(JSON.parse(storedExpenses.expenses));
            }
            
        } catch (error) {
            setLoading(false);
            console.error('Error during the get process : ', error);
        }
    };

    const  createExpense = async (date, amount, description, idCategorie) => {
        //call an API to create new expenses
        setLoading(true);
        const url = `http://localhost:${port}/expenses`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'amount' : amount, 
                    'date' : date, 
                    'description' : description, 
                    'idCategorie' : idCategorie,
                }),
            });

            if (!response.ok) throw new Error('Network response was not good');
            const responseData = await response.json();
            if (responseData) {
                setExpenses(JSON.parse(responseData));
            }
            
            
        } catch (error) {
            console.error('Error occured when creating a new expense : ', error);
        }
    };

    //remove 
    const removeExpense = async (id) => {
        setLoading(true);
        const url = `http://localhost:${port}/expenses/${id}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json',
                }
            });
            
            if (!response.ok) throw new Error('Network problem');

            const responseData = response.json();
            setExpenses(JSON.parse(responseData));
            setLoading(false);
        } catch (error) {
            console.error('Error durin delete process: ', error);
        }
    };

    const changeExpense = async (amount, date, description, idCategorie, id) => {
        const url = `http://localhost:${port}/expenses/${id}`;
        const data = {amount, date, description, idCategorie, id};
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            if (!response.ok) throw new Error('Network problem');
            
            const responseData = response.json();
            setExpenses(JSON.parse(responseData));
            setLoading(false);
        } catch (error) {
            console.error('An error occur in update process');
        }
    };

    const shared = {expenses, getExpenses, createExpense, removeExpense, changeExpense, loading};

    return (
        <ExpensesContext.Provider value={shared}>{children}</ExpensesContext.Provider>
    )
};

export default ExpensesContext;
export {Provider};