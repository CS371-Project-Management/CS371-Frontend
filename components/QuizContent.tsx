"use client"

import { useState } from 'react';

type Props = {
    title : string,
    description : string,
    setTitle : React.Dispatch<React.SetStateAction<string>>,
    setDescription : React.Dispatch<React.SetStateAction<string>>;
}

export default function QuizContent({title, description, setTitle, setDescription} : Props) {

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="mb-6">
                <label htmlFor="content-title" className="block mb-2 text-sm font-medium text-gray-700">Content title</label>
                <input
                    type="text"
                    id="content-title"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Content title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="content-description" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                <textarea
                    id="content-description"
                    className="w-full p-2 border border-gray-300 rounded-md h-32"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
        </div>
    );
}