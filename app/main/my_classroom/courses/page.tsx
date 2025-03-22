'use client';

import Card from '@/components/Card';
import NavbarClassroom from '@/components/NavbarClassroom';
import { BookOpen, Code, Database, Palette } from 'lucide-react';
import Link from 'next/link';

const courses = [
    {
        title: 'UX/UI Design Bootcamp',
        description: 'เรียนออกแบบ UX/UI ตั้งแต่พื้นฐานจนถึงขั้นสูง',
        image: '/images/image.jpg',
        icon: <Palette size={24} />,
        path: '/main/my_classroom/courses/lessons'
    },
    {
        title: 'Data Analytics with Python',
        description: 'วิเคราะห์ข้อมูลด้วย Python และเครื่องมือต่าง ๆ',
        image: '/images/image.jpg',
        icon: <Database size={24} />,
        path: '/main/my_classroom/courses/lessons'
    },
    {
        title: 'Fundamental Web Dev',
        description: 'HTML5 และ CSS3 สำหรับมือใหม่',
        image: '/images/image.jpg',
        icon: <Code size={24} />,
        path: '/main/my_classroom/courses/lessons'
    },
    {
        title: 'Introduction to JavaScript',
        description: 'พื้นฐานการเขียนโปรแกรมด้วย JavaScript',
        image: '/images/image.jpg',
        icon: <Code size={24} />,
        path: '/main/my_classroom/courses/lessons'
    },
    {
        title: 'Web App Development with Node.js',
        description: 'เรียนรู้ Node.js และ Express',
        image: '/images/image.jpg',
        icon: <BookOpen size={24} />,
        path: '/main/my_classroom/courses/lessons'
    },
];

export default function CoursePage() {
    return (
        <div className="min-h-screen bg-white">
            <NavbarClassroom></NavbarClassroom>   

            <div className='flex flex-between ml-20 mt-20 mb-15 text-3xl font-bold'>
                <h2 className="text-2xl font-bold mb-15">My Created Classroom</h2>

                <button className="bg-gray-800 p-5 h-fit rounded-xl text-white shadow-2xl"
                    onClick={() => {}}>
                    Create New Classroom
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

        </div>
    );
}
