import React, { useState, useEffect, useContext } from 'react';
import { Save, X } from 'lucide-react';
import MultiSelect from './MultiSelect';
import NoteContext from '../context/Notes/noteContext';
import AuthContext from '../context/Auth/AuthContext';

const AddEditNote = ({ onCancel, initialNote = null, noteDetails, onSave }) => {
    const context = useContext(NoteContext);
    const { AddEditNote } = context;

    const authContext = useContext(AuthContext);
    const { getDropDown } = authContext;

    const [note, setNote] = useState({ id: 0, Title: "", Content: "", CategoryIds: [] });



    useEffect(() => {
        if (initialNote) {
            console.log("Note Details:", initialNote);
            setNote({
                id: initialNote.id,
                Title: initialNote.title, // Matches the form field for title
                Content: initialNote.content, // Matches the form field for content
                CategoryIds: initialNote.categoryIds, // Matches the form field for categories
            });
        }
    }, [initialNote]);


    const [categoryOptions, setCategoryOptions] = useState([]); // State to store resolved categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getDropDown('Category'); // Resolve the Promise
                setCategoryOptions(categories || []); // Set the resolved categories
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, [getDropDown]);

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const onCategoryChange = (selectedIds) => {
        setNote({ ...note, CategoryIds: selectedIds });
    };

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!note.Title.trim()) return setError('Title is required');
        if (!note.Content.trim()) return setError('Content is required');
        if (note.CategoryIds.length === 0) return setError('Please select at least one category');

        const res = await AddEditNote(note); // Make sure this returns status + message
        if (res?.status) {
            onSave(res); // pass response up to Notes
        } else {
            setError(res.message || "Something went wrong.");
        }
    };

    const handleSave = () => {
        onSave({ title, content });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    {initialNote ? 'Edit Note' : 'Add New Note'}
                </h2>
                {onCancel && (
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="Title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="Title"
                        value={note.Title}
                        onChange={onChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Note title"
                    />
                </div>

                <div>
                    <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-1">
                        Categories
                    </label>
                    <MultiSelect
                        options={categoryOptions}
                        selectedIds={note.CategoryIds}
                        onChange={onCategoryChange}
                        placeholder="Select categories"
                        className="w-full"
                    />
                </div>

                <div>
                    <label htmlFor="Content" className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                    </label>
                    <textarea
                        id="Content"
                        name="Content"
                        value={note.Content}
                        onChange={onChange}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write your note here..."
                    />
                </div>

                <div className="flex justify-end pt-2">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 mr-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <Save size={16} className="mr-1" />
                        {initialNote ? 'Update Note' : 'Save Note'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEditNote;