interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalDeleteUser({ isOpen, onClose }: ModalProps) {
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

                <p className="text-lg font-bold">Do you want to delete this user?</p>
                
                <div className="flex justify-around mt-5">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        onClick={onClose}>
                        Cancel
                    </button>

                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        onClick={() => {}}>
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}