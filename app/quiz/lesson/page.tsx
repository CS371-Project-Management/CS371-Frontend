'use client';

import { useState } from 'react';
import { Trash } from 'lucide-react';

export default function QuizLessonPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        }
    };

    return (
        <div className="ml-60 mt-4 p-6 mr-5">
            <div className='flex gap-3 mb-3'>
                <button 
                    className="h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => {}}>
                    Edit
                </button>

                <button 
                    className="h-fit bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                    onClick={() => {}}>
                    Submit
                </button>
            </div>

            {/* Content Title Input */}
            <input
                type="text"
                placeholder="Content title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded p-2 mb-4"
            />

            {/* Image Upload Section */}
            <div className="w-full bg-gray-200 h-48 flex items-center justify-center rounded mb-4 relative">
                {image ? (
                <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded" />
                ) : (
                <label className="cursor-pointer text-center text-gray-600">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <p className='border border-2 p-4 rounded-xl'>📷 Upload Reference Image (Optional)</p>
                </label>
                )}
            </div>

            {/* Description Textarea */}
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded p-2 h-32 mb-4"
            />

            {/* Delete Button */}
            <button className="text-red-500 hover:bg-red-100 flex items-center border border-2 p-2 rounded-xl">
                <Trash className="mr-2" /> Delete
            </button>
        </div>
    );
}
