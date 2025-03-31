'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Code, Database, Palette } from 'lucide-react';
import Card from '@/components/Card';
import Link from 'next/link';
import { UserService } from '@/services/userService';
import { ClassService } from '@/services/classServices';
import { User } from '@/models/User';
import { Class } from '@/models/Class';



export default function MyClassroomPage() {
    const [isPublic, setIsPublic] = useState(true);
    const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');
    const [user, setUser] = useState<User | null>(null);
    const [classes, setClasses] = useState<Class[] | null>(null);
    useEffect(() => {
        async function fetchUsers() {
            try {
                //localStorage จากที่เก็บ userId ในหน้า Login
                const userId = JSON.parse(localStorage.getItem('user') || 'null');
                if (!userId) {
                    console.error('User ID not found in localStorage');
                    return;
                }

                const userFetch = await UserService.getUserById(userId)
                const data = await ClassService.getClassUserJoinByUserID(userFetch.id);
                setClasses(data);
                setUser(user)
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
                console.error('Error fetching users:', errorMessage);
            }
        }

        fetchUsers();
    }, []);


    return (
        <div className="m-10 ml-20 p-4">
            <h1 className="text-2xl font-bold mb-6">MY CLASSROOM</h1>

            <div className="flex items-center gap-10 mb-6 ml-10">
                <div className="flex justify-between border rounded-full p-2 px-2 w-64">
                    <button
                        onClick={() => setIsPublic(true)}
                        className={`px-4 py-1 w-full rounded-full ${isPublic ? 'bg-gray-900 text-white' : 'text-gray-600'
                            }`}
                    >
                        Public
                    </button>

                    <button
                        onClick={() => setIsPublic(false)}
                        className={`px-4 py-1 w-full rounded-full ${!isPublic ? 'bg-gray-900 text-white' : 'text-gray-600'
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
                {classes?.map((cls, index) => (
                    <Link href={`/main/my_classroom/${cls.id}/classroom`} key={index}>
                        <div >
                            <Card image={"/images/image.jpg"} title={cls.title} description={cls.description}></Card>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
