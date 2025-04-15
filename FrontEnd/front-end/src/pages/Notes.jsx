import React, { useState, useEffect } from 'react'
import NoteLists from '../components/NoteLists'
import AddEditNote from '../components/AddEditNote'
import Popup from '../components/Popup';
import { PlusCircle } from 'lucide-react';

export default function Notes() {
    const [showPopup, setShowPopup] = useState(false);

    const [selectedNote, setSelectedNote] = useState(null);

    const handleEdit = async (noteDetailsPromise) => {
        const noteDetails = await noteDetailsPromise;
        console.log("Edit Note:", noteDetails);
        setSelectedNote(noteDetails);
        console.log(selectedNote);
        setShowPopup(true); // Set the selected note for editing
    };
    useEffect(() => {
        console.log("Updated selectedNote:", selectedNote);
    }, [selectedNote]);

    const handleSave = async (updatedNote) => {
        console.log("Save Note:", updatedNote);
        setSelectedNote(null);
        await setShowPopup(false); // Clear the selected note after saving
    };
    return (
        <>
            <div className="p-6">
                <button
                    className="flex items-center justify-center w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    onClick={() => setShowPopup(true)}
                >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    <span>New Note</span>
                </button>
                <Popup isOpen={showPopup} onClose={() => setShowPopup(false)}>
                    <AddEditNote initialNote={selectedNote} onSave={handleSave} />
                </Popup>
            </div>
            <NoteLists onEdit={handleEdit} />
        </>
    )
}
