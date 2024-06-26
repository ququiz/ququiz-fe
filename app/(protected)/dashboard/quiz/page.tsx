import { auth } from "@/app/auth";
import QuizCard from "@/components/quiz-card";
import { getCreatedQuizzes } from "@/lib/query-read-service";

const UserQuizzesList = async () => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const userQuizzes = await getCreatedQuizzes(session.accessToken);
  if (userQuizzes !== null && "error" in userQuizzes) {
    throw new Error(userQuizzes.error);
  }

  return (
    <main>
      <h2 className="font-medium text-3xl">Your Quizzes</h2>
      <div className="columns-4 mt-8 space-y-4">
        {userQuizzes && userQuizzes.length !== 0 ? (
          userQuizzes.map((quiz) => (
            <QuizCard
              quiz={quiz}
              href={`/dashboard/quiz/${quiz.id}/edit`}
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
export default UserQuizzesList;
