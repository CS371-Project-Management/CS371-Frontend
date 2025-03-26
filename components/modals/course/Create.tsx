"use client";

import { useState } from "react";
import { Home, Plus, Book, Pencil, Upload } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalCreateCourse({ isOpen, onClose }: ModalProps) {
    if (!isOpen) return null;
    const [isPrivate, setIsPrivate] = useState(false);

    

    return (
        <div className="fixed inset-0 z-1 flex items-center justify-center bg-black/50 backdrop-blur-sm text-black">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-[600px]">
                <h2 className="text-xl font-bold mb-4">CREATE NEW COURSE</h2>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">Course name</label>
                    <input  
                        type="text"
                        placeholder="Course name"
                        className="text-sm w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">Cover Photo</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:border-blue-500">
                        <Upload className="w-8 h-8 text-gray-500" />
                        <span className="text-gray-500 text-sm">Add cover photo</span>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">Description</label>
                    <textarea
                        placeholder="Description"
                        className="text-sm w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
                    ></textarea>
                </div>

                <div className="flex justify-end items-center gap-3 mb-4">
                    <span className="text-sm font-semibold">Private</span>
                    <label className="flex items-center cursor-pointer">
                        <input
                        type="checkbox"
                        checked={isPrivate}
                        onChange={() => setIsPrivate(!isPrivate)}
                        className="hidden"
                        />
                        <div className={`w-11 h-5 flex items-center bg-blue-200 rounded-full p-1 transition-all ${isPrivate ? "bg-blue-700" : ""}`}>
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all ${isPrivate ? "translate-x-5" : ""}`}></div>
                        </div>
                    </label>    
                </div>

                <div className="flex justify-between">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300">
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
