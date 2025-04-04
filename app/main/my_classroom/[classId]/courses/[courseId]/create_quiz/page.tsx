"use client"

import { use, useEffect, useState } from 'react';
import Head from 'next/head';
import QuizContent from '@/components/QuizContent';
import QuizMaker, { QuizType } from '@/components/QuizMaker';
import { ChoiceAnswer, CreateChoiceQuizData, CreateMissingWordQuizData, CreateOrderingQuizData, OrderingAnswer, QuizTypesCreate } from '@/types/quizTypes';
import { q } from 'framer-motion/client';
import { useParams } from 'next/navigation';
import { QuizService } from '@/services/quizServices';
import ModalReportSuccess from '@/components/modals/report/ReportSuccess';
import ModalReportFail from '@/components/modals/report/ReportFail';

interface Quiz {
  id: number;
  title: string;
  content: null | {
    title: string;
    description: string;
    image?: string;
  };
  questions: any[];
}

export default function CreateQuiz() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([{ id: 1, title: 'Quiz 1', content: null, questions: [] }]);
  const [selectedQuiz, setSelectedQuiz] = useState<number>(1);
  const [view, setView] = useState<'main' | 'content' | 'quiz'>('content');

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [singleChoiceAnswer, setSingleChoiceAnswer] = useState<ChoiceAnswer[]>([]);
  const [multipleChoiceAnswer, setMultipleChoiceAnswer] = useState<ChoiceAnswer[]>([]);
  const [orderingAnswer, setOrderingAnswer] = useState<OrderingAnswer[]>([]);

  const [missingWordAnswer, setMissingWordAnswer] = useState("");

  const [quizType, setQuizType] = useState<QuizType>('single');
  const [question, setQuestion] = useState<string>('');
  const [number, setNumber] = useState<number>(0);
  const [point, setPoint] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

  const { courseId } = useParams();

  const addContent = () => {
    setView('content');
  };

  const addQuiz = () => {
    setView('quiz');
  };

  const saveQuiz = async () => {
    let req: QuizTypesCreate;

    if (title === "" || description === "") {
      setShowFail(true);
      return;
    }
    const baseQuizData = {
      course_id: courseId as string,
      number: number,
      point: point,
      title: title,
      lesson: description
    };

    // Build request based on quiz type
    if (quizType === "single" || quizType === "multiple") {
      const qstn: CreateChoiceQuizData = {
        question: question,
        type: quizType,
        answers: quizType === "single" ? singleChoiceAnswer : multipleChoiceAnswer
      };

      req = {
        ...baseQuizData,
        quiz_type: "choice",
        choice_data: qstn
      };
    } else if (quizType === "ordering") {
      const qstn: CreateOrderingQuizData = {
        question: question,
        answers: orderingAnswer.map((item, index) => ({
          ...item,
          order: index + 1, // Assign order based on index (1-based indexing)
        })),
      };

      req = {
        ...baseQuizData,
        quiz_type: "ordering",
        ordering_data: qstn,
      };
    } else if (quizType === "missing") {
      const qstn: CreateMissingWordQuizData = {
        question: question,
        answer: missingWordAnswer,
      };

      req = {
        ...baseQuizData,
        quiz_type: "missing_words",
        missing_word_data: qstn
      };
    } else {
      throw new Error(`Unsupported quiz type: ${quizType}`);
    }

    // Make the API call with the properly built request
    try {
      const response = await QuizService.createQuiz(req);
      console.log(req)
      setShowSuccess(true);
      console.log();

    } catch (error) {
      console.log(error)
    }
  };

  const addNewQuiz = () => {
    const newId = Math.max(...quizzes.map(q => q.id)) + 1;
    const newQuiz = { id: newId, title: `Quiz ${newId}`, content: null, questions: [] };
    setQuizzes([...quizzes, newQuiz]);
    setSelectedQuiz(newId);
  };

  const currentQuiz = quizzes.find(quiz => quiz.id === selectedQuiz) || quizzes[0];

  return (
    <div className="min-h-screen flex">
      <Head>
        <title>Quiz Builder</title>
        <meta name="description" content="Quiz Builder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-full">
        <div className="w-xs bg-gray-900 h-screen">
          <div className="bg-blue-500 p-4 text-white font-semibold">
            Create Quiz
          </div>
          <div className="p-4 flex flex-col gap-2">
            <button
              onClick={addContent}
              className="bg-gray-600 text-white p-2 rounded-md w-full"
            >
              Add Content
            </button>
            <button
              onClick={addQuiz}
              className="bg-gray-600 text-white p-2 rounded-md w-full"
            >
              Add Quiz
            </button>
            <button
              onClick={saveQuiz}
              className="bg-green-500 text-white p-2 rounded-md w-full"
            >
              Save
            </button>
          </div>

        </div>

        <div className="flex-1">
          {view === 'main' && (
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Quiz Builder</h2>
              <p className="mb-4">Select an option from the sidebar to start building your quiz.</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={addContent}
                  className="bg-blue-500 text-white p-3 rounded-md"
                >
                  Add Content
                </button>
                <button
                  onClick={addQuiz}
                  className="bg-green-500 text-white p-3 rounded-md"
                >
                  Add Quiz Question
                </button>
                <button
                  onClick={addNewQuiz}
                  className="bg-purple-500 text-white p-3 rounded-md"
                >
                  Create New Quiz
                </button>
              </div>
            </div>
          )}

          {view === 'content' && (
            <QuizContent
              title={title}
              description={description}
              setTitle={setTitle}
              setDescription={setDescription}
              number={number}
              setNumber={setNumber}
              point={point}
              setPoint={setPoint} />
          )}

          {view === 'quiz' && (
            <QuizMaker
              singleChoiceAnswer={singleChoiceAnswer}
              multipleChoiceAnswer={multipleChoiceAnswer}
              orderingAnswer={orderingAnswer}
              missingWordAnswer={missingWordAnswer}
              setSingleChoiceAnswer={setSingleChoiceAnswer}
              setMultipleChoiceAnswer={setMultipleChoiceAnswer}
              setOrderingAnswer={setOrderingAnswer}
              setMissingWordAnswer={setMissingWordAnswer}
              question={question}
              quizType={quizType}
              setQuestion={setQuestion}
              setQuizType={setQuizType}
            />
          )}
        </div>
      </div>

      <ModalReportSuccess
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
        }}
        title="Quiz created."
        press="OK"
      />

      <ModalReportFail
        isOpen={showFail}
        onClose={() => setShowFail(false)}
        title="Please fill all required fields."
        press="OK"
      />
    </div>
  );
}