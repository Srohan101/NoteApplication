import React, { useContext, useState, useEffect } from 'react'
import NoteContext from '../context/Notes/noteContext'
import NoteDetails from './NoteViewModal'
import NotesTable from './NotesTable';
import MultiSelect from './MultiSelect';

export default function NoteLists({ onEdit, onView }) {

    const [categoryOptions, setCategoryOptions] = useState([]); // State to store resolved categories





    const handleEdit = (noteDetails) => {
        onEdit(noteDetails);
    };
    const handleView = (noteDetails) => {
        onView(noteDetails);
    };


    const context = useContext(NoteContext);
    const { notes, getAllNotes } = context;
    useEffect(() => {
        getAllNotes();
    }, []);
    return (
        <>
            <h2>Notes Details:</h2>
            <NotesTable notesIni={notes} onEdit={handleEdit} onView={handleView} />
            {/* <div className='flex flex-wrap gap-4'>
                {notes.map((note) => {
                    return <NoteDetails note={note} />
                })}

            </div> */}
        </>
    )
}
