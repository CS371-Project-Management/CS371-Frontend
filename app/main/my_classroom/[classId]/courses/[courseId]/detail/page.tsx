'use client';

import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import ModalEditCourse from "@/components/modals/course/Edit";
import ModalDeleteCourse from "@/components/modals/course/Delete";
import ModalReportForSure from "@/components/modals/report/ForSure";
import ReportFail from "@/components/modals/report/ReportFail";
import ModalDeleteLesson from "@/components/modals/course/DeleteLesson";
import { useParams, usePathname, useRouter } from "next/navigation";
import { CourseService } from "@/services/courseService";
import { Course } from "@/interfaces/course";
import { QuizService } from "@/services/quizServices";
import { Quiz } from "@/models/quiz/Quiz";

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
    const [course, setCourse] = useState<Course>()
    const [quizzes, setQuizzes] = useState<Quiz[]>([])
    const { courseId } = useParams();
    const router = useRouter();
    const pathName = usePathname();
    const pathSegments = pathName.split("/");
    pathSegments[pathSegments.length - 1] = "";

    useEffect(() => {
        const getCourse = async () => {
            try {
            const courseResponse = await CourseService.getCourseByCourseId(courseId);
            setCourse(courseResponse);
            const quizResponse = await QuizService.getAllQuizByCourseId(courseId);
            setQuizzes(quizResponse);
            } catch(error) {
                console.log(error)
            }
        }
        getCourse();
    }, [])

    const handleDeleteCourse = async () => {
        try {
            setIsDeleteLesson(true);
            const response = await CourseService.deleteCourse(courseId);
            console.log(response)
        } catch(error) {
            console.log(error)
        }
    }   


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
                    <h2 className="text-xl font-semibold">Course Name</h2>
                    <p className="text-gray-600">{course?.title}</p>
                    <h3 className="text-md font-semibold mt-3">Description</h3>
                    <p className="text-gray-600">
                        {course?.description}
                    </p>
                </div>
            </div>

            {/* user render */}
            {/* <div className="flex justify-end">
                <button
                    className="mt-5 h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => {}}
                >
                    Submit all quizzes
                </button>
            </div> */}

            {/* editor */}
            <div className="flex gap-5 justify-end">
                <button
                    className="mt-5 h-fit bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer"
                    onClick={() => {}}
                >
                    Insight
                </button>

                <button
                    className="mt-5 h-fit bg-zinc-900 hover:bg-zinc-700 text-white px-4 py-2 rounded-md cursor-pointer"
                    onClick={() => router.push(`${pathSegments.join("/")}/create_quiz`)}
                >
                    Create new quizz
                </button>
            </div>



            <div className="mt-6">
                {quizzes.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">No quizzes found</p>
                ) : (
                    quizzes.map((quiz, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-gray-100 p-4 px-5 rounded-lg shadow-sm mb-3"
                        >
                            <p className="text-lg">{quiz.title}</p>
                            <div className="flex gap-5">
                                <button
                                    className="mt-5 h-fit bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                                    onClick={() => { }}
                                >
                                    Edit
                                </button>

                                <button
                                    className="mt-5 h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                    onClick={() => handleDeleteCourse()}
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
                course = {course}
            />

            <ModalDeleteCourse
                isOpen={isDeleteCourse}
                onClose={() => setIsDeleteCourse(false)}
                course_id = {courseId}
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
