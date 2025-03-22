'use client';

import { useState } from "react";
import { Menu, Search } from "lucide-react";
import Image from 'next/image';
import ModalProfile from "./Modal/Profile";

export default function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <header className="flex items-center justify-between bg-blue-700 p-4 px-8 text-white">
            <p>LOGO</p>

            <div className="flex items-center bg-white text-lg text-black rounded-xl">
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="rounded-xl p-3 w-96 focus:outline-none focus:border-blue-500" />
                <Search className="mr-2"/>
            </div>
            
            <div className="w-13 h-13 bg-gray-300 rounded-full" onClick={() => setIsModalOpen(true)}>
                <Image 
                src="/images/image.jpg" 
                alt="Profile Image" 
                width={100} 
                height={100} 
                className="h-full w-full object-cover rounded-full" 
                />
            </div>

            <ModalProfile
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}>
            </ModalProfile>

        </header>
    );
}