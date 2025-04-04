import { ChoiceAnswer } from '@/types/quizTypes';
import { useState } from 'react';

type Props = {
  answers: ChoiceAnswer[],
  setAnswers: React.Dispatch<React.SetStateAction<ChoiceAnswer[]>>;
}

export default function SingleChoice({ answers, setAnswers }: Props) {

  const addAnswer = () => {
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { 
        id: prevAnswers.length > 0 ? prevAnswers[prevAnswers.length - 1].id + 1 : 1, 
        answer: '', 
        result: false 
      },
    ]);
  };

  const updateAnswer = (id: number, text: string) => {
    setAnswers(answers.map(answer =>
      answer.id === id ? { ...answer, answer: text } : answer
    ));
  };

  const removeAnswer = (id: number) => {
    setAnswers(answers.filter((answer) => answer.id !== id))
  }

  const setCorrectAnswer = (id: number) => {
    setAnswers((prev) =>
      prev.map((answer) =>
        answer.id === id ? { ...answer, result: true } : { ...answer, result: false }
      )
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {answers?.map((answer, index) => (
          <div key={answer.id} className="flex items-center relative w-full">
            <input
              type="radio"
              id={`answer-${answer.id}`}
              name="correct-answer"
              checked={answer.result}
              onChange={() => setCorrectAnswer(answer.id)}
              className="mr-2"
            />
            <input
              type="text"
              placeholder={`Answer ${index + 1}`}
              value={answer.answer}
              onChange={(e) => updateAnswer(answer.id, e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md"
            />
            <button onClick={() => removeAnswer(answer.id)} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">×</button>

          </div>
        ))}
      </div>

      <button
        onClick={addAnswer}
        className="p-2 border border-gray-300 rounded-md w-full"
      >
        Add more answer
      </button>
    </div>
  );
}


