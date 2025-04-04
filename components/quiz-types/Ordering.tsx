import { OrderingAnswer } from '@/types/quizTypes';
import { useState } from 'react';

type Props = {
  answers: OrderingAnswer[],
  setAnswers: React.Dispatch<React.SetStateAction<OrderingAnswer[]>>;
}

export default function Ordering({ answers, setAnswers }: Props) {

  const updateAnswer = (id: number, text: string) => {
    setAnswers(answers.map(answer =>
      answer.id === id ? { ...answer, answer: text } : answer
    ));
  };

  const addAnswer = () => {
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        id: prevAnswers.length > 0 ? prevAnswers[prevAnswers.length - 1].id + 1 : 1,
        answer: '',
        order: 0,
      },
    ]);
  };

  const removeAnswer = (id: number) => {
    setAnswers(answers.filter((answer) => answer.id !== id))
  }

  return (
    <div>
      <div className="">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {answers.map((answer, index) => (
            <div key={answer.id} className="mb-2 relative w-full">
              <input
                type="text"
                placeholder={`Answer order no.${index + 1}`}
                value={answer.answer}
                onChange={(e) => updateAnswer(answer.id, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
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

    </div>
  );
}