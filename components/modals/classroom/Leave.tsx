import { useState } from "react";
import ReportSuccess from '@/components/modals/report/ReportSuccess';
import ReportFail from '@/components/modals/report/ReportFail';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalLeaveClassroom({ isOpen, onClose }: ModalProps) {
    if (!isOpen) return null;

    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);

    const handleLeaveClassroom = () => {
        const success = Math.random() > 0.5; // Simulating success or failure

        if (success) {
            setShowSuccess(true);
        } else {
            setShowFailure(true);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm text-black">
            <div className="flex relative flex-col gap-3 p-8 bg-white rounded-lg shadow-lg max-w-md w-full text-center">
                <p className="text-lg font-bold">Do you want to leave this classroom?</p>
                
                <div className="flex justify-around mt-5">
                    <button 
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button 
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        onClick={handleLeaveClassroom}
                    >
                        Yes
                    </button>
                </div>
            </div>

            <ReportSuccess 
                isOpen={showSuccess} 
                onClose={() => {
                    setShowSuccess(false);
                    onClose();
                }} 
                title="Successfully left the classroom" 
                press="OK" 
            />

            <ReportFail 
                isOpen={showFailure} 
                onClose={() => {
                    setShowFailure(false);
                    onClose();
                }} 
                title="Failed to leave the classroom" 
                press="OK" 
            />
        </div>
    );
}
