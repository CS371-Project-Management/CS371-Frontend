"use client";

import Card from '@/components/Card';
import NavbarClassroom from '@/components/modals/classroom/Navbar';
import ModalCreateCourse from '@/components/modals/course/Create';
import { Course } from '@/models/Course';
import { CourseService } from '@/services/courseService';
import { BookOpen, Code, Database, Palette } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function CoursePage() {
    const [isCreateCourse, setIsCreateCourse] = useState(false);
    const { classId } = useParams();
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        const getCourses = async () => {
            const response = await CourseService.getCourseByClassId(classId);
            setCourses(response)

        }
        getCourses();
    }, [classId])

    return (
        <div className="min-h-screen bg-white">
            <NavbarClassroom classId={classId}/>

            <div className="flex justify-between ml-20 mt-20 mr-20 mb-15">
                <h2 className="text-3xl font-bold">All Courses</h2>

                {/* <STAFF></STAFF> */}
                <button
                className="bg-gray-500 hover:bg-gray-800 p-5 h-fit rounded-xl text-white shadow-2xl"
                onClick={() => setIsCreateCourse(true)}
                >
                Create New Course
                </button>
            </div>

            {courses.length === 0 ? (
                <div className="flex items-center justify-center mt-10">
                <p className="text-xl text-gray-500">No courses found</p>
                </div>
            ) : (
                <div className="flex flex-wrap gap-6 ml-25">
                {courses.map((course, index) => (
                    <Link href={`/main/my_classroom/${classId}/courses/${course.id}/detail`} key={index}>
                    <div>
                        <Card
                        image={"/images/image.jpg"}
                        title={course.title}
                        description={course.description}
                        />
                    </div>
                    </Link>
                ))}
                </div>
            )}

            <ModalCreateCourse
                isOpen={isCreateCourse}
                onClose={() => setIsCreateCourse(false)}
                class_id = {classId}
            />
        </div>
    );
}
