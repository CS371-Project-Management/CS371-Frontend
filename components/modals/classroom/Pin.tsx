interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalClassroomPin({ isOpen, onClose }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm text-black">
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
                />

                <button className="bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded w-full" onClick={onClose}>Join</button>
                
                <p className="text-sm text-gray-500 mt-2">Enter Classroom PIN to Join Private Classroom</p>
            </div>
        </div>
    );
}