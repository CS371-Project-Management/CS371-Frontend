import { useState } from "react";
import ReportSuccess from "../report/ReportSuccess";
import ReportFail from "../report/ReportFail";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    errorType?: 'noClassroom' | 'cannotJoin'; // Add errorType to handle specific errors
}

export default function ModalClassroomPin({ isOpen, onClose, errorType }: ModalProps) {
    if (!isOpen) return null;

    const [pin, setPin] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);

    const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPin(e.target.value);
    };

    const handleJoinClassroom = () => {
        if (pin === "1234") { // Example: correct PIN
            setShowSuccess(true);
        } else if (!pin) {
            setShowFailure(true); // Show failure if no PIN entered
        } else {
            setShowFailure(true); // Show failure for incorrect PIN
        }
    };

    const renderErrorMessage = () => {
        if (errorType === 'noClassroom') {
            return <p className="text-red-500 text-lg">No classroom found. Please check the PIN.</p>;
        }

        if (errorType === 'cannotJoin') {
            return <p className="text-red-500 text-lg">Cannot join classroom. Ensure the PIN is correct.</p>;
        }

        return null;
    };

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm text-black">
            <div className="flex relative flex-col gap-3 p-8 bg-white rounded-lg shadow-lg max-w-md w-full text-center">
                <button 
                    className="absolute top-2 right-3 font-bold text-xl text-gray-400 hover:text-gray-900"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2 className="text-lg font-bold mb-4">Enter Classroom PIN</h2>

                <input
                    type="text"
                    placeholder="Classroom PIN"
                    className="w-full border rounded p-2 mb-4 text-center"
                    value={pin}
                    onChange={handlePinChange}
                />

                {renderErrorMessage()}

                <button
                    className="bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded"
                    onClick={handleJoinClassroom}
                >
                    Join
                </button>

                <p className="text-sm text-gray-500 mt-2">Enter Classroom PIN to Join Private Classroom</p>
            </div>

            <ReportSuccess isOpen={showSuccess} onClose={() => setShowSuccess(false)} title="Joined successfully!" press="OK" />
            <ReportFail isOpen={showFailure} onClose={() => setShowFailure(false)} title="Failed to join!" press="OK" />
        </div>
    );
}
