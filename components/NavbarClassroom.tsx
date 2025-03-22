'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navLinks = [
    { name: 'Classroom', href: '/user/my_classroom/classroom' },
    { name: 'Courses', href: '/user/my_classroom/courses' },
    { name: 'Members', href: '/user/my_classroom/members' },
];

export default function NavbarClassroom() {
    const pathname = usePathname();

    return (
        <div className="flex justify-around items-center bg-blue-400 text-white px-6 py-3">
            {navLinks.map(({ name, href }) => {
                const isActive = pathname === href;

                return (
                <Link
                    key={name}
                    href={href}
                    className={`flex justify-center relative font-bold px-3 py-1 hover:opacity-80 w-96
                    ${isActive ? 'text-2xl' : ''}
                    ${isActive 
                        ? "after:content-[''] after:absolute after:bottom-[-12px] after:left-0 after:h-[4px] after:w-full after:bg-black"
                        : ''
                    }
                    `}            
                >
                    {name}
                </Link>

                );
            })}
        </div>
    );
}
