import  { createContext, useState } from 'react';

const CategoriesContext = createContext();

const ProviderC = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    //let port = '3001';
    let baseUrl = 'http://localhost:3001';
    const getCategories = async (returnValueMyself = false) => {
        const url = `${baseUrl}/categories`;
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem('token'),
                },
            });
            if (!response.ok) throw new Error('Network was not good');

            const storedCategories = await response.json();
            //update the categories
            if (storedCategories && returnValueMyself) {
                let data = JSON.parse(storedCategories.categories);
                data = data.map((categori) => {return {value: categori.id, label: categori.name}})
                return {options: data};
            }
            else if(storedCategories) {
                setLoading(false);
                setCategories(JSON.parse(storedCategories.categories));
            }
            
        } catch (error) {
            setLoading(false);
            console.error('Error during the get process : ', error);
        }
    };

    const  createCategorie = async (name, isHaveLimit, amountLimit) => {
        //call an API to create new categories
        setLoading(true);
        const url = `${baseUrl}/categories`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem('token'),
                },
                body: JSON.stringify({
                    'name' : name,
                    'isHaveLimit' : isHaveLimit,
                    'amountLimit' : amountLimit,
                }),
            });

            if (!response.ok) throw new Error('Network response was not good');
            const responseData = await response.json();
            if (responseData) {
                setCategories(JSON.parse(responseData.categories));
            }
            setLoading(false);
            
        } catch (error) {
            console.error('Error occured when creating a new categorie : ', error);
        }
    };

    //remove 
    const removeCategorie = async (id) => {
        setLoading(true);
        const url = `${baseUrl}/categories/${id}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json',
                    'authorization': sessionStorage.getItem('token'),
                }
            });
            
            if (!response.ok) throw new Error('Network problem');
                const responseData = await response.json();
                if (responseData) {
                    setCategories(JSON.parse(responseData.categories));
                }
                setLoading(false);
        } catch (error) {
            console.error('Error durin delete process: ', error);
        }
    };

    const changeCategorie = async (name, isHaveLimit, amountLimit, id) => {
        const url = `${baseUrl}/categories/${id}`;
        const data = {name, isHaveLimit, amountLimit, id};
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem('token'),
                },
                body: JSON.stringify(data),
            });
            
            if (!response.ok) throw new Error('Network problem');
            
            const responseData = await response.json();
            if (responseData) {
                setCategories(JSON.parse(responseData.categories));
            }
            setLoading(false);
        } catch (error) {
            console.error('An error occur in update process');
        }
    };

    const shared = {categories, getCategories, createCategorie, removeCategorie, changeCategorie, loading};

    return (
        <CategoriesContext.Provider value={shared}>{children}</CategoriesContext.Provider>
    )
};

export default CategoriesContext;
export {ProviderC};