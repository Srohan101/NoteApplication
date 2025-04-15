import { useEffect, useState } from 'react';
import { Search, Book } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    let location = useLocation();
    useEffect(() => {
        console.log(location);
    }, [location]);

    return (
        <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Book className="h-6 w-6 text-blue-500" />
                <h1 className="text-xl font-bold">NoteMaker</h1>
            </div>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search notes..."
                    className="pl-9 pr-3 py-2 bg-gray-100 rounded-lg outline-none w-64"
                />
            </div>
        </nav>
    );
}