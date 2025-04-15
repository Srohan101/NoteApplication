import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "https://localhost:7197/api/Note"
    const notesDetail = [

    ]

    const [notes, setNotes] = useState(notesDetail);

    const getAllNotes = async () => {
        console.log("Getting all notes from server");
        const response = await fetch(`${host}/getNoteDetails`, {
            method: "get",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InN0cmluZyBzdHJpbmcgc3RyaW5nIiwiQ291bnRyeSI6IkFmZ2hhbmlzdGFuIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3RyaW5nIiwiRE9CIjoiNi83LzIwMjQgMTI6Mjk6NDkgUE0iLCJleHAiOjE3NDQ2NzY4MTB9.Hu7wYXuJnVH2FZj5XaVgNId4_lVzVfENUxW1asHPSN4"
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
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InN0cmluZyBzdHJpbmcgc3RyaW5nIiwiQ291bnRyeSI6IkFmZ2hhbmlzdGFuIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3RyaW5nIiwiRE9CIjoiNi83LzIwMjQgMTI6Mjk6NDkgUE0iLCJleHAiOjE3NDQ2NzY4MTB9.Hu7wYXuJnVH2FZj5XaVgNId4_lVzVfENUxW1asHPSN4"
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
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InN0cmluZyBzdHJpbmcgc3RyaW5nIiwiQ291bnRyeSI6IkFmZ2hhbmlzdGFuIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3RyaW5nIiwiRE9CIjoiNi83LzIwMjQgMTI6Mjk6NDkgUE0iLCJleHAiOjE3NDQ2NzY4MTB9.Hu7wYXuJnVH2FZj5XaVgNId4_lVzVfENUxW1asHPSN4"
            },
            body: JSON.stringify(id, title, content, CategoryIds),
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        console.log(response.json());
        await getAllNotes();
    }

    //Delete Note
    const DeleteNote = async (id) => {
        console.log("Deleting id " + id);
        const response = await fetch(`${host}/DeleteNote?Id=${id}`, {
            method: "delete",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InN0cmluZyBzdHJpbmcgc3RyaW5nIiwiQ291bnRyeSI6IkFmZ2hhbmlzdGFuIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3RyaW5nIiwiRE9CIjoiNi83LzIwMjQgMTI6Mjk6NDkgUE0iLCJleHAiOjE3NDQ2NzY4MTB9.Hu7wYXuJnVH2FZj5XaVgNId4_lVzVfENUxW1asHPSN4"
            },
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        console.log(response.json());
        await getAllNotes();
    }


    return (
        <NoteContext.Provider value={{ notes, AddEditNote, DeleteNote, getAllNotes, getNoteById }}>
            {props.children}
        </NoteContext.Provider>
    );
}


export default NoteState;