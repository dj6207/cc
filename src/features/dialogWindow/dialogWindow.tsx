import React from "react";

interface DialogWindowProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode
}

export const DialogWindow: React.FC<DialogWindowProps> = (props) => {
    if (!props.isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={props.onClose}
            >
                <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 max-w-lg mx-auto">
                    {props.children}
                </div>
            </div>
        </div>
    )
}