import { useState } from 'react';

interface Answer {
  id: number;
  text: string;
}

export default function MultipleChoice() {
  const [answers, setAnswers] = useState<Answer[]>([
    { id: 1, text: '' },
    { id: 2, text: '' },
    { id: 3, text: '' },
    { id: 4, text: '' }
  ]);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  
  const addAnswer = () => {
    const newId = Math.max(...answers.map(a => a.id)) + 1;
    setAnswers([...answers, { id: newId, text: '' }]);
  };
  
  const updateAnswer = (id: number, text: string) => {
    setAnswers(answers.map(answer => 
      answer.id === id ? { ...answer, text } : answer
    ));
  };
  
  const toggleCorrectAnswer = (id: number) => {
    if (correctAnswers.includes(id)) {
      setCorrectAnswers(correctAnswers.filter(answerId => answerId !== id));
    } else {
      setCorrectAnswers([...correctAnswers, id]);
    }
  };
  
  const removeCorrectAnswer = (id: number) => {
    setCorrectAnswers(correctAnswers.filter(answerId => answerId !== id));
  };
  
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {answers.map(answer => (
          <div key={answer.id} className="flex items-center">
            <input 
              type="checkbox" 
              id={`answer-${answer.id}`}
              checked={correctAnswers.includes(answer.id)}
              onChange={() => toggleCorrectAnswer(answer.id)}
              className="mr-2"
            />
            <input 
              type="text" 
              placeholder={`Answer ${answer.id}`}
              value={answer.text}
              onChange={(e) => updateAnswer(answer.id, e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}
      </div>
      
      <button 
        onClick={addAnswer}
        className="p-2 border border-gray-300 rounded-md w-full"
      >
        Add more answer
      </button>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Answer:</h3>
        {correctAnswers.map(id => (
          <div key={id} className="inline-flex items-center bg-gray-200 rounded-md px-3 py-1 mr-2 mb-2">
            Answer {id}
            <button onClick={() => removeCorrectAnswer(id)} className="ml-2 text-gray-600">×</button>
          </div>
        ))}
        {correctAnswers.length === 0 && (
          <p className="text-gray-500">No correct answers selected</p>
        )}
      </div>
      
      <div className="mt-6">
        <div className="h-24 w-96 mx-auto bg-gray-200 flex flex-col items-center justify-center rounded-md mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span className="text-sm text-gray-600">reference image</span>
          <span className="text-xs text-gray-500">(optional)</span>
        </div>
      </div>
    </div>
  );
}