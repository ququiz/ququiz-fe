import Leaderboard from "./_components/leaderboard";
import QuizResult from "./_components/quiz-result";

// TODO: Implement getQuizDetail here
const Result = async ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Leaderboard quizId={params.id} />
      <div className="my-14"></div>
      <QuizResult quizId={params.id} />
    </div>
  );
};
export default Result;
