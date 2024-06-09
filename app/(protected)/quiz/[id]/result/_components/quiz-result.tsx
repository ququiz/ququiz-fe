import { auth } from "@/app/auth";
import { Separator } from "@/components/ui/separator";
import { getQuizDetail, getUserAnswer } from "@/lib/query-read-service";
import QuestionCard from "./question-card";

type QuizResultProps = {
  quizId: string;
};

const QuizResult = async ({ quizId }: QuizResultProps) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const quizDetail = await getQuizDetail(quizId, session.accessToken);
  if ("error" in quizDetail) {
    throw new Error(quizDetail.error);
  }

  const questionAndAnswers = await getUserAnswer(quizId, session.accessToken);
  if ("error" in questionAndAnswers) {
    throw new Error(questionAndAnswers.error);
  }

  const noOfCorrect = questionAndAnswers.user_answer.filter(
    (qa) => qa.choices.find((c) => c.id === qa.user_choice)?.is_correct
  ).length;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-semibold text-xl text-center">
        {quizDetail.quiz.name} ({noOfCorrect} correct,{" "}
        {questionAndAnswers.user_answer.length - noOfCorrect} incorrect)
      </h2>
      <Separator className="my-2" />
      <div className="space-y-3">
        {questionAndAnswers.user_answer.map((ans, index) => {
          const isCorrect = ans.choices.find(
            (c) => c.id === ans.user_choice
          )?.is_correct;

          return (
            <QuestionCard
              isCorrect={!!isCorrect}
              ans={ans}
              index={index}
              key={ans.question + ans.user_choice}
            />
          );
        })}
      </div>
    </div>
  );
};
export default QuizResult;
