import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const NoteViewModal = ({ noteId, onClose, initialNote = null }) => {
    const [note, setNote] = useState({ title: "", content: "", categories: "" });

    useEffect(() => {
        console.log("Note ID:");
        if (initialNote) {
            console.log("Note Details:", initialNote);
            setNote({
                title: initialNote.title, // Matches the form field for title
                content: initialNote.content, // Matches the form field for content
                categories: initialNote.categories, // Matches the form field for categories
            });
        }
    }, [initialNote]);
    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">

            <h1 className="text-2xl font-semibold mb-4">Note Details</h1>
            <h2 className="text-2xl font-semibold mb-4">{note.title}</h2>
            <p className="text-sm text-gray-600 mb-2">Categories: {note.categories}</p>
            <div className="text-gray-800 whitespace-pre-wrap">
                {note.content}
            </div>
        </div>
    );
};

export default NoteViewModal;
