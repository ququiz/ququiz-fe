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
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleNextQuestion = (answer: any) => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setIsQuestion((prev) => !prev);
    const timeoutCtx = setTimeout(() => {
      setIsQuestion((prev) => !prev);
    }, 5000);
    setTimeoutId(timeoutCtx);
  };

  const handleSkipLeaderboard = () => {
    clearTimeout(timeoutId as NodeJS.Timeout);
    setIsQuestion((prev) => !prev);
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
    return <Leaderboard handleSkipLeaderboard={handleSkipLeaderboard} />;
  }
};
export default QuizStart;
