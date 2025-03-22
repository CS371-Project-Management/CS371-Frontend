'use client';

import { useState } from 'react';
import { BookOpen, Code, Database, Palette } from 'lucide-react';
import Card from '@/components/Card';
import Link from 'next/link';

interface Course {
    id: string;
    title: string;
    description: string;
    image: string;
    isPublic: boolean;
}

const courses = [
    {
        title: 'UX/UI Design Bootcamp',
        description: 'เรียนออกแบบ UX/UI ตั้งแต่พื้นฐานจนถึงขั้นสูง',
        image: '/images/image.jpg',
        icon: <Palette size={24} />,
    },
    {
        title: 'Data Analytics with Python',
        description: 'วิเคราะห์ข้อมูลด้วย Python และเครื่องมือต่าง ๆ',
        image: '/images/image.jpg',
        icon: <Database size={24} />,
    },
    {
        title: 'Fundamental Web Dev',
        description: 'HTML5 และ CSS3 สำหรับมือใหม่',
        image: '/images/image.jpg',
        icon: <Code size={24} />,
    },
    {
        title: 'Introduction to JavaScript',
        description: 'พื้นฐานการเขียนโปรแกรมด้วย JavaScript',
        image: '/images/image.jpg',
        icon: <Code size={24} />,
    },
    {
        title: 'Web App Development with Node.js',
        description: 'เรียนรู้ Node.js และ Express',
        image: '/images/image.jpg',
        icon: <BookOpen size={24} />,
    },
];

export default function MyClassroomPage() {
    const [isPublic, setIsPublic] = useState(true);
    const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');

    return (
        <div className="m-10 ml-20 p-4">
            <h1 className="text-2xl font-bold mb-6">MY CLASSROOM</h1>

            <div className="flex items-center gap-10 mb-6 ml-10">
                <div className="flex justify-between border rounded-full p-2 px-2 w-64">
                    <button
                        onClick={() => setIsPublic(true)}
                        className={`px-4 py-1 w-full rounded-full ${
                        isPublic ? 'bg-gray-900 text-white' : 'text-gray-600'
                        }`}
                    >
                        Public
                    </button>
                    
                    <button
                        onClick={() => setIsPublic(false)}
                        className={`px-4 py-1 w-full rounded-full ${
                        !isPublic ? 'bg-gray-900 text-white' : 'text-gray-600'
                        }`}
                    >
                        Private
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <p className="text-gray-600">Sort by:</p>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'latest' | 'oldest')}
                        className="border border-gray-300 rounded-md p-1"
                    >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-wrap gap-6 ml-5">
                {courses.map((course, index) => (
                    <Link href='/user/my_classroom/classroom'>
                        <div key={index}>
                            <Card image={course.image} title={course.title} description={course.description}></Card>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
