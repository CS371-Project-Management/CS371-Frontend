'use client';

import { useState } from 'react';
import { Trash } from 'lucide-react';
import ReportSuccess from '@/components/modals/report/ReportSuccess';
import ReportFail from '@/components/modals/report/ReportFail';

export default function QuizLessonPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailRequired, setShowFailRequired] = useState(false);
    const [showFailSave, setShowFailSave] = useState(false);
    const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    const validateForm = () => {
        let newErrors: { title?: string; description?: string } = {};

        if (!title.trim()) newErrors.title = 'Title is required';
        if (!description.trim()) newErrors.description = 'Description is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            setShowFailRequired(true);
            return;
        }

        // Simulate a failed save attempt
        const saveSuccessful = Math.random() > 0.5; // 50% chance to simulate failure
        if (saveSuccessful) {
            setShowSuccess(true);
        } else {
            setShowFailSave(true);
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
                    onClick={handleSubmit}>
                    Submit
                </button>
            </div>

            {/* Content Title Input */}
            <input
                type="text"
                placeholder="Content title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full border rounded p-2 mb-2 ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

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
                className={`w-full border rounded p-2 h-32 mb-2 ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

            {/* Delete Button */}
            <button className="text-red-500 hover:bg-red-100 flex items-center border border-2 p-2 rounded-xl">
                <Trash className="mr-2" /> Delete
            </button>

            {/* Success & Failure Modals */}
            <ReportSuccess 
                isOpen={showSuccess} 
                onClose={() => setShowSuccess(false)} 
                title="Your answer has been saved successfully!" 
                press="OK" 
            />

            <ReportFail 
                isOpen={showFailRequired} 
                onClose={() => setShowFailRequired(false)} 
                title="Required fields are missing!" 
                press="OK" 
            />

            <ReportFail 
                isOpen={showFailSave} 
                onClose={() => setShowFailSave(false)} 
                title="Cannot save your answer. Please try again later." 
                press="OK" 
            />
        </div>
    );
}
