'use client';

import NavbarClassroom from '@/components/NavbarClassroom';
import Image from 'next/image';

const members = [
    {
        profile: '/images/image.jpg',
        username: 'one apollo'
    },
    {
        profile: '/images/image.jpg',
        username: 'two apollo'
    },
    {
        profile: '/images/image.jpg',
        username: 'three apollo' 
    },
    {
        profile: '/images/image.jpg',
        username: 'four apollo'
    },
    {
        profile: '/images/image.jpg',
        username: 'five apollo'
    },
    {
        profile: '/images/image.jpg',
        username: 'six apollo'
    },
]

export default function MemberPage() {
    return (
        <div className="min-h-screen bg-white">
            <NavbarClassroom></NavbarClassroom>   

            <div className='ml-20 mt-20 mb-15 text-3xl font-bold'>
                Members 10
            </div>

            <div className='flex flex-wrap flex-col gap-6 mx-25'>
                {members.map((member, index) => (
                    <div key={index}>
                        <div className='flex bg-gray-100 max-w-full gap-10 rounded-full shadow-lg border border-[rgba(0,0,0,0.1)]'>
                            <Image 
                                src={member.profile}
                                alt="image"
                                width={100}
                                height={20}
                                className='p-4 rounded-full'
                            />

                            <p className='flex items-center '>{member.username}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}