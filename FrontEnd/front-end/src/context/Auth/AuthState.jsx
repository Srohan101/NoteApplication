import React from 'react'
import AuthContext from './AuthContext';

function AuthState(props) {
    const host = "https://localhost:7197";

    const getDropDown = async (DDType) => {
        const response = await fetch(`${host}/getDropDown?DDType=${DDType}`, {
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const json = await response.json();
        console.log(json);
        return json;
    }
    return (

        <AuthContext.Provider value={{ getDropDown }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
