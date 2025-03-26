"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import ReportSuccess from "@/components/modals/report/ReportSuccess";
import ReportFail from "@/components/modals/report/ReportFail";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalCreateClassroom({ isOpen, onClose }: ModalProps) {
    const [classroomName, setClassroomName] = useState("");
    const [description, setDescription] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);

    const [errors, setErrors] = useState<{ classroomName?: string; description?: string }>({});

    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailRequired, setShowFailRequired] = useState(false);
    const [showFailRandom, setShowFailRandom] = useState(false);

    if (!isOpen) return null;

    const handleSave = () => {
        let newErrors: { classroomName?: string; description?: string } = {};

        if (!classroomName.trim()) newErrors.classroomName = "Classroom name is required.";
        if (!description.trim()) newErrors.description = "Description is required.";

        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setShowFailRequired(true);
        return;
        }

        const isSuccessful = Math.random() > 0.5;
        if (isSuccessful) {
        setShowSuccess(true);
        } else {
        setShowFailRandom(true);
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm text-black">
                <div className="bg-white p-6 rounded-2xl shadow-xl w-[600px] relative">
                <h2 className="text-xl font-bold mb-4">CREATE NEW CLASSROOM</h2>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">Classroom name</label>
                    <input
                    type="text"
                    placeholder="Classroom name"
                    value={classroomName}
                    onChange={(e) => setClassroomName(e.target.value)}
                    className={`text-sm w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${errors.classroomName ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.classroomName && (
                    <p className="text-red-500 text-sm mt-1">{errors.classroomName}</p>
                    )}
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`text-sm w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24
                        ${errors.description ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    )}
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
                    <div
                        className={`w-11 h-5 flex items-center bg-blue-200 rounded-full p-1 transition-all ${
                        isPrivate ? "bg-blue-700" : ""
                        }`}
                    >
                        <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all ${
                            isPrivate ? "translate-x-5" : ""
                        }`}
                        ></div>
                    </div>
                    </label>
                </div>

                <div className="flex justify-between">
                    <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300"
                    >
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
            </div>

            <ReportSuccess
                isOpen={showSuccess}
                onClose={() => {
                setShowSuccess(false);
                onClose();
                }}
                title="Classroom created."
                press="OK"
            />

            <ReportFail
                isOpen={showFailRequired}
                onClose={() => setShowFailRequired(false)}
                title="Please fill all required fields."
                press="OK"
            />

            <ReportFail
                isOpen={showFailRandom}
                onClose={() => setShowFailRandom(false)}
                title="Failed to create classroom."
                press="OK"
            />
        </>
    );
}
