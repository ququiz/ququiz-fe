"use client";

import { Button } from "@/components/ui/button";
import { joinQuiz } from "@/lib/quiz-service";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { use, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

type StartButtonProps = {
  quiz: Quiz;
  session: Session;
};

const StartButton = ({ quiz, session }: StartButtonProps) => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleStartQuiz = () => {
    startTransition(async () => {
      const data = await joinQuiz(quiz.id, session.accessToken);

      if ("error" in data) {
        toast.error("Failed to join quiz: " + data.error);
      } else {
        toast.success("Quiz start!");
        router.push(`/quiz/${quiz.id}/start`);
      }
    });
  };

  return (
    <Button
      onClick={handleStartQuiz}
      disabled={currentTime < new Date(quiz.start_time).getTime() || loading}
      className="w-[25rem]"
    >
      Start
    </Button>
  );
};
export default StartButton;
