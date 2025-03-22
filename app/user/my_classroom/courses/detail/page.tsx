"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Circle } from "lucide-react";

export default function DetailPage() {
    const lessons = [
        { title: "Lesson 1", status: "completed" },
        { title: "Lesson 2", status: "completed" },
        { title: "Lesson 3", status: "not finished" },
        { title: "Lesson 4", status: "not started" },
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Link href="/courses">
                <div className="flex items-center text-lg font-semibold cursor-pointer hover:opacity-80">
                    <span className="mr-2 w-8 border border-2 border-bg-black rounded-full">←</span> Back to Courses List
                </div>
            </Link>

            <div className="flex gap-6 mt-6">
                <div className="w-1/2">
                    <Image
                        src="/images/course-thumbnail.jpg"
                        alt="Course Thumbnail"
                        width={400}
                        height={200}
                        className="rounded-lg shadow-lg"
                    />
                </div>

                <div className="w-1/2 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">Course name</h2>
                    <p className="text-gray-600">Lite : Fundamental Web Dev with HTML5</p>
                    <h3 className="text-md font-semibold mt-3">Description</h3>
                    <p className="text-gray-600">
                        เรียนรู้พื้นฐานการสร้างเว็บไซต์ด้วย HTML5
                    </p>
                </div>
            </div>

            <div className="mt-6">
                {lessons.map((lesson, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm mb-3"
                >
                    <p className="text-lg">{lesson.title}</p>
                    {lesson.status === "completed" ? (
                        <CheckCircle className="text-blue-500 w-6 h-6" />
                        ) : (
                        <span className="text-gray-500">{lesson.status}</span>
                    )}
                </div>
                ))}
            </div>
        </div>
    );
}
