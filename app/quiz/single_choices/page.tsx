'use client';

import { Trash } from 'lucide-react';
import { useState, useEffect } from 'react';
import ReportSuccess from '@/components/modals/report/ReportSuccess';
import ReportFail from '@/components/modals/report/ReportFail';

export default function QuestionForm() {
  const [question, setQuestion] = useState<string>('');
  const [questionImage, setQuestionImage] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
  const [answerImage, setAnswerImage] = useState<string | null>(null);
  const [answerDescription, setAnswerDescription] = useState<string>('');
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
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const addAnswer = () => {
    setAnswers([...answers, '']);
  };

  const removeAnswer = (index: number) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (correctAnswerIndex !== null && correctAnswerIndex >= answers.length) {
      setCorrectAnswerIndex(null);
    }
  }, [answers]);

  const validateForm = () => {
    let newErrors: { question?: string; correctAnswer?: string } = {};

    if (!question.trim()) newErrors.question = 'Question is required';
    if (correctAnswerIndex === null) newErrors.correctAnswer = 'A correct answer must be selected';

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
        <button className="h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md">
          Edit
        </button>
        <button className="h-fit bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
          Submit
        </button>
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

      {answers.map((answer, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="radio"
            name="correctAnswer"
            checked={correctAnswerIndex === index}
            onChange={() => setCorrectAnswerIndex(index)}
            className="mr-2"
          />
          <input
            type="text"
            placeholder={`Answer ${index + 1}`}
            value={answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className="border rounded p-2 w-full"
          />
          {index >= 4 && (
            <button onClick={() => removeAnswer(index)} className="ml-2 text-red-500 hover:text-white hover:bg-red-600 font-bold border border-2 p-2 w-12 rounded-xl">
              X
            </button>
          )}
        </div>
      ))}
      {errors.correctAnswer && <p className="text-red-500 text-sm">{errors.correctAnswer}</p>}

      <button onClick={addAnswer} className="flex items-center mt-4 ml-5 border rounded px-2 py-1 text-gray-700 hover:text-white hover:bg-gray-600">
        <p className='text-2xl mr-1'>+</p> Add more answer
      </button>

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

      <ReportSuccess isOpen={showSuccess} onClose={() => setShowSuccess(false)} title="Your answer has been saved successfully!" press="OK" />
      <ReportFail isOpen={showFailRequired} onClose={() => setShowFailRequired(false)} title="Required fields are missing!" press="OK" />
      <ReportFail isOpen={showFailSave} onClose={() => setShowFailSave(false)} title="Cannot save your answer. Please try again later." press="OK" />
    </div>
  );
}
