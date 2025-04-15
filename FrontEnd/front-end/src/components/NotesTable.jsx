import React, { useState, useContext } from 'react';
import { Eye, Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import NoteContext from '../context/Notes/noteContext';
import AlertMessage from '../components/AlertMessage';


export default function NotesTable({ notesIni = [], onEdit, onView }) {
    const context = useContext(NoteContext);
    const { DeleteNote, getNoteById } = context;
    const [alert, setAlert] = useState({ status: null, message: "" });

    const notes = notesIni;
    const [sortField, setSortField] = useState('createdDate');
    const [sortDirection, setSortDirection] = useState('desc');

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortedNotes = [...notes].sort((a, b) => {
        if (sortField === 'createdDate') {
            const dateA = new Date(a[sortField]);
            const dateB = new Date(b[sortField]);
            return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        } else {
            const valueA = a[sortField]?.toString().toLowerCase() || '';
            const valueB = b[sortField]?.toString().toLowerCase() || '';
            return sortDirection === 'asc'
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        }
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const SortableHeader = ({ field, children }) => (
        <th
            scope="col"
            className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
            onClick={() => handleSort(field)}
        >
            <div className="flex items-center justify-between">
                <span>{children}</span>
                <div className="flex flex-col ml-1">
                    <ArrowUp
                        className={`w-3 h-3 ${sortField === field && sortDirection === 'asc' ? 'text-blue-600' : 'text-gray-300'}`}
                    />
                    <ArrowDown
                        className={`w-3 h-3 ${sortField === field && sortDirection === 'desc' ? 'text-blue-600' : 'text-gray-300'}`}
                    />
                </div>
            </div>
        </th>
    );

    const handleView = (id) => {
        console.log(`View note with ID: ${id}`);
        const noteDetail = getNoteById(id);
        onView(noteDetail);
    };

    const handleEdit = (id) => {
        console.log(`Edit note with ID: ${id}`);
        const noteDetail = getNoteById(id);
        onEdit(noteDetail);
        // Add your edit functionality here
    };

    const handleDelete = async (id) => {
        console.log(`Delete note with ID: ${id}`);
        const res = await DeleteNote(id);
        if (res?.status) {
            setSelectedNote(null);
            setShowPopup(false);
            setAlert({ status: res.status, message: res.message });

            setTimeout(() => {
                setAlert({ status: null, message: "" });
            }, 3000);
        }
        // Add your delete functionality here
    };

    return (
        <>
            {alert.status != null && (
                <AlertMessage
                    status={alert.status}
                    message={alert.message}
                    onClose={() => setAlert({ status: null, message: '' })}
                />
            )}
            <div className="overflow-hidden bg-white rounded-lg shadow-sm border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                SN
                            </th>
                            <SortableHeader field="title">Title</SortableHeader>
                            <SortableHeader field="category">Category</SortableHeader>
                            <SortableHeader field="createdDate">Created Date</SortableHeader>
                            <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {sortedNotes.map((note, index) => (
                            <tr key={note.id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                    {note.title}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <div className="flex flex-wrap gap-1 max-w-xs">
                                        {note.category.split(',').map((cat, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">
                                                {cat.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(note.createdDate)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="flex justify-center space-x-4">
                                        <button
                                            onClick={() => handleView(note.id)}
                                            className="text-blue-600 hover:text-blue-800 transition-colors"
                                            title="View"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(note.id)}
                                            className="text-amber-500 hover:text-amber-700 transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(note.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {sortedNotes.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    No notes found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}