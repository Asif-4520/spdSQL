import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, title, children }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-3 sm:p-0'>
            <div
                ref={ref}
                className='bg-(--bg-panel) border border-(--border-color) shadow-2xl rounded-2xl w-full max-w-md overflow-hidden animate-scale-in max-h-[90vh] flex flex-col'
            >
                <div className='flex items-center justify-between px-3 sm:px-5 py-3 sm:py-4 border-b border-(--border-color) bg-(--bg-title-bar) shrink-0'>
                    <h3 className='font-semibold text-(--text-primary) text-sm sm:text-base truncate mr-2'>
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className='p-1.5 sm:p-2 text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-activity-bar) rounded-lg transition-colors shrink-0'
                    >
                        <X size={16} className='sm:w-4.5 sm:h-4.5' />
                    </button>
                </div>
                <div className='p-3 sm:p-5 text-(--text-primary) overflow-auto flex-1'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
