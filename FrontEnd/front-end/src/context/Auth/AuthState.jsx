import React, { useState, useEffect } from 'react'
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
        try {

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
            return { status: json.status, message: json.message };
        } catch (error) {
            return { status: false, message: error.message };
        }
    }

    const getToken = async (payload) => {
        try {
            const response = await fetch(`${host}/getToken`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            // Check if it's JSON before parsing
            const contentType = response.headers.get("Content-Type");
            let json = {};
            if (contentType && contentType.includes("application/json")) {
                json = await response.json();
            }

            if (!response.ok) {
                const errorMessage = json?.message || "Invalid username or password.";
                return { status: false, message: errorMessage };
            }

            if (json.token) {
                login(json.token);
                return { status: true, message: `Welcome ${json.name || ''}` };
            } else {
                return { status: false, message: "Token not received. Try again." };
            }
        } catch (error) {
            console.error("Error in getToken:", error); // You should see this if it throws
            return {
                status: false,
                message: "Something went wrong. Please try again later.",
            };
        }
    };



    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            // Optional: fetch user info using token or decode token
            setUser({}); // Set actual user
        }
    }, [token]);

    const login = (token) => {
        console.log("token");
        localStorage.setItem("token", token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };




    return (

        <AuthContext.Provider value={{ getDropDown, userRegistration, getToken, token }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
