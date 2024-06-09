import { auth } from "@/app/auth";
import QuizCard from "@/components/quiz-card";
import { getQuizHistory } from "@/lib/query-read-service";

const QuizHistory = async () => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const quizHistory = await getQuizHistory(session.accessToken);
  if (quizHistory !== null && "error" in quizHistory) {
    throw new Error(quizHistory.error);
  }

  return (
    <main>
      <h2 className="font-medium text-3xl">Quiz History</h2>
      <div className="columns-4 mt-8 space-y-4">
        {quizHistory && quizHistory.length !== 0 ? (
          quizHistory.map((quiz) => (
            <QuizCard
              quiz={quiz}
              href={`/quiz/${quiz.id}/result`}
              key={quiz.id}
            />
          ))
        ) : (
          <p>No quizzes found</p>
        )}
      </div>
    </main>
  );
};
export default QuizHistory;
