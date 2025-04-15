import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';


export default function Alert({
    type = 'info',
    title,
    message,
    isOpen = false,
    duration = 5000,
    onClose = () => { }
}) {
    const [visible, setVisible] = useState(isOpen);

    useEffect(() => {
        setVisible(isOpen);


        let timer;
        if (isOpen && duration > 0) {
            timer = setTimeout(() => {
                setVisible(false);
                onClose();
            }, duration);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isOpen, onClose, duration]);

    const handleClose = () => {
        setVisible(false);
        onClose();
    };

    if (!visible) return null;

    // Alert configs based on type
    const alertConfig = {
        success: {
            icon: <CheckCircle className="h-6 w-6" />,
            bgColor: 'bg-green-50',
            borderColor: 'border-green-400',
            textColor: 'text-green-800',
            iconColor: 'text-green-500',
            buttonColor: 'text-green-500 hover:bg-green-100'
        },
        error: {
            icon: <XCircle className="h-6 w-6" />,
            bgColor: 'bg-red-50',
            borderColor: 'border-red-400',
            textColor: 'text-red-800',
            iconColor: 'text-red-500',
            buttonColor: 'text-red-500 hover:bg-red-100'
        },
        warning: {
            icon: <AlertCircle className="h-6 w-6" />,
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-400',
            textColor: 'text-yellow-800',
            iconColor: 'text-yellow-600',
            buttonColor: 'text-yellow-600 hover:bg-yellow-100'
        },
        info: {
            icon: <Info className="h-6 w-6" />,
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-400',
            textColor: 'text-blue-800',
            iconColor: 'text-blue-500',
            buttonColor: 'text-blue-500 hover:bg-blue-100'
        }
    };

    const config = alertConfig[type] || alertConfig.info;

    return (
        <div className="fixed top-4 right-4 z-50 max-w-md w-full animate-fade-in shadow-md">
            <div className={`rounded-lg border ${config.borderColor} ${config.bgColor} p-4`}>
                <div className="flex items-start">
                    <div className={`flex-shrink-0 ${config.iconColor}`}>
                        {config.icon}
                    </div>
                    <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                            {title && (
                                <h3 className={`text-sm font-medium ${config.textColor}`}>
                                    {title}
                                </h3>
                            )}
                            <button
                                type="button"
                                className={`ml-auto -mr-1 -mt-1 rounded-md p-1.5 ${config.buttonColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                onClick={handleClose}
                            >
                                <span className="sr-only">Dismiss</span>
                                <X className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                        {message && (
                            <p className={`mt-1 text-sm ${config.textColor}`}>{message}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Add a keyframe animation in your global CSS
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
  }
`;
document.head.appendChild(styleTag);