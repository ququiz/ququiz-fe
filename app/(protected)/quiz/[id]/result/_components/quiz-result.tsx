import { auth } from "@/app/auth";
import { Separator } from "@/components/ui/separator";
import { getUserAnswer } from "@/lib/query-read-service";
import QuestionCard from "./question-card";

type QuizResultProps = {
  quizId: string;
};

const QuizResult = async ({ quizId }: QuizResultProps) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  // const questionAndAnswers = await getUserAnswer(quizId, session.accessToken)
  // if ("error" in questionAndAnswers) {
  //   throw new Error(questionAndAnswers.error)
  // }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-semibold text-xl text-center">
        Quiz Name (x correct, y incorrect)
      </h2>
      <Separator className="my-2" />
      <div className="space-y-3">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <QuestionCard isCorrect={true} key={i} />
          ))}
      </div>
    </div>
  );
};
export default QuizResult;
