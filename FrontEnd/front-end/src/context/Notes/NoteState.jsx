import React, { useState, useContext } from "react";
import NoteContext from "./noteContext";
import AuthContext from '../Auth/AuthContext';
const NoteState = (props) => {
    const ip = import.meta.env.VITE_API_IP;
    const port = import.meta.env.VITE_API_PORT;
    const host = `https://${ip}:${port}/api/Note`;
    console.log(host);
    const notesDetail = [

    ]
    const authContext = useContext(AuthContext);

    const { token } = authContext;
    const [notes, setNotes] = useState(notesDetail);

    const getAllNotes = async () => {
        const response = await fetch(`${host}/getNoteDetails`, {
            method: "get",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            },
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const json = await response.json();
        setNotes(json);
    }

    const getNoteById = async (id) => {
        const response = await fetch(`${host}/getNoteDetailsById?Id=${id}`, {
            method: "get",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + token

            },
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const json = await response.json();
        return json;
    }


    const AddEditNote = async (id, title, content, CategoryIds) => {
        const response = await fetch(`${host}/AddNote`, {
            method: "post",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + token

            },
            body: JSON.stringify(id, title, content, CategoryIds),
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const json = await response.json();
        await getAllNotes();
        return { status: json.status, message: json.message };

    }

    //Delete Note
    const DeleteNote = async (id) => {
        console.log("Deleting id " + id);
        const response = await fetch(`${host}/DeleteNote?Id=${id}`, {
            method: "delete",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + token

            },
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const json = await response.json();
        await getAllNotes();
        return { status: json.status, message: json.message };

    }


    return (
        <NoteContext.Provider value={{ notes, AddEditNote, DeleteNote, getAllNotes, getNoteById }}>
            {props.children}
        </NoteContext.Provider>
    );
}


export default NoteState;