import React, { useState, useEffect } from 'react'
import NoteLists from '../components/NoteLists'
import AddEditNote from '../components/AddEditNote'
import Popup from '../components/Popup';
import { PlusCircle } from 'lucide-react';
import AlertMessage from '../components/AlertMessage';
import NoteViewModal from '../components/NoteViewModal';


export default function Notes() {
    const [showPopup, setShowPopup] = useState(false);
    const [showView, setShowView] = useState(false);

    const [selectedNote, setSelectedNote] = useState(null);
    const [viewedNote, setViewedNote] = useState(null);
    const [alert, setAlert] = useState({ status: null, message: "" });

    const handleEdit = async (noteDetailsPromise) => {
        const noteDetails = await noteDetailsPromise;
        console.log("Edit Note:", noteDetails);
        setSelectedNote(noteDetails);
        console.log(selectedNote);
        setShowPopup(true);
    };
    const handleView = async (noteDetailsPromise) => {
        const noteDetails = await noteDetailsPromise;
        setViewedNote(noteDetails);
        setShowView(true);
    };
    useEffect(() => {
        console.log("Updated selectedNote:", selectedNote);
    }, [selectedNote]);

    const handleSave = async (res) => {
        if (res?.status) {
            setSelectedNote(null);
            setShowPopup(false);
            setAlert({ status: res.status, message: res.message });

            setTimeout(() => {
                setAlert({ status: null, message: "" });
            }, 3000);
        }
    };
    return (
        <>
            <div className="p-6">
                {alert.status != null && (
                    <AlertMessage
                        status={alert.status}
                        message={alert.message}
                        onClose={() => setAlert({ status: null, message: '' })}
                    />
                )}
                <button
                    className="flex items-center px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md"
                    onClick={() => setShowPopup(true)}
                >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    <span>New Note</span>
                </button>

                <Popup isOpen={showPopup} onClose={() => setShowPopup(false)}>
                    <AddEditNote initialNote={selectedNote} onSave={handleSave} />
                </Popup>
                <Popup isOpen={showView} onClose={() => setShowView(false)}>
                    <NoteViewModal initialNote={viewedNote} />
                </Popup>
            </div>
            <NoteLists onEdit={handleEdit} onView={handleView} />
        </>
    )
}
