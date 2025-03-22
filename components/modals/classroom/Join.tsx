import { Course } from "@/interfaces/course";
import Image from "next/image";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCourse: Course | null;
}
    
export default function ModalJoinClassroom({ isOpen, onClose, selectedCourse }: ModalProps) {
    if (!isOpen) return null;
    if (!selectedCourse) return null;

    return (
        <div className="fixed inset-0 z-1 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="flex bg-white rounded-lg p-6 shadow-lg relative">
                <button 
                className="absolute top-2 right-3 font-bold text-xl text-gray-400 hover:text-gray-900"
                onClick={onClose}
                >
                ✕
                </button>

                <div className="flex flex-between h-50 max-w-150">
                    <Image
                        src={selectedCourse.image}
                        alt={selectedCourse.title}
                        width={300}
                        height={150}
                        className="rounded-lg"
                    />
                    
                    <div className='flex flex-col justify-between ml-6 mr-1'>
                        <div>
                            <h2 className="text-xl font-semibold mt-4">{selectedCourse.title}</h2>
                            <p className="text-gray-600">{selectedCourse.description}</p>
                        </div>

                        <div className='flex justify-end'>
                            <button className="mt-4 w-24 bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md">
                            Join
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}