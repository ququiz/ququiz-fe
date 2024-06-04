"use client";

import { Session } from "next-auth";
import Question from "./question";
import { useState } from "react";
import Leaderboard from "./leaderboard";

type QuizStartProps = {
  session: Session;
  quiz: any;
};

const QuizStart = ({ session, quiz }: QuizStartProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuestion, setIsQuestion] = useState(true);

  const handleNextQuestion = (answer: any) => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setIsQuestion((prev) => !prev);
    setTimeout(() => {
      setIsQuestion((prev) => !prev);
    }, 5000);
  };

  if (isQuestion) {
    return (
      <Question
        index={currentQuestionIndex}
        handleNextQuestion={handleNextQuestion}
        question={{}}
      />
    );
  } else {
    return <Leaderboard />;
  }
};
export default QuizStart;
