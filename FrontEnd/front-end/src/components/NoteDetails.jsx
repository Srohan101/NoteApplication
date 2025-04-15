import React from 'react'

export default function NoteDetails(props) {
    const { note } = props;
    return (
        <>
            <div className='md:w-1/4'>
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2"> {note.title}</div>
                        <p className="text-gray-700 text-base">
                            {note.content}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
