import  { createContext, useState } from 'react';

const UsersContext = createContext();

const ProviderU = ({ children }) => {
    const [token, setToken] = useState(sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '');
    const [loading, setLoading] = useState(true);
    const [activeMenu, setActiveMenu] = useState('Home');
    let port = '3001';
    let baseUrl = 'http://localhost';
    const signUser = async ({username, password, names = null, dateT = null}, url) => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password, names, dateT}),
            });

            if (!response.ok) throw new Error('Network response was not good');
            const responseData = await response.json();
            if (responseData) {
                console.log(responseData)
                setToken(responseData.token);
                sessionStorage.setItem('token', responseData.token);
            }
        } catch (error) {
            console.error('Error occured when creating a new expense : ', error);
        }
    };

    const shared = {token, setToken, signUser, loading, activeMenu, setActiveMenu};

    return (
        <UsersContext.Provider value={shared}>{children}</UsersContext.Provider>
    )
};

export default UsersContext;
export {ProviderU};