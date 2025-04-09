import React, {useState} from "react";

const useToken = () => {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        if (tokenString !== null) {
            const userToken = (tokenString)
            return userToken
        }
        return null;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        if (userToken) {
            sessionStorage.setItem('token', userToken);
            setToken(userToken?.token)
        } else {
            
        }
        
    }
    return {
        setToken: saveToken,
        token
    }
}

export default useToken;