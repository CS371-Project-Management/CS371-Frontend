interface ModalProps {
    title: string;
    press: string;
    isOpen: boolean;
    onClick: () => void;
}

export default function ModalReportSuccess({ isOpen, onClick, title, press }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm text-black">
            <div className="flex relative flex-col gap-3 p-8 bg-white rounded-lg shadow-lg max-w-md w-full text-center">
                <p className="text-lg font-bold">{title}</p>
                
                <div className="flex justify-center mt-5">

                    <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                        onClick={onClick}>
                        {press}
                    </button>
                </div>
            </div>
        </div>
    );
}