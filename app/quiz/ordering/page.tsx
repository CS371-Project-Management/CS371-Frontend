'use client';

import { useState } from 'react';
import ReportSuccess from '@/components/modals/report/ReportSuccess';
import ReportFail from '@/components/modals/report/ReportFail';

export default function OrderingQuestion() {
  const [question, setQuestion] = useState('');
  const [questionImage, setQuestionImage] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>(['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4']);
  const [answerImage, setAnswerImage] = useState<string | null>(null);
  const [answerDescription, setAnswerDescription] = useState('');
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailRequired, setShowFailRequired] = useState(false);
  const [showFailSave, setShowFailSave] = useState(false);
  const [errors, setErrors] = useState<{ question?: string; answers?: string }>({});

  // Handle Image Upload
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Drag & Drop Handlers
  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (index: number, event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (draggingIndex === null || draggingIndex === index) return;

    const newOrder = [...answers];
    const draggedItem = newOrder.splice(draggingIndex, 1)[0];
    newOrder.splice(index, 0, draggedItem);

    setDraggingIndex(index);
    setAnswers(newOrder);
  };

  const handleDrop = () => {
    setDraggingIndex(null);
  };

  // Form Validation
  const validateForm = () => {
    let newErrors: { question?: string; answers?: string } = {};

    if (!question.trim()) newErrors.question = 'Question is required';
    if (answers.length < 1) newErrors.answers = 'At least one answer is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = () => {
    if (!validateForm()) {
      setShowFailRequired(true);
      return;
    }

    const saveSuccessful = Math.random() > 0.5; // 50% chance of failing
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

      {/* Question Input */}
      <input
        type="text"
        placeholder="Write your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className={`w-full border rounded p-2 mb-2 ${errors.question ? 'border-red-500' : ''}`}
      />
      {errors.question && <p className="text-red-500 text-sm">{errors.question}</p>}

      {/* Question Image Upload */}
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

      {/* Answers (Draggable) */}
      <div className="space-y-2">
        {answers.map((answer, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(index, e)}
            onDrop={handleDrop}
            className={`border rounded p-2 shadow cursor-pointer transition-colors 
            ${draggingIndex === index ? 'bg-red-500 text-white' : 'bg-white'}`}
          >
            {answer}
          </div>
        ))}
      </div>
      {errors.answers && <p className="text-red-500 text-sm mt-1">{errors.answers}</p>}

      <div className='flex justify-end'>
        <button className="border rounded px-4 py-1 mt-4 text-gray-700 hover:text-white hover:bg-gray-600">
          Confirm
        </button>
      </div>

      {/* Answer Description */}
      <p className="mt-4 font-bold">Answer Description</p>

      {/* Answer Image Upload */}
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
