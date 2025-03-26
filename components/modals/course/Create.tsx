"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import ReportFail from "@/components/modals/report/ReportFail";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalCreateCourse({ isOpen, onClose }: ModalProps) {
    if (!isOpen) return null;

    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [errors, setErrors] = useState<{ courseName?: string; description?: string }>({});
    const [isFail, setIsFail] = useState(false); 

    const handleSave = () => {
        let newErrors: { courseName?: string; description?: string } = {};

        if (!courseName.trim()) {
            newErrors.courseName = "Course name is required.";
        }
        if (!description.trim()) {
            newErrors.description = "Description is required.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        const saveSuccessful = Math.random() > 0.5; 
        if (!saveSuccessful) {
            setIsFail(true);
            return;
        }

        console.log("Creating course:", { courseName, description, isPrivate });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-1 flex items-center justify-center bg-black/50 backdrop-blur-sm text-black">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-[600px]">
                <h2 className="text-xl font-bold mb-4">CREATE NEW COURSE</h2>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">
                        Course name <span className="text-red-500">*</span>
                    </label>
                    <input  
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        placeholder="Course name"
                        className={`text-sm w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.courseName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                        }`}
                    />
                    {errors.courseName && <p className="text-red-500 text-xs mt-1">{errors.courseName}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">Cover Photo</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:border-blue-500">
                        <Upload className="w-8 h-8 text-gray-500" />
                        <span className="text-gray-500 text-sm">Add cover photo</span>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className={`text-sm w-full p-3 border rounded-lg focus:outline-none focus:ring-2 resize-none h-24 ${
                            errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                        }`}
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
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
                    <button 
                        onClick={handleSave} 
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                    >
                        Save
                    </button>
                </div>
            </div>

            <ReportFail
                isOpen={isFail}
                onClose={() => setIsFail(false)}
                title="Failed to create course"
                press="OK"
            />
        </div>
    );
};
