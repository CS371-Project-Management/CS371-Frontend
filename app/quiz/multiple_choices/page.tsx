'use client';

import { useState } from 'react';
import ReportSuccess from '@/components/modals/report/ReportSuccess';
import ReportFail from '@/components/modals/report/ReportFail';

export default function MissingWord() {
    const [question, setQuestion] = useState('');
    const [questionImage, setQuestionImage] = useState<string | null>(null);
    const [missingWord, setMissingWord] = useState('');
    const [answer, setAnswer] = useState('');
    const [answerImage, setAnswerImage] = useState<string | null>(null);
    const [answerDescription, setAnswerDescription] = useState('');

    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailRequired, setShowFailRequired] = useState(false);
    const [showFailSave, setShowFailSave] = useState(false);
    const [errors, setErrors] = useState<{ question?: string; missingWord?: string; answer?: string }>({});

    const handleImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
        setImage: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
        setImage(URL.createObjectURL(file));
        }
    };

    const validateForm = () => {
        let newErrors: { question?: string; missingWord?: string; answer?: string } = {};

        if (!question.trim()) newErrors.question = 'Question is required';
        if (!missingWord.trim()) newErrors.missingWord = 'Missing word is required';
        if (!answer.trim()) newErrors.answer = 'Answer is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
        setShowFailRequired(true);
        return;
        }

        const saveSuccessful = Math.random() > 0.5;
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
            
            <input
                type="text"
                placeholder="Write your question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className={`w-full border rounded p-2 mb-2 ${errors.question ? 'border-red-500' : ''}`}
            />
            {errors.question && <p className="text-red-500 text-sm">{errors.question}</p>}

            <div className="w-full bg-gray-200 h-48 flex items-center justify-center rounded mb-4 relative">
                {questionImage ? (
                <img src={questionImage} alt="Uploaded" className="w-full h-full object-cover rounded" />
                ) : (
                <label className="cursor-pointer text-center text-gray-600">
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setQuestionImage)}
                    className="hidden"
                    />
                    <p className='border border-2 p-4 rounded-xl'>📷 Upload Reference Image (Optional)</p>
                </label>
                )}
            </div>

            <input
                type="text"
                placeholder="Write down the missing words."
                value={missingWord}
                onChange={(e) => setMissingWord(e.target.value)}
                className={`w-full border rounded p-2 mb-2 ${errors.missingWord ? 'border-red-500' : ''}`}
            />
            {errors.missingWord && <p className="text-red-500 text-sm">{errors.missingWord}</p>}

            <div className='flex justify-end'>
                <button className="border rounded px-4 py-1 text-gray-700 hover:text-white hover:bg-gray-600">
                Confirm
                </button>
            </div>

            <p className="mt-4 font-bold">Answer:</p>
            <input
                type="text"
                placeholder="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className={`border rounded p-2 w-full ${errors.answer ? 'border-red-500' : ''}`}
            />
            {errors.answer && <p className="text-red-500 text-sm">{errors.answer}</p>}

            <p className="mt-4 font-bold">Answer Description</p>

            <div className="w-full bg-gray-200 h-48 flex items-center justify-center rounded mb-4 relative">
                {answerImage ? (
                <img src={answerImage} alt="Uploaded" className="w-full h-full object-cover rounded" />
                ) : (
                <label className="cursor-pointer text-center text-gray-600">
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setAnswerImage)}
                    className="hidden"
                    />
                    <p className='border border-2 p-4 rounded-xl'>📷 Upload Reference Image (Optional)</p>
                </label>
                )}
            </div>

            <textarea
                placeholder="Description"
                value={answerDescription}
                onChange={(e) => setAnswerDescription(e.target.value)}
                className="w-full border rounded p-2 h-32"
            />

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
