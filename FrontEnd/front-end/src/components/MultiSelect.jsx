import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';

const MultiSelect = ({
    options = [],
    selectedIds = [],
    onChange,
    placeholder = "Select options",
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (id, event) => {
        event.preventDefault();
        event.stopPropagation();

        const updated = selectedIds.includes(id)
            ? selectedIds.filter((sid) => sid !== id)
            : [...selectedIds, id];
        onChange(updated);
    };

    const removeSelected = (id, event) => {
        event.stopPropagation();
        onChange(selectedIds.filter(sid => sid !== id));
    };

    // Get selected option objects
    const selectedOptions = options.filter(option => selectedIds.includes(option.id));

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div
                className={`flex items-center min-h-10 pl-3 pr-2 py-2 border rounded-md shadow-sm bg-white cursor-pointer
          ${isOpen ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300 hover:border-gray-400'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex flex-wrap gap-1 flex-grow mr-2">
                    {selectedOptions.length > 0 ? (
                        selectedOptions.map((option) => (
                            <div
                                key={option.id}
                                className="inline-flex items-center bg-blue-50 text-blue-700 text-sm px-2 py-1 rounded"
                            >
                                {option.name}
                                <button
                                    onClick={(e) => removeSelected(option.id, e)}
                                    className="ml-1 text-blue-400 hover:text-blue-600 focus:outline-none"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <span className="text-gray-500">{placeholder}</span>
                    )}
                </div>

                <div className="flex-shrink-0">
                    <ChevronDown
                        size={18}
                        className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                    />
                </div>
            </div>

            {isOpen && (
                <div className="absolute mt-1 w-full border border-gray-200 rounded-md bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
                    {options.length === 0 ? (
                        <div className="px-4 py-2 text-sm text-gray-500">No options available</div>
                    ) : (
                        options.map((option) => {
                            const isSelected = selectedIds.includes(option.id);
                            return (
                                <div
                                    key={option.id}
                                    className={`flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors duration-150
                    ${isSelected ? 'bg-blue-50' : ''}`}
                                    onClick={(e) => toggleOption(option.id, e)}
                                >
                                    <div className={`flex-shrink-0 w-5 h-5 border rounded ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'} flex items-center justify-center`}>
                                        {isSelected && <Check size={12} className="text-white" />}
                                    </div>
                                    <span className={`ml-2 ${isSelected ? 'font-medium text-blue-700' : 'text-gray-700'}`}>
                                        {option.name}
                                    </span>
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;