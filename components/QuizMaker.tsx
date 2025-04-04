import { useState } from 'react';
import SingleChoice from '@/components/quiz-types/SingleChoice';
import MultipleChoice from '@/components/quiz-types/MultipleChoice';
import Ordering from '@/components/quiz-types/Ordering';
import MissingWords from '@/components/quiz-types/MissingWords';
import { ChoiceAnswer, CreateChoiceQuizData, CreateMissingWordQuizData, CreateOrderingQuizData, OrderingAnswer } from '@/types/quizTypes';

export type QuizType = 'single' | 'multiple' | 'ordering' | 'missing';

type Props = {
    singleChoiceAnswer : ChoiceAnswer[];
    multipleChoiceAnswer : ChoiceAnswer[];
    orderingAnswer : OrderingAnswer[];
    missingWordAnswer : string;
    setSingleChoiceAnswer: React.Dispatch<React.SetStateAction<ChoiceAnswer[]>>;
    setMultipleChoiceAnswer: React.Dispatch<React.SetStateAction<ChoiceAnswer[]>>;
    setOrderingAnswer : React.Dispatch<React.SetStateAction<OrderingAnswer[]>>;
    setMissingWordAnswer : React.Dispatch<React.SetStateAction<string>>;
    quizType : QuizType;
    question : string;
    setQuizType : React.Dispatch<React.SetStateAction<QuizType>>;
    setQuestion : React.Dispatch<React.SetStateAction<string>>;
}

export default function QuizMaker({singleChoiceAnswer, multipleChoiceAnswer, orderingAnswer, missingWordAnswer, setSingleChoiceAnswer, setMultipleChoiceAnswer, setOrderingAnswer, setMissingWordAnswer, quizType, question, setQuizType ,setQuestion} : Props) {
   
    // const [missingWordAnswer, setMissingWordAnswer] = useState<CreateMissingWordQuizData>();

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value);
    };

    const handleTypeChange = (type: QuizType) => {
        if (quizType !== type) {
            if (confirm('Changing question type will reset your data. Continue?')) {
                setQuizType(type);
                setSingleChoiceAnswer([]);
                setMultipleChoiceAnswer([]);
                setOrderingAnswer([]);
                setMissingWordAnswer("")
            }
        } else {
            setQuizType(type);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="flex mb-6">
                <button
                    onClick={() => handleTypeChange('single')}
                    className={`px-4 py-2 rounded-md ${quizType === 'single' ? 'bg-blue-500 text-white' : 'bg-gray-300'} mr-1`}
                >
                    Single Choice
                </button>
                <button
                    onClick={() => handleTypeChange('multiple')}
                    className={`px-4 py-2 rounded-md ${quizType === 'multiple' ? 'bg-blue-500 text-white' : 'bg-gray-300'} mr-1`}
                >
                    Multiple Choices
                </button>
                <button
                    onClick={() => handleTypeChange('ordering')}
                    className={`px-4 py-2 rounded-md ${quizType === 'ordering' ? 'bg-blue-500 text-white' : 'bg-gray-300'} mr-1`}
                >
                    Ordering
                </button>
                <button
                    onClick={() => handleTypeChange('missing')}
                    className={`px-4 py-2 rounded-md ${quizType === 'missing' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                    Missing Words
                </button>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Write your question"
                    value={question}
                    onChange={handleQuestionChange}
                />
            </div>

            {quizType === 'single' && <SingleChoice answers={singleChoiceAnswer} setAnswers={setSingleChoiceAnswer}/>}
            {quizType === 'multiple' && <MultipleChoice answers={multipleChoiceAnswer} setAnswers={setMultipleChoiceAnswer}/>}
            {quizType === 'ordering' && <Ordering answers={orderingAnswer} setAnswers={setOrderingAnswer}/>}
            {quizType === 'missing' && <MissingWords answers={missingWordAnswer} setAnswers={setMissingWordAnswer}/>}

            <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Answer Description</h3>
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-md h-32"
                    placeholder="Description"
                />
            </div>
        </div>
    );
}