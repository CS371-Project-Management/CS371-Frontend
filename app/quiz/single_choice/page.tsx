'use client';

import { Trash } from 'lucide-react';
import { useState } from 'react';
import ReportSuccess from '@/components/modals/report/ReportSuccess';
import ReportFail from '@/components/modals/report/ReportFail';

export default function SingleChoicePage() {
    const [question, setQuestion] = useState('');
    const [questionImage, setQuestionImage] = useState<string | null>(null);
    const [answers, setAnswers] = useState(['', '', '', '']);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
    const [answerImage, setAnswerImage] = useState<string | null>(null);
    const [answerDescription, setAnswerDescription] = useState('');
    const [errors, setErrors] = useState<{ question?: string; correctAnswer?: string }>({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailRequired, setShowFailRequired] = useState(false);
    const [showFailSave, setShowFailSave] = useState(false);

    const handleImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
        setImage: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleAnswerChange = (index: number, value: string) => {
        setAnswers((prev) => prev.map((ans, i) => (i === index ? value : ans)));
    };

    const validateForm = () => {
        const newErrors: { question?: string; correctAnswer?: string } = {};
        if (!question.trim()) newErrors.question = 'Question is required';
        if (correctAnswerIndex === null) newErrors.correctAnswer = 'A correct answer must be selected';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) {
            setShowFailRequired(true);
            return;
        }
        Math.random() > 0.5 ? setShowSuccess(true) : setShowFailSave(true);
    };

    return (
        <div className="ml-60 mt-4 p-6 mr-5">
            <div className='flex justify-end gap-3 mb-3'>
                <button className="h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md">Edit</button>
                <button className="h-fit bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleSave}>Save</button>
                <button className="h-fit bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded-md">Submit</button>
            </div>

            <input
                type="text"
                placeholder="Write your question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className={`w-full border rounded p-2 mb-4 ${errors.question ? 'border-red-500' : ''}`}
            />
            {errors.question && <p className="text-red-500 text-sm">{errors.question}</p>}

            <div className="w-full bg-gray-200 h-48 flex items-center justify-center rounded mb-4 relative">
                {questionImage ? (
                    <img src={questionImage} alt="Uploaded" className="w-full h-full object-cover rounded" />
                ) : (
                    <label className="cursor-pointer text-center text-gray-600">
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setQuestionImage)} className="hidden" />
                        <p className='border border-2 p-4 rounded-xl'>📷 Upload Reference Image (Optional)</p>
                    </label>
                )}
            </div>

            {/* Single-choice radio buttons */}
            {answers.map((answer, index) => (
                <div key={index} className="flex items-center mb-2">
                    <input
                        type="radio"
                        name="correctAnswer"
                        checked={correctAnswerIndex === index}
                        onChange={() => setCorrectAnswerIndex(index)} // Update the correct answer
                        className="mr-2"
                    />
                    <input
                        type="text"
                        placeholder={`Answer ${index + 1}`}
                        value={answer}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>
            ))}
            {errors.correctAnswer && <p className="text-red-500 text-sm">{errors.correctAnswer}</p>}

            <p className="mt-4 font-bold">Answer Description</p>
            <div className="w-full bg-gray-200 h-48 flex items-center justify-center rounded mb-4 relative">
                {answerImage ? (
                    <img src={answerImage} alt="Uploaded" className="w-full h-full object-cover rounded" />
                ) : (
                    <label className="cursor-pointer text-center text-gray-600">
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setAnswerImage)} className="hidden" />
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

            {/* Modals for success/failure */}
            <ReportSuccess 
                isOpen={showSuccess} 
                onClose={() => setShowSuccess(false)} 
                title="Your answer has been saved successfully!" 
                press="OK" 
            />
            <ReportFail 
                isOpen={showFailRequired} 
                onClose={() => setShowFailRequired(false)} 
                title="Please complete all required fields." 
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
