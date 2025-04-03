"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import ReportFail from "@/components/modals/report/ReportFail";
import { CourseService } from "@/services/courseService";
import { Course } from "@/models/Course";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    course: Course
}

const difficultyLevels = ["easy", "medium", "hard"];

export default function ModalEditCourse({ isOpen, onClose, course }: ModalProps) {
    if (!isOpen) return null;

    const [courseName, setCourseName] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [difficulty, setDifficulty] = useState<string>(course.difficulty_level);
    const [number, setNumber] = useState(course.number);

    const [error, setError] = useState("");
    const [isFail, setIsFail] = useState(false);

    const handleSave = async () => {
        if (!courseName.trim() || !description.trim()) {
            setError("Please fill out all required fields.");
            return;
        }
        const req = new Course({
            id: course.id,
            class_id: course.class_id,
            title: courseName,
            description: description,
            difficulty_level: difficulty.toLocaleLowerCase(),
            number: number
        })
        const response = await CourseService.updateCourse(course.id, req);

        onClose();
    };

    return (
        <div className="fixed inset-0 z-1 flex items-center justify-center bg-black/50 backdrop-blur-sm text-black">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-[600px]">
                <h2 className="text-xl font-bold mb-4">Edit Course</h2>

                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">
                        Course name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        placeholder="Course name"
                        className="text-sm w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="text-sm w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
                    ></textarea>
                </div>

                <div className="flex justify-between mb-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">Difficulty Level</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="text-sm w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                        >
                            {difficultyLevels.map((level) => (
                                <option key={level} value={level}>{level.toLocaleUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Number of this course</label>
                        <input
                            type="number"
                            value={number}
                            onChange={(e) => setNumber(Math.max(1, Number(e.target.value)))}
                            className={`text-sm w-full p-2 border rounded-lg focus:outline-none focus:ring-2`}
                        />
                    </div>
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
                title="Failed to edit course"
                press="OK"
            />
        </div>
    );
};
