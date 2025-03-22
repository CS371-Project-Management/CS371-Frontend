"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex flex-col h-screen bg-white text-black">
            <div className="fixed top-0 w-full z-1">
                <Navbar/>
            </div>

            <div className="flex flex-col pt-21">
                <div className="z-1">
                    <Sidebar/>
                </div>

                <main className="ml-18.5">
                    {children}
                </main>
            </div>
        </div>
    );
}
