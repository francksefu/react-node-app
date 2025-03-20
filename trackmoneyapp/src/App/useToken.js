import React, {useState} from "react";

const useToken = () => {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        if (tokenString !== null) {
            console.log('g : ' + tokenString);
            const userToken = (tokenString)
            return userToken
        }
        return null;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        if (userToken) {
            console.log(userToken)
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