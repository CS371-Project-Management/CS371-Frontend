"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Circle } from "lucide-react";
import { useState } from "react";
import ModalEditCourse from "@/components/modals/course/Edit";
import ModalDeleteCourse from "@/components/modals/course/Delete";
import ModalReportForSure from "@/components/modals/report/ForSure";

const lessons = [
    { title: "Lesson 1", status: "completed" },
    { title: "Lesson 2", status: "completed" },
    { title: "Lesson 3", status: "not finished" },
    { title: "Lesson 4", status: "not started" },
];

export default function DetailPage() {
    const [isEditCourse, setIsEditCourse] = useState(false);
    const [isDeleteCourse, setIsDeleteCourse] = useState(false);
    const [forSure, setForSure] = useState(false);

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

            {/* <STAFF></STAFF> */}
            {/* <div className="flex justify-end gap-5 mb-4">
                <button 
                    className="h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => {setIsEditCourse(true)}}>
                    Edit
                </button>

                <button 
                    className="h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => {setIsDeleteCourse(true)}}>
                    Delete
                </button>
            </div> */}

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

            {/* <STAFF></STAFF> */}
            {/* <div className="flex justify-end">
                <button 
                    className="mt-5 h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => {}}>
                    Create New Lesson
                </button>
            </div> */}

            <div className="flex justify-end">
                <button 
                    className="mt-5 h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => {setForSure(true)}}>
                    Submit all quizzes
                </button>
            </div>

            <div className="mt-6">
                {lessons.map((lesson, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center bg-gray-100 p-4 px-5 rounded-lg shadow-sm mb-3"
                >
                    <p className="text-lg">{lesson.title}</p>
                    {lesson.status === "completed" ? (
                        <CheckCircle className="text-blue-500 w-6 h-6" />
                        ) : (
                        <span className="text-gray-500">{lesson.status}</span>
                    )}

                    {/* <STAFF></STAFF> */}
                    {/* <div className="flex gap-5">
                        <button 
                            className="h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                            onClick={() => {}}>
                            Edit
                        </button>

                        <Link href={"/main/my_classroom/courses/detail/leaderboard"}>
                            <button className="h-fit bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                                Insight
                            </button>
                        </Link>
                    </div> */}
                </div>
                ))}
            </div>

            <ModalEditCourse
                isOpen={isEditCourse}
                onClose={() => {setIsEditCourse(false)}}>
            </ModalEditCourse>

            <ModalDeleteCourse
                isOpen={isDeleteCourse}
                onClose={() => {setIsDeleteCourse(false)}}>
            </ModalDeleteCourse>

            <ModalReportForSure
                isOpen={forSure}
                onClose={() => {setForSure(false)}}
                title="Are you sure to submit all quizzes"
                press="YES">
            </ModalReportForSure>
        </div>
    );
}
