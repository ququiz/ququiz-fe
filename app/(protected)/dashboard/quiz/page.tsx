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
      <div className="grid mt-8 grid-cols-4 gap-4">
        {userQuizzes ? (
          userQuizzes.map((quiz, i) => (
            <QuizCard
              quiz={quiz}
              href={`/dashboard/quiz/${i}/edit`}
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
