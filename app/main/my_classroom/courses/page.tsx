'use client';

import Card from '@/components/Card';
import NavbarClassroom from '@/components/modals/classroom/Navbar';
import ModalCreateCourse from '@/components/modals/course/Create';
import { BookOpen, Code, Database, Palette } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const courses = [
    {
        title: 'UX/UI Design Bootcamp',
        description: 'เรียนออกแบบ UX/UI ตั้งแต่พื้นฐานจนถึงขั้นสูง',
        image: '/images/image.jpg',
        icon: <Palette size={24} />,
        path: '/main/my_classroom/courses/detail'
    },
    {
        title: 'Data Analytics with Python',
        description: 'วิเคราะห์ข้อมูลด้วย Python และเครื่องมือต่าง ๆ',
        image: '/images/image.jpg',
        icon: <Database size={24} />,
        path: '/main/my_classroom/courses/lesson'
    },
    {
        title: 'Fundamental Web Dev',
        description: 'HTML5 และ CSS3 สำหรับมือใหม่',
        image: '/images/image.jpg',
        icon: <Code size={24} />,
        path: '/main/my_classroom/courses/question'
    },
    {
        title: 'Introduction to JavaScript',
        description: 'พื้นฐานการเขียนโปรแกรมด้วย JavaScript',
        image: '/images/image.jpg',
        icon: <Code size={24} />,
        path: '/main/my_classroom/courses/result'
    },
];

export default function CoursePage() {
    const [isCreateCourse, setIsCreateCourse] = useState(false);
    
    return (
        <div className="min-h-screen bg-white">
            <NavbarClassroom></NavbarClassroom>   

            <div className='flex justify-between ml-20 mt-20 mr-20 mb-15 '>
                <h2 className="text-3xl font-bold">All Courses</h2>

                {/* <STAFF></STAFF> */}
                <button className="bg-gray-500 hover:bg-gray-800 p-5 h-fit rounded-xl text-white shadow-2xl"
                    onClick={() => {setIsCreateCourse(true)}}>
                    Create New Course
                </button>   
            </div>

            <div className="flex flex-wrap gap-6 ml-25">
                {courses.map((course, index) => (
                    <Link href={course.path}>
                        <div key={index}>
                            <Card image={course.image} title={course.title} description={course.description}></Card>
                        </div>
                    </Link>
                ))}
            </div>  

            <ModalCreateCourse
                isOpen={isCreateCourse}
                onClose={() => {setIsCreateCourse(false)}}>
            </ModalCreateCourse>
        </div>
    );
}
