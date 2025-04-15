import React, { useContext, useState, useEffect } from 'react'
import NoteContext from '../context/Notes/noteContext'
import NoteDetails from './NoteDetails'
import NotesTable from './NotesTable';
import MultiSelect from './MultiSelect';

export default function NoteLists({ onEdit }) {

    const categories = [
        { id: 1, name: 'Work' },
        { id: 2, name: 'Personal' },
        { id: 3, name: 'Ideas' },
        { id: 4, name: 'Urgent' }
    ];

    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);


    const handleChange = (ids) => {
        setSelectedCategoryIds(ids);
    };

    const handleEdit = (noteDetails) => {
        onEdit(noteDetails);
    };


    const context = useContext(NoteContext);
    const { notes, getAllNotes } = context;
    useEffect(() => {
        getAllNotes();
    }, []);
    return (
        <>
            <MultiSelect
                options={categories}
                selectedIds={selectedCategoryIds}
                onChange={handleChange}
            />
            <div className="mt-4 text-sm text-gray-600">
                Selected IDs: {JSON.stringify(selectedCategoryIds)}
            </div>
            <h2>Notes Details:</h2>
            <NotesTable notesIni={notes} onEdit={handleEdit} />
            {/* <div className='flex flex-wrap gap-4'>
                {notes.map((note) => {
                    return <NoteDetails note={note} />
                })}

            </div> */}
        </>
    )
}
