import React from 'react';

const AlertMessage = ({ status = 'success', message }) => {
    const baseStyle = 'px-4 py-3 rounded-md shadow-md mb-4 text-sm font-medium';
    const typeStyle = {
        true: 'bg-blue-100 text-blue-700 border border-blue-300',
        false: 'bg-red-100 text-red-700 border border-red-300',
    };

    return (
        <div className={`${baseStyle} ${typeStyle[status]}`}>
            {message}
        </div>
    );
};

export default AlertMessage;