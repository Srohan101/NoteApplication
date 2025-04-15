import React, { useState } from 'react'
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

    const userRegistration = async (payload) => {
        const response = await fetch(`${host}/userRegistration`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const json = await response.json();
        console.log(json);
        return json;
    }

    const getToken = async (payload) => {

        const response = await fetch(`${host}/getToken`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const json = await response.json();
        console.log(json);
        localStorage.setItem("token", json.token);
    }

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            // Optional: fetch user info using token or decode token
            setUser({}); // Set actual user
        }
    }, [token]);

    const login = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };




    return (

        <AuthContext.Provider value={{ getDropDown, userRegistration, getToken }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
