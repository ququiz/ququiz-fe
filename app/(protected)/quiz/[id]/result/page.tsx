import { auth } from "@/app/auth";
import Leaderboard from "./_components/leaderboard";
import QuizResult from "./_components/quiz-result";

// TODO: Implement getQuizDetail here
const Result = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  return (
    <div>
      <Leaderboard />
      <div className="my-14"></div>
      <QuizResult quizId={params.id} />
    </div>
  );
};
export default Result;
