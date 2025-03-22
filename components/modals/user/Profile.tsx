import Image from "next/image";
import { useState } from "react";
import ModalEditProfile from "./EditProfile";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalProfile({ isOpen, onClose }: ModalProps) {
    if (!isOpen) return null
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm text-black">
            <div className="flex bg-white rounded-lg p-6 shadow-lg relative">
                <button 
                className="absolute top-2 right-3 font-bold text-xl text-gray-400 hover:text-gray-900"
                onClick={onClose}
                >
                ✕
                </button>
                
                <div className="flex flex-col w-200 p-2">
                    <div className="flex gap-10 items-center mb-4">
                        <h2 className="text-xl font-bold">MY PROFILE</h2>
                        <span className="cursor-pointer" onClick={() => {openEditModal()}}>✏️</span>
                    </div>

                    <div className="flex items-center gap-6 w-full my-3">
                        <Image 
                            src="/images/image.jpg" 
                            alt="Profile Avatar" 
                            width={160} 
                            height={80} 
                            className="rounded-full"
                        />
                        
                        <div className="bg-gray-100 shadow-2xl p-5 rounded-lg flex-1">
                            <p className="text-sm text-gray-600">Username</p>
                            <p className="text-lg font-semibold">Jenny</p>
                            <p className="text-sm text-gray-600 mt-2">Email</p>
                            <p className="text-lg font-semibold">Jenny@gmail.com</p>
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button className="w-24 bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick={() => alert('Logging out...')}>Log out</button>
                        <button className="w-24 bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md" onClick={() => onClose}>Done</button>
                    </div>
                </div>
            </div>

            <ModalEditProfile
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)}>
            </ModalEditProfile>
        </div>
    );
}
