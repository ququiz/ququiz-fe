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
  console.log(quizzes);

  return (
    <main>
      <h2 className="font-medium text-3xl">Active Quizzes</h2>
      <div className="grid mt-8 grid-cols-4 gap-4">
        {Array(6)
          .fill("")
          .map((_, i) => (
            <QuizCard href={`/quiz/${i}/waiting-room`} key={i} />
          ))}
      </div>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
};
export default Dashboard;
