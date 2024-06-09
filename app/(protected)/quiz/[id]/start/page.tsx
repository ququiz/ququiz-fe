import { auth } from "@/app/auth";
import QuizStart from "./_components/quiz-start";
import { getQuizDetail } from "@/lib/query-read-service";

const Start = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const quiz = await getQuizDetail(params.id, session.accessToken);
  if ("error" in quiz) {
    throw new Error(quiz.error);
  }

  return <QuizStart session={session} quiz={quiz.quiz} />;
};
export default Start;
