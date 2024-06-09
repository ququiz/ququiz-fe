"use client";

import { Session } from "next-auth";
import Question from "./question";
import { useState, useTransition } from "react";
import Leaderboard from "./leaderboard";
import { answerQuestion } from "@/lib/query-read-service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getLeaderboard } from "@/lib/scoring-service";
import { AnimatePresence, motion } from "framer-motion";

type QuizStartProps = {
  session: Session;
  quiz: Quiz;
};

const QuizStart = ({ session, quiz }: QuizStartProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuestion, setIsQuestion] = useState(true);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [loading, startTransition] = useTransition();
  const [leaderboard, setLeaderboard] = useState<Leaderboard[] | null>([]);
  const router = useRouter();

  const noOfQuestions = quiz.questions.length;

  const handleNextQuestion = (choiceId: any) => {
    startTransition(async () => {
      const data = await answerQuestion(
        quiz.questions[currentQuestionIndex].id,
        quiz.id,
        { choiceId },
        session.accessToken
      );

      if (currentQuestionIndex === noOfQuestions - 1) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        toast.success("Quiz completed!");
        router.replace(`/quiz/${quiz.id}/result`);

        return;
      }

      if ("error" in data) {
        toast.error("Failed to answer question: " + data.error);
        return;
      }

      const leaderboard = await getLeaderboard(quiz.id, session.accessToken);
      if ("error" in leaderboard) {
        toast.error("Failed to get leaderboard: " + leaderboard.error);
        return;
      }

      setLeaderboard(leaderboard.leaderboard);
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsQuestion((prev) => !prev);
      const timeoutCtx = setTimeout(() => {
        setIsQuestion((prev) => !prev);
      }, 5000);
      setTimeoutId(timeoutCtx);
    });
  };

  const handleSkipLeaderboard = () => {
    clearTimeout(timeoutId as NodeJS.Timeout);
    setIsQuestion((prev) => !prev);
  };

  return (
    <>
      <AnimatePresence>
        {isQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Question
              quiz={quiz}
              loading={loading}
              index={currentQuestionIndex}
              handleNextQuestion={handleNextQuestion}
              question={quiz.questions[currentQuestionIndex]}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Leaderboard
              leaderboard={leaderboard}
              handleSkipLeaderboard={handleSkipLeaderboard}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default QuizStart;
