'use client';

import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import ModalEditCourse from "@/components/modals/course/Edit";
import ModalDeleteCourse from "@/components/modals/course/Delete";
import ModalReportForSure from "@/components/modals/report/ForSure";
import ReportFail from "@/components/modals/report/ReportFail";
import ModalDeleteLesson from "@/components/modals/course/DeleteLesson";

const lessons = [
    { title: "Lesson 1", status: "completed" },
    { title: "Lesson 2", status: "completed" },
    { title: "Lesson 3", status: "not finished" },
    { title: "Lesson 4", status: "not started" },
];

export default function DetailPage() {
    const [isEditCourse, setIsEditCourse] = useState(false);
    const [isDeleteCourse, setIsDeleteCourse] = useState(false);
    const [isDeleteLesson, setIsDeleteLesson] = useState(false);
    const [forSure, setForSure] = useState(false);
    const [calcFail, setCalcFail] = useState(false);

    const handleSubmitAllQuizzes = () => {
        const calculationSuccessful = Math.random() > 0.5; 
        if (!calculationSuccessful) {
            setCalcFail(true);
        } else {
            setForSure(true);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Link href="/main/my_classroom/courses">
                <div className="flex items-center text-lg font-semibold cursor-pointer hover:opacity-80">
                    <div className="flex justify-center mr-2 w-8 border border-2 border-bg-black rounded-full">
                        ⬅
                    </div>
                    Back to Courses List
                </div>
            </Link>

            <div className="flex justify-end">
                <button
                    className="mt-5 h-fit bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={() => setIsEditCourse(true)}
                >
                    Edit
                </button>

                <button
                    className="mt-5 h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => setIsDeleteCourse(true)}
                >
                    Delete
                </button>
            </div>

            <div className="flex gap-6 mt-6">
                <div className="w-1/2">
                    <Image
                        src="/images/image.jpg"
                        alt="Course Thumbnail"
                        width={400}
                        height={200}
                        className="rounded-lg shadow-lg"
                    />
                </div>

                <div className="w-1/2 h-1/2 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">Course name</h2>
                    <p className="text-gray-600">Lite : Fundamental Web Dev with HTML5</p>
                    <h3 className="text-md font-semibold mt-3">Description</h3>
                    <p className="text-gray-600">
                        เรียนรู้พื้นฐานการสร้างเว็บไซต์ด้วย HTML5
                    </p>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    className="mt-5 h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={handleSubmitAllQuizzes}
                >
                    Submit all quizzes
                </button>
            </div>

            <div className="mt-6">
                {lessons.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">No lessons found</p>
                ) : (
                    lessons.map((lesson, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-gray-100 p-4 px-5 rounded-lg shadow-sm mb-3"
                        >
                            <p className="text-lg">{lesson.title}</p>
                            <div className="flex gap-5">
                                <button
                                    className="mt-5 h-fit bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                                    onClick={() => {}}
                                >
                                    Edit
                                </button>

                                <button
                                    className="mt-5 h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                    onClick={() => setIsDeleteLesson(true)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <ModalEditCourse
                isOpen={isEditCourse}
                onClose={() => setIsEditCourse(false)}
            />

            <ModalDeleteCourse
                isOpen={isDeleteCourse}
                onClose={() => setIsDeleteCourse(false)}
            />

            <ModalDeleteLesson
                isOpen={isDeleteLesson}
                onClose={() => setIsDeleteLesson(false)}
            />

            <ModalReportForSure
                isOpen={forSure}
                onClose={() => setForSure(false)}
                title="Are you sure to submit all quizzes"
                press="YES"
            />

            <ReportFail
                isOpen={calcFail}
                onClose={() => setCalcFail(false)}
                title="Failed to calculate"
                press="OK"
            />
        </div>
    );
}
