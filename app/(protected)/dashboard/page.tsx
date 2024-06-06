import { auth } from "@/app/auth";
import QuizCard from "@/components/quiz-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getQuizzes } from "@/lib/query-read-service";

const Dashboard = async () => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const quizzes = await getQuizzes(session.accessToken);
  if (quizzes !== null && "error" in quizzes) {
    throw new Error(quizzes.error);
  }

  return (
    <main>
      <h2 className="font-medium text-3xl">Active Quizzes</h2>
      <div className="grid mt-8 grid-cols-4 gap-4">
        {quizzes ? (
          quizzes.map((quiz, i) => (
            <QuizCard
              quiz={quiz}
              href={`/quiz/${quiz.id}/waiting-room`}
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
export default Dashboard;
