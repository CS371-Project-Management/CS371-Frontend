'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Plus, Book, Pencil } from 'lucide-react';
import ModalClassroomPin from './modal/ClassroomPin';

const menuItems = [
    { name: 'Home', icon: Home, path: '/user/home' },
    { name: 'Join Classroom', icon: Plus, path: '#' },
    { name: 'My Classroom', icon: Book, path: '/user/my_classroom' },
    { name: 'My Created Classroom', icon: Pencil, path: '/user/my_created_classroom' },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <motion.div
                animate={{ width: isOpen ? 270 : 75 }}
                transition={{ duration: 0.2 }}
                className="fixed h-screen bg-gray-900 text-white flex flex-col p-4 shadow-lg"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                {menuItems.map(({ name, icon: Icon}) => (
                <div
                    key={name}
                    onClick={() => name === 'Join Classroom' && setIsModalOpen(true)}
                    className="flex items-center p-3 hover:bg-gray-700 rounded-lg cursor-pointer relative"
                >
                    <Icon size={26} />
                    <span
                    className={`fixed left-16 text-white text-md px-2 py-1 rounded-md transition-opacity ${
                        isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                    >
                    {name}
                    </span>
                </div>
                ))}
            </motion.div>

            <ModalClassroomPin
                isOpen={isModalOpen}
                onClose={() => {setIsModalOpen(false)}}>
            </ModalClassroomPin>
        </>
    );
}
